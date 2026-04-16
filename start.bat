@echo off
echo =====================================
echo   Starting NutriPop
echo =====================================

echo.
echo Starting Backend on http://localhost:5000 ...
start "NutriPop Backend" cmd /k "cd /d "%~dp0server" && node index.js"

timeout /t 2 /nobreak >nul

echo Starting Frontend on http://localhost:5173 ...
start "NutriPop Frontend" cmd /k "cd /d "%~dp0client" && npm run dev"

echo.
echo =====================================
echo   Both servers are starting!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo =====================================
pause
