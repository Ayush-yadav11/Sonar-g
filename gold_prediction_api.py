from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import joblib
import tensorflow as tf
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

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
        if not os.path.exists('gold_price_lstm_model.h5'):
            print("WARNING: Model file not found")
        else:
            model = tf.keras.models.load_model('gold_price_lstm_model.h5')
            print("Model loaded successfully")
        
        # Load the scaler
        if not os.path.exists('gold_price_scaler.pkl'):
            print("WARNING: Scaler file not found")
        else:
            scaler = joblib.load('gold_price_scaler.pkl')
            print("Scaler loaded successfully")
        
        # Load the last 60 prices
        if not os.path.exists('last_60_prices.npy'):
            print("WARNING: Data file not found")
        else:
            last_60_prices = np.load('last_60_prices.npy')
            print("Last 60 prices loaded successfully")
        
        return model is not None and scaler is not None and last_60_prices is not None
    except Exception as e:
        print(f"Error loading model/data: {e}")
        import traceback
        traceback.print_exc()
        return False

def predict_next_price(last_60_prices_scaled):
    """Predict the next gold price"""
    input_data = last_60_prices_scaled.reshape(1, 60, 1)
    scaled_prediction = model.predict(input_data, verbose=0)
    predicted_price = scaler.inverse_transform(scaled_prediction)[0][0]
    return predicted_price

def predict_multiple_days(last_60_prices_scaled, days=7):
    """Predict gold prices for multiple days"""
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

@app.route('/api/predict/scenario', methods=['POST'])
def predict_scenario():
    """API endpoint to predict gold prices based on economic scenarios"""
    try:
        if model is None or scaler is None or last_60_prices is None:
            return jsonify({"error": "Model not loaded"}), 500
            
        data = request.get_json()
        
        # Get scenario parameters with defaults
        interest_rate_change = data.get('interest_rate_change', 0)  # in percentage points
        inflation_change = data.get('inflation_change', 0)  # in percentage points
        dollar_strength_change = data.get('dollar_strength_change', 0)  # in percentage
        market_volatility = data.get('market_volatility', 0)  # scale 0-100
        geopolitical_risk = data.get('geopolitical_risk', 0)  # scale 0-100
        days = data.get('days', 7)  # prediction horizon
        
        if days < 1 or days > 30:
            return jsonify({"error": "Days must be between 1 and 30"}), 400
            
        # Base predictions without scenario impact
        base_predictions = predict_multiple_days(last_60_prices, days=days)
        
        # Apply scenario impacts
        # These are simplified impact calculations based on general market principles
        scenario_predictions = []
        for base_price in base_predictions:
            # Interest rate impact (negative correlation)
            interest_impact = -1 * (interest_rate_change * 0.5) / 100 * base_price
            
            # Inflation impact (positive correlation)
            inflation_impact = (inflation_change * 0.8) / 100 * base_price
            
            # Dollar strength impact (negative correlation)
            dollar_impact = -1 * (dollar_strength_change * 0.3) / 100 * base_price
            
            # Market volatility impact (positive correlation)
            volatility_impact = (market_volatility * 0.2) / 100 * base_price
            
            # Geopolitical risk impact (positive correlation)
            geopolitical_impact = (geopolitical_risk * 0.4) / 100 * base_price
            
            # Combine all impacts
            total_impact = (interest_impact + inflation_impact + dollar_impact + 
                          volatility_impact + geopolitical_impact)
            
            # Apply the impact to the base prediction
            scenario_price = base_price + total_impact
            scenario_predictions.append(float(max(0, scenario_price)))  # Ensure no negative prices
        
        # Create date predictions
        dates = []
        for i in range(1, days + 1):
            dates.append((datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d'))
        
        return jsonify({
            "success": True,
            "base_predictions": base_predictions,
            "scenario_predictions": scenario_predictions,
            "dates": dates,
            "currency": "USD",
            "unit": "per ounce",
            "model_type": "LSTM",
            "days_predicted": days,
            "scenario_params": {
                "interest_rate_change": interest_rate_change,
                "inflation_change": inflation_change,
                "dollar_strength_change": dollar_strength_change,
                "market_volatility": market_volatility,
                "geopolitical_risk": geopolitical_risk
            }
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
            "description": "LSTM model trained on 11 years of gold price data (2013-2024)"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": model is not None
    })

@app.route('/', methods=['GET'])
def root():
    """Root endpoint for basic check"""
    return jsonify({
        "message": "Gold Price Prediction API",
        "status": "running",
        "endpoints": [
            "/api/health",
            "/api/model/info",
            "/api/predict/next",
            "/api/predict/week",
            "/api/predict/custom",
            "/api/predict/scenario"
        ]
    })

@app.before_request
def log_request_info():
    print(f"Request: {request.method} {request.url}")
    print(f"Headers: {dict(request.headers)}")

@app.after_request
def log_response_info(response):
    print(f"Response: {response.status_code}")
    return response

if __name__ == '__main__':
    print("Starting Gold Price Prediction API...")
    
    # Load model and data
    if load_model_and_data():
        print("All components loaded successfully!")
        print("API endpoints:")
        print("- GET /api/predict/next - Predict next day price")
        print("- GET /api/predict/week - Predict next 7 days")
        print("- POST /api/predict/custom - Predict custom days (1-30)")
        print("- POST /api/predict/scenario - Predict scenario-based prices")
        print("- GET /api/model/info - Model information")
        print("- GET /api/health - Health check")
        print("Starting server on http://localhost:5000")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Failed to load model components. Make sure the model files exist in the current directory.")
