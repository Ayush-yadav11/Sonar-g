@echo off
echo ============================================
echo Gold Price Prediction Backend Diagnostics
echo ============================================
echo.

cd /d "%~dp0"
echo Current directory: %CD%
echo.

echo Step 1: Testing minimal Flask server...
echo.
echo Starting minimal test server (should work without any ML dependencies)
echo This will test if Flask itself is working
echo.
echo Press Ctrl+C to stop the test server when you see it's working
echo Then we'll try the full application
echo.
python minimal_test.py
echo.

echo Step 2: Testing simple Flask with basic endpoints...
echo.
python simple_test.py
echo.

echo Step 3: Testing main application...
echo.

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install flask flask-cors

echo Testing main application...
python app.py

pause
