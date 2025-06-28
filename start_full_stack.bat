@echo off
echo Starting Gold Price Prediction Full Stack Application...
echo.

cd /d "%~dp0"

echo Starting Backend API...
start "Backend API" cmd /k "cd backend && start_backend.bat"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && start_frontend.bat"

echo.
echo Both services are starting...
echo.
echo Backend API: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo You can also test the API directly by opening test_api_connection.html in your browser
echo.
echo Press any key to exit this launcher (services will continue running)
pause > nul 