@echo off
echo Starting MidasTrend Frontend...
echo.

cd /d "c:\Users\hi\Desktop\HeaLink\MidasTrend\frontend"

echo Current directory: %CD%
echo.

echo Installing dependencies...
call npm install

echo.
echo Starting the development server...
echo The frontend will be available at http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
