/**
 * NutriPop — one-time image setup script
 * Run from the `client` directory:  node copy-images.js
 *
 * Copies Gemini-generated product PNG files from Downloads into the
 * correct public/images/products/ paths so the site picks them up.
 */

const fs   = require('fs');
const path = require('path');

const DOWNLOADS = path.join(process.env.USERPROFILE || process.env.HOME, 'Downloads');
const DEST      = path.join(__dirname, 'public', 'images', 'products');

const copies = [
  // [source filename in Downloads, destination filename]
  ['Gemini_Generated_Image_ryb4boryb4boryb4.png', 'peri-peri.png'],
  ['Gemini_Generated_Image_bktubybktubybktu.png', 'achari.png'],
  ['Gemini_Generated_Image_pme6cbpme6cbpme6.png', 'desi-sticks.png'],
];

// Ensure destination folder exists
fs.mkdirSync(DEST, { recursive: true });

let ok = 0;
for (const [src, dest] of copies) {
  const srcPath  = path.join(DOWNLOADS, src);
  const destPath = path.join(DEST, dest);

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠  Source not found: ${srcPath}`);
    continue;
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`✓  Copied ${src}  →  public/images/products/${dest}`);
  ok++;
}

console.log(`\nDone — ${ok}/${copies.length} images copied.`);
if (ok === copies.length) {
  console.log('Restart the Vite dev server (npm run dev) to see the real product images.\n');
}
