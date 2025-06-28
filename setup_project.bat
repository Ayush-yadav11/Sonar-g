@echo off
echo ===============================================
echo Gold Price Prediction Project Setup
echo ===============================================
echo.

echo Step 1: Setting up Backend...
echo.
cd backend

echo Creating Python virtual environment...
if not exist "venv" (
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo Checking for model files...
if not exist "models\gold_price_lstm_model.h5" (
    if exist "..\gold_price_lstm_model.h5" (
        echo Copying model files...
        if not exist "models" mkdir models
        if not exist "data" mkdir data
        copy "..\gold_price_lstm_model.h5" "models\" >nul
        copy "..\gold_price_scaler.pkl" "models\" >nul
        copy "..\last_60_prices.npy" "data\" >nul
        echo Model files copied!
    ) else (
        echo WARNING: Model files not found!
        echo Please run the Jupyter notebook first to train the model.
    )
)

echo Backend setup complete!
echo.

echo Step 2: Setting up Frontend...
echo.
cd ..\frontend

echo Installing Node.js dependencies...
call npm install

echo Frontend setup complete!
echo.

echo ===============================================
echo Setup Complete!
echo ===============================================
echo.
echo To start the project:
echo 1. Start Backend: Run 'backend\start_backend.bat'
echo 2. Start Frontend: Run 'cd frontend && npm run dev'
echo.
echo The backend will be available at: http://localhost:5000
echo The frontend will be available at: http://localhost:5173
echo.
pause
