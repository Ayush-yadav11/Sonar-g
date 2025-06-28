from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        "status": "success",
        "message": "Backend is working!",
        "working_directory": os.getcwd()
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Simple health check working"
    })

if __name__ == '__main__':
    print("Starting simple test server...")
    print("Working directory:", os.getcwd())
    print("Test endpoint: http://localhost:5000/api/test")
    print("Health endpoint: http://localhost:5000/api/health")
    app.run(debug=True, host='0.0.0.0', port=5000)
