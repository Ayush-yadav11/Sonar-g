from flask import Flask, jsonify, request  #type: ignore
from flask_cors import CORS   #type: ignore
import numpy as np
import joblib
import tensorflow as tf  #type: ignore
from datetime import datetime, timedelta
import os

app = Flask(__name__)

# Configure CORS for production
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:8080",
            "http://localhost:8081",
            "http://localhost:5173",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173",
            "http://localhost:5000",
            # Add your Render frontend URL here
            "https://*.onrender.com"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Add logging to see what requests are coming in
@app.before_request
def log_request_info():
    print(f"Request: {request.method} {request.url}")
    print(f"Headers: {dict(request.headers)}")

@app.after_request
def log_response_info(response):
    print(f"Response: {response.status_code}")
    return response

# Global variables to store loaded model and scaler
model = None
scaler = None
last_60_prices = None

def load_model_and_data():
    """Load the trained model, scaler, and last 60 prices"""
    global model, scaler, last_60_prices
    
    print("Current working directory:", os.getcwd())
    print("Contents:", os.listdir('.'))
    
    try:
        # Load the trained model
        model_path = os.path.join('models', 'gold_price_lstm_model.h5')
        if not os.path.exists(model_path):
            model_path = '../gold_price_lstm_model.h5'  # Fallback to root directory
        
        print(f"Loading model from: {model_path}")
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")
            
        model = tf.keras.models.load_model(model_path) # type: ignore
        print("Model loaded successfully")
        
        # Load the scaler
        scaler_path = os.path.join('models', 'gold_price_scaler.pkl')
        if not os.path.exists(scaler_path):
            scaler_path = '../gold_price_scaler.pkl'  # Fallback to root directory
        
        print(f"Loading scaler from: {scaler_path}")
        if not os.path.exists(scaler_path):
            raise FileNotFoundError(f"Scaler file not found at {scaler_path}")
            
        scaler = joblib.load(scaler_path)
        print("Scaler loaded successfully")
        
        # Load the last 60 prices
        data_path = os.path.join('data', 'last_60_prices.npy')
        if not os.path.exists(data_path):
            data_path = '../last_60_prices.npy'  # Fallback to root directory
        
        print(f"Loading data from: {data_path}")
        if not os.path.exists(data_path):
            raise FileNotFoundError(f"Data file not found at {data_path}")
            
        last_60_prices = np.load(data_path)
        print("Last 60 prices loaded successfully")
        print(f"Data shape: {last_60_prices.shape}")
        
        return True
    except Exception as e:
        print(f"Error loading model/data: {e}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        return False

def predict_next_price(last_60_prices_scaled):
    """Predict the next gold price"""
    if model is None or scaler is None:
        raise ValueError("Model or scaler not loaded")
    
    input_data = last_60_prices_scaled.reshape(1, 60, 1)
    scaled_prediction = model.predict(input_data, verbose=0)
    predicted_price = scaler.inverse_transform(scaled_prediction)[0][0]
    return predicted_price

def predict_multiple_days(last_60_prices_scaled, days=7):
    """Predict gold prices for multiple days"""
    if model is None or scaler is None:
        raise ValueError("Model or scaler not loaded")
    
    predictions = []
    current_sequence = last_60_prices_scaled.copy()
    
    for _ in range(days):
        input_data = current_sequence.reshape(1, 60, 1)
        scaled_prediction = model.predict(input_data, verbose=0)
        predicted_price = scaler.inverse_transform(scaled_prediction)[0][0]
        predictions.append(float(predicted_price))
        
        # Update sequence
        current_sequence = np.roll(current_sequence, -1)
        current_sequence[-1] = scaled_prediction[0][0]
    
    return predictions

@app.route('/api/predict/next', methods=['GET'])
def predict_next():
    """API endpoint to predict next day's gold price"""
    try:
        if model is None or scaler is None or last_60_prices is None:
            return jsonify({"error": "Model not loaded"}), 500
            
        prediction = predict_next_price(last_60_prices)
        
        return jsonify({
            "success": True,
            "prediction": float(prediction),
            "currency": "USD",
            "unit": "per ounce",
            "prediction_date": (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d'),
            "model_type": "LSTM"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict/week', methods=['GET'])
def predict_week():
    """API endpoint to predict gold prices for the next 7 days"""
    try:
        if model is None or scaler is None or last_60_prices is None:
            return jsonify({"error": "Model not loaded"}), 500
            
        predictions = predict_multiple_days(last_60_prices, days=7)
        
        # Create date predictions
        dates = []
        for i in range(1, 8):
            dates.append((datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d'))
        
        return jsonify({
            "success": True,
            "predictions": predictions,
            "dates": dates,
            "currency": "USD",
            "unit": "per ounce",
            "model_type": "LSTM"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict/custom', methods=['POST'])
def predict_custom():
    """API endpoint to predict gold prices for custom number of days"""
    try:
        if model is None or scaler is None or last_60_prices is None:
            return jsonify({"error": "Model not loaded"}), 500
            
        data = request.get_json()
        days = data.get('days', 7)
        
        if days < 1 or days > 30:
            return jsonify({"error": "Days must be between 1 and 30"}), 400
            
        predictions = predict_multiple_days(last_60_prices, days=days)
        
        # Create date predictions
        dates = []
        for i in range(1, days + 1):
            dates.append((datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d'))
        
        return jsonify({
            "success": True,
            "predictions": predictions,
            "dates": dates,
            "currency": "USD",
            "unit": "per ounce",
            "model_type": "LSTM",
            "days_predicted": days
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/model/info', methods=['GET'])
def model_info():
    """API endpoint to get model information"""
    try:
        return jsonify({
            "success": True,
            "model_type": "LSTM",
            "window_size": 60,
            "model_loaded": model is not None,
            "scaler_loaded": scaler is not None,
            "data_loaded": last_60_prices is not None,
            "last_training_date": "2023-08-17",
            "accuracy": "~96%",
            "description": "LSTM model trained on 10 years of gold price data (2013-2023)"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "data_loaded": last_60_prices is not None,
        "working_directory": os.getcwd()
    })

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    """Simple test endpoint"""
    return jsonify({
        "message": "Backend API is working!",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    })

@app.route('/', methods=['GET'])
def root():
    """Root endpoint for basic check"""
    return jsonify({
        "message": "Gold Price Prediction API",
        "status": "running",
        "endpoints": [
            "/api/health",
            "/api/test", 
            "/api/model/info",
            "/api/predict/next",
            "/api/predict/week",
            "/api/predict/custom"
        ]
    })

if __name__ == '__main__':
    # Load the model when the app starts
    if load_model_and_data():
        print("Model and data loaded successfully")
    else:
        print("Failed to load model and data")
    
    # Get port from environment variable for Render deployment
    port = int(os.environ.get('PORT', 5000))
    
    # Run the app
    app.run(host='0.0.0.0', port=port)

