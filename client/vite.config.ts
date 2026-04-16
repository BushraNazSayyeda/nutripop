import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { execFile } from 'child_process'

/**
 * Dev-only Vite plugin: serves Gemini-generated PNGs directly from the
 * user's Downloads folder.  Uses async I/O + in-memory cache so the
 * Node event-loop stays unblocked when multiple images load in parallel.
 */
function serveLocalProductImages() {
  const DOWNLOADS = path.join(
    (process.env.USERPROFILE as string) || (process.env.HOME as string) || '',
    'Downloads',
  )

  const imageMap: Record<string, string> = {
    '/images/products/peri-peri.png':
      path.join(DOWNLOADS, 'Gemini_Generated_Image_ryb4boryb4boryb4.png'),
    '/images/products/achari.png':
      path.join(DOWNLOADS, 'Gemini_Generated_Image_bktubybktubybktu.png'),
    '/images/products/desi-sticks.png':
      path.join(DOWNLOADS, 'Gemini_Generated_Image_pme6cbpme6cbpme6.png'),
  }

  // Cache buffers after first read to avoid repeated disk I/O
  const bufferCache = new Map<string, Buffer>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {
    name: 'serve-local-product-images',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    configureServer(server: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      server.middlewares.use((req: any, res: any, next: any) => {
        const url: string = (req.url as string)?.split('?')[0] ?? ''
        const localPath = imageMap[url]

        if (!localPath || !fs.existsSync(localPath)) {
          next()
          return
        }

        const sendBuffer = (data: Buffer) => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'image/png')
          res.setHeader('Content-Length', String(data.length))
          res.setHeader('Cache-Control', 'public, max-age=86400')
          res.end(data)
        }

        // Serve from cache if available
        if (bufferCache.has(localPath)) {
          sendBuffer(bufferCache.get(localPath)!)
          return
        }

        // Async read → cache → serve
        fs.readFile(localPath, (err, data) => {
          if (err) { next(); return }
          bufferCache.set(localPath, data)
          sendBuffer(data)
        })
      })
    },
  }
}

/** Dev-only endpoint: POST /api/__git_push → runs git init/commit/push */
function gitPushPlugin() {
  return {
    name: 'git-push-endpoint',
    configureServer(server: any) {
      server.middlewares.use('/api/__git_push', (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('POST only'); return }
        const root = path.join(__dirname, '..')
        const git = (args: string[], cb: (err: any, out: string) => void) => {
          execFile('git', args, { cwd: root, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } },
            (e: any, stdout: string, stderr: string) => cb(e, (stdout || '') + (stderr || '')))
        }
        const log: string[] = []
        const next = (steps: Array<() => void>) => {
          const step = steps.shift()
          if (step) step(); else { res.setHeader('Content-Type','application/json'); res.end(JSON.stringify({ log })) }
        }
        const run = (args: string[], steps: Array<() => void>, allowFail = false) => {
          git(args, (err, out) => {
            log.push(`$ git ${args.join(' ')}\n${out.trim()}`)
            if (err && !allowFail) { res.statusCode = 500; res.setHeader('Content-Type','application/json'); res.end(JSON.stringify({ error: out, log })) }
            else next(steps)
          })
        }
        const BRANCH = 'feature/complete-site'
        const REMOTE = 'https://github.com/BushraNazSayyeda/nutripop.git'
        const steps: Array<() => void> = [
          () => run(['init'], steps),
          () => run(['config', 'user.email', 'bushranazsayyeda@users.noreply.github.com'], steps, true),
          () => run(['config', 'user.name', 'BushraNazSayyeda'], steps, true),
          () => run(['add', '.'], steps),
          () => run(['-c', 'user.email=bushranazsayyeda@users.noreply.github.com',
                     '-c', 'user.name=BushraNazSayyeda',
                     'commit', '-m',
                     'feat: complete NutriPop e-commerce site\n\n- All 10+ pages built and verified\n- CartContext localStorage race condition fix\n- AuthContext loading state fix\n- vercel.json configured for Vite SPA deployment'], steps, true),
          () => run(['checkout', '-B', BRANCH], steps, true),
          () => run(['remote', 'remove', 'origin'], steps, true),
          () => run(['remote', 'add', 'origin', REMOTE], steps),
          () => run(['push', '-u', 'origin', BRANCH, '--force'], steps),
        ]
        next(steps)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), serveLocalProductImages(), gitPushPlugin()],
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
