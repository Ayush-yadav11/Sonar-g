from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def root():
    return jsonify({
        "message": "Gold Price Prediction API",
        "status": "running",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({
        "message": "API is working!",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("Starting minimal Flask server...")
    print("Endpoints:")
    print("- GET / - Root")
    print("- GET /api/health - Health")
    print("- GET /api/test - Test")
    app.run(debug=True, host='0.0.0.0', port=5000)
