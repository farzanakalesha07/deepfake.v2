@echo off
TITLE CampusSafe Express Backend Server
COLOR 0D
CLS

echo =====================================================================
echo                CAMPUSSAFE BACKEND REST API SERVER
echo =====================================================================
echo.
echo [*] Starting Express Backend on Port 5000...
echo [*] Database: server/data/complaints.json
echo.
node server/server.js
pause
