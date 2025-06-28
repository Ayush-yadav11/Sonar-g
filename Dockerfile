# Use Python 3.10.13 slim image as base
FROM python:3.10.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create necessary directories
RUN mkdir -p backend/models backend/data

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the model files first to ensure they exist
COPY backend/models/gold_price_lstm_model.h5 backend/models/
COPY backend/models/gold_price_scaler.pkl backend/models/
COPY backend/data/last_60_prices.npy backend/data/

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["python", "backend/app.py"] 