#!/usr/bin/env python3

"""
Simple test script to verify Flask server is working
Run this to test basic Flask functionality without ML dependencies
"""

from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def root():
    """Root endpoint for basic check"""
    return jsonify({
        "message": "Gold Price Prediction API - Test Mode",
        "status": "running",
        "timestamp": datetime.now().isoformat(),
        "working_directory": os.getcwd(),
        "endpoints": [
            "/",
            "/api/health",
            "/api/test"
        ]
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "mode": "test",
        "working_directory": os.getcwd()
    })

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    """Simple test endpoint"""
    return jsonify({
        "message": "Backend API is working!",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0-test"
    })

if __name__ == '__main__':
    print("Starting Flask Test Server...")
    print("Working directory:", os.getcwd())
    print("Test endpoints:")
    print("- GET / - Root endpoint")
    print("- GET /api/health - Health check")
    print("- GET /api/test - Simple test")
    print("Server starting on http://localhost:5000")
    
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print(f"Failed to start server: {e}")
        input("Press Enter to exit...")
