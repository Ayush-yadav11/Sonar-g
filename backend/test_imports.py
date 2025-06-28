import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Test imports
try:
    from flask import Flask, jsonify, request
    print("✓ Flask imported successfully")
except ImportError as e:
    print(f"✗ Flask import failed: {e}")

try:
    from flask_cors import CORS
    print("✓ Flask-CORS imported successfully")
except ImportError as e:
    print(f"✗ Flask-CORS import failed: {e}")

try:
    import numpy as np
    print("✓ NumPy imported successfully")
except ImportError as e:
    print(f"✗ NumPy import failed: {e}")

try:
    import joblib
    print("✓ Joblib imported successfully")
except ImportError as e:
    print(f"✗ Joblib import failed: {e}")

try:
    import tensorflow as tf
    print("✓ TensorFlow imported successfully")
    print(f"  TensorFlow version: {tf.__version__}")
except ImportError as e:
    print(f"✗ TensorFlow import failed: {e}")

# Test file existence
model_files = [
    ('models/gold_price_lstm_model.h5', 'LSTM Model'),
    ('models/gold_price_scaler.pkl', 'Scaler'),
    ('data/last_60_prices.npy', 'Price Data')
]

print("\nFile existence check:")
for file_path, description in model_files:
    if os.path.exists(file_path):
        print(f"✓ {description}: {file_path}")
    else:
        print(f"✗ {description}: {file_path} (NOT FOUND)")

print("\nCurrent working directory:", os.getcwd())
print("Contents of current directory:")
for item in os.listdir('.'):
    print(f"  {item}")

if os.path.exists('models'):
    print("\nContents of models directory:")
    for item in os.listdir('models'):
        print(f"  models/{item}")

if os.path.exists('data'):
    print("\nContents of data directory:")
    for item in os.listdir('data'):
        print(f"  data/{item}")
