# MidasTrend

A sophisticated gold price prediction platform with real-time market tracking and advanced machine learning algorithms, featuring an elegant dark-themed UI with golden accents, designed for professional gold market analysis and forecasting.

🌐 **[Live Demo](https://midas-trend.vercel.app)** | [Documentation](#-overview)

## 🌐 Deployment Links

- **Frontend**: [https://midas-trend.vercel.app](https://midas-trend.vercel.app)
- **Backend API**: [https://sonar-g.onrender.com](https://sonar-g.onrender.com)

## 📊 Overview

MidasTrend combines LSTM neural networks with modern web technologies to deliver accurate gold price predictions. The platform features a React frontend with Tailwind CSS, custom animated backgrounds, and a Flask backend API that serves predictions from a trained machine learning model.

## ✨ Key Features

- **🎯 ML-Powered Price Prediction** - LSTM neural network model trained on historical gold price data
- **📊 Real-time Market Tracking** - Live price updates with API integration capabilities
- **🔮 Multi-timeframe Forecasting** - Next day, week, and custom (1-30 day) predictions
- **📈 Trend Analysis** - Pattern recognition with historical data comparison
- **🎨 Modern UI** - Elegant theme system with light/dark modes and golden accents
- **🌙 Smart Theme System** - Automatic system theme detection with manual override options
- **🖥️ Interactive Dashboard** - Streamlined interface for data visualization and predictions
- **🔍 Scenario Analysis** - "What-if" simulation for market conditions
- **⚡ API Integration** - RESTful endpoints for prediction services

## 🎨 Theme System

MidasTrend features a sophisticated theme system:

- **Automatic Theme Detection** - Automatically matches your system preferences
- **Manual Theme Control** - Easy switching between light and dark modes
- **Golden Accents** - Carefully crafted gold-themed color palette
- **High Contrast** - Optimized for readability in both light and dark modes
- **Smooth Transitions** - Elegant animations when switching themes
- **Persistent Preference** - Your theme choice is remembered across sessions

To change the theme:
1. Click the theme toggle button (sun/moon icon) in the navigation bar
2. Choose between Light, Dark, or System preference
3. Experience smooth transition animations between themes

## 🚀 Getting Started

### Prerequisites

- Python 3.11+ (Backend)
- Node.js 16+ (Frontend)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/MidasTrend.git
cd MidasTrend

# Quick setup (Windows)
setup_project.bat

# OR manual setup:

# 1. Set up backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# 2. Set up frontend
cd ../frontend
npm install
```

### Running the Application

```bash
# 1. Start the backend server
cd backend
start_backend.bat  # or manually: python app.py

# 2. Start the frontend development server
cd ../frontend
npm run dev
```

The backend API will be available at `http://localhost:5000` and the frontend application at `http://localhost:5173`.

## 🏗️ Project Structure

```plaintext
├── backend/                # Flask API server
│   ├── app.py              # Main API application
│   ├── config.py           # Configuration settings
│   ├── requirements.txt    # Python dependencies
│   ├── start_backend.bat   # Backend startup script
│   ├── models/             # Trained model files
│   └── data/               # Model data files
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── pages/          # Page components
│   │   └── hooks/          # Custom React hooks
│   ├── package.json        # Node.js dependencies
│   └── .env                # Environment variables
├── dataset/                # Training datasets (git ignored)
├── Gold_Price_Prediction_LSTM.ipynb  # Model training notebook
└── setup_project.bat       # Complete project setup
```

## 🖥️ Backend API

The Flask backend provides several RESTful endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/predict/next` | GET | Predict next day's gold price |
| `/api/predict/week` | GET | Predict next 7 days of prices |
| `/api/predict/custom` | POST | Predict custom range (1-30 days) |
| `/api/model/info` | GET | Get model information and stats |
| `/api/health` | GET | API health check endpoint |
| `/api/test` | GET | Simple API test endpoint |

## 🎨 Frontend Features

The React frontend includes:

- **Modern Landing Page** - Hero section with animated golden background
- **Live Price Dashboard** - Real-time price tracking with key metrics
- **LSTM Prediction Panel** - Machine learning model predictions
- **Historical Data Analysis** - Comprehensive historical data visualization
- **Scenario Analysis** - Market scenario simulation tools
- **What-If Simulator** - Interactive prediction simulation

## 🧠 Machine Learning Model

The gold price prediction is powered by a Long Short-Term Memory (LSTM) neural network:

- **Architecture**: Sequential LSTM layers
- **Input**: 60-day price window
- **Output**: Next day's predicted price
- **Training Data**: Historical gold prices (2013-2023)
- **Accuracy**: ~96% on test data
- **File Format**: TensorFlow .h5 model

## 🛠️ Technologies

### Backend

- Python 3.11+
- Flask & Flask-CORS
- TensorFlow
- NumPy & Pandas
- Joblib

### Frontend

- React 18 with TypeScript
- Vite build system
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- React Query for API integration
- Custom SVG animations

## ⚙️ Configuration

### Environment Variables

#### Frontend (.env)
```plaintext
# API Configuration (required)
VITE_API_URL=https://sonar-g.onrender.com  # Production API URL
# Use http://localhost:5000 for local development
```

#### Backend (config.py)
```plaintext
# Available via environment variables:
SECRET_KEY=your-secret-key  # Optional, defaults to 'gold-prediction-secret-key'
PORT=5000  # Optional, defaults to 5000
```

### CORS Configuration

The backend API is configured to accept requests from the following origins:
- http://localhost:8080
- http://localhost:8081
- http://localhost:5173
- http://127.0.0.1:3000
- http://127.0.0.1:5173
- http://localhost:5000
- https://sonar-g.vercel.app
- https://sonar-g-git-main-ayush-yadav11.vercel.app
- https://*.vercel.app

## 🚀 Deployment

### Frontend (Vercel)

The frontend is deployed on Vercel with the following configuration:
```bash
# Build command
npm run build

# Output directory
dist/

# Environment variables required:
VITE_API_URL=https://sonar-g.onrender.com
```

### Backend (Render)

The backend is deployed on Render using Docker with the following configuration:

```yaml
services:
  - type: web
    name: sonar-g-backend
    env: docker
    region: singapore
    plan: free
    healthCheckPath: /api/health
    envVars:
      - key: PYTHON_VERSION
        value: 3.10.13
    buildCommand: docker build -t sonar-g-backend .
    startCommand: docker run -p $PORT:5000 sonar-g-backend
```

### Docker Support

The project includes Docker support for the backend:

```dockerfile
# Use Python 3.10.13 slim image
FROM python:3.10.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "backend/app.py"]
```

## 📦 Dependencies

### Backend
```plaintext
flask==3.1.0
flask-cors==5.0.1
tensorflow==2.15.0
scikit-learn==1.6.1
numpy==1.26.4
pandas==2.1.4
joblib==1.4.2
```

### Frontend
```plaintext
react: ^18.3.1
vite: ^5.4.1
typescript: ^5.5.3
tailwindcss: ^3.4.11
next-themes: ^0.3.0
shadcn/ui components
recharts: ^2.15.4
react-query: ^5.56.2
```

## 📊 Data Sources

- **Training**: Historical gold price datasets
- **Runtime**: Supports integration with market data APIs (Alpha Vantage, etc.)
- **Fallback**: Simulated data for development and demos

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- shadcn/ui for the component library
- Tailwind CSS for styling utilities
- TensorFlow team for the machine learning framework
- Flask and React communities for excellent documentation
