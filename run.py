"""
NutriPop Python launcher — runs npm install + both Node servers
"""
import subprocess, sys, os, time, threading

ROOT   = os.path.dirname(os.path.abspath(__file__))
CLIENT = os.path.join(ROOT, 'client')
SERVER = os.path.join(ROOT, 'server')

def run(cmd, cwd, label, color):
    proc = subprocess.Popen(
        cmd, cwd=cwd, shell=True,
        stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        text=True
    )
    for line in proc.stdout:
        print(f"{color}[{label}]\033[0m {line}", end='')
    return proc

def install(cwd, label):
    nm = os.path.join(cwd, 'node_modules')
    if not os.path.exists(nm):
        print(f"\033[36m[Setup]\033[0m Installing {label} deps...")
        r = subprocess.run('npm install', cwd=cwd, shell=True)
        if r.returncode != 0:
            print(f"\033[31mERROR: npm install failed for {label}\033[0m")
            sys.exit(1)
        print(f"\033[32m[Setup]\033[0m {label} ready!")
    else:
        print(f"\033[32m[Setup]\033[0m {label} deps already installed.")

install(SERVER, 'Backend')
install(CLIENT, 'Frontend')

print("\n\033[36m[NutriPop]\033[0m Starting backend on http://localhost:5000 ...")
be = subprocess.Popen('node index.js', cwd=SERVER, shell=True,
                      stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

def stream(proc, label, color):
    for line in proc.stdout:
        print(f"{color}[{label}]\033[0m {line}", end='', flush=True)

threading.Thread(target=stream, args=(be,'Backend','\033[33m'), daemon=True).start()
time.sleep(2)

print("\033[36m[NutriPop]\033[0m Starting frontend on http://localhost:5173 ...")
fe = subprocess.Popen('npm run dev', cwd=CLIENT, shell=True,
                      stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
threading.Thread(target=stream, args=(fe,'Frontend','\033[35m'), daemon=True).start()

print("\n\033[32m========================================\033[0m")
print("\033[32m  NutriPop launching!\033[0m")
print("\033[32m  Frontend: http://localhost:5173\033[0m")
print("\033[32m  Backend:  http://localhost:5000\033[0m")
print("\033[32m  Press Ctrl+C to stop\033[0m")
print("\033[32m========================================\033[0m\n")

try:
    fe.wait()
except KeyboardInterrupt:
    be.terminate(); fe.terminate()
    print("\n\033[36m[NutriPop]\033[0m Stopped.")
