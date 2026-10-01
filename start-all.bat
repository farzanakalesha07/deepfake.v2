@echo off
TITLE CampusSafe - One Click Server Launcher
COLOR 0B
CLS

echo =====================================================================
echo                CAMPUSSAFE - ONE CLICK SERVER LAUNCHER
echo          Campus Safety ^& Repeated Harassment Reporting System
echo =====================================================================
echo.
echo [*] Checking Node.js environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] ERROR: Node.js is not installed or not in PATH.
    echo     Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [*] Starting Express Backend Server (Port 5000)...
start "CampusSafe Backend Server (Port 5000)" cmd /k "node server/server.js"

echo [*] Starting Next.js Web Application (Port 3001)...
start "CampusSafe Frontend App (Port 3001)" cmd /k "npm run dev"

echo.
echo [*] Waiting 3 seconds for services to initialize...
timeout /t 3 /nobreak >nul

echo [*] Opening CampusSafe in your default web browser...
start http://localhost:3001

echo.
echo =====================================================================
echo  [SUCCESS] All CampusSafe services are now running!
echo  - Web Application: http://localhost:3001
echo  - Backend REST API: http://localhost:5000
echo  - API Health Check: http://localhost:5000/api/health
echo =====================================================================
echo.
echo Keep the launched terminal windows open while testing.
echo Press any key to exit this launcher window.
pause >nul
