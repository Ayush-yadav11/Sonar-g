@echo off
echo Starting MidasTrend Backend API...
echo.

cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo Checking if virtual environment exists...
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        echo Make sure Python is installed and in PATH
        pause
        exit /b 1
    )
)

echo Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)

echo Installing required packages...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install packages
    pause
    exit /b 1
)

echo.
echo Testing imports...
python test_imports.py
echo.

echo Checking for model files...
if not exist "models\gold_price_lstm_model.h5" (
    if exist "..\gold_price_lstm_model.h5" (
        echo Copying model files from parent directory...
        if not exist "models" mkdir models
        if not exist "data" mkdir data
        copy "..\gold_price_lstm_model.h5" "models\"
        copy "..\gold_price_scaler.pkl" "models\"
        copy "..\last_60_prices.npy" "data\"
        echo Model files copied successfully!
    ) else (
        echo WARNING: Model files not found!
        echo Please run the Jupyter notebook first to train the model.
        echo The following files should be generated:
        echo - gold_price_lstm_model.h5
        echo - gold_price_scaler.pkl  
        echo - last_60_prices.npy
        echo.
        echo Starting with limited functionality...
    )
) else (
    echo Model files found!
)

echo.
echo Starting the API server...
echo The API will be available at http://localhost:5000
echo.
echo Available endpoints:
echo - GET / - Root endpoint
echo - GET /api/test - Simple test
echo - GET /api/health - Health check
echo - GET /api/model/info - Model information
echo - GET /api/predict/next - Predict next day price
echo - GET /api/predict/week - Predict next 7 days
echo - POST /api/predict/custom - Predict custom days (1-30)
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py

if errorlevel 1 (
    echo.
    echo ERROR: Server failed to start
    echo Check the error messages above
)

pause
