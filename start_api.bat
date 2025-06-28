@echo off
echo Starting Gold Price Prediction API...
echo.

echo Checking if virtual environment exists...
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing required packages...
pip install -r requirements.txt

echo.
echo Starting the API server...
echo The API will be available at http://localhost:5000
echo.   
echo Available endpoints:
echo - GET /api/predict/next - Predict next day price
echo - GET /api/predict/week - Predict next 7 days
echo - POST /api/predict/custom - Predict custom days (1-30)
echo - GET /api/model/info - Model information
echo - GET /api/health - Health check
echo.

python gold_prediction_api.py

pause
