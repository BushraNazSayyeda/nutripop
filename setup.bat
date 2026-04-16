@echo off
echo =====================================
echo   NutriPop Setup
echo =====================================

echo.
echo [1/2] Installing backend dependencies...
cd /d "%~dp0server"
call npm install
if %errorlevel% neq 0 ( echo ERROR: Backend install failed & pause & exit /b 1 )

echo.
echo [2/2] Installing frontend dependencies...
cd /d "%~dp0client"
call npm install
if %errorlevel% neq 0 ( echo ERROR: Frontend install failed & pause & exit /b 1 )

echo.
echo =====================================
echo   Setup Complete!
echo =====================================
echo.
echo Now run start.bat to launch the app.
pause
