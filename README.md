# MidasTrend

A sophisticated gold price prediction platform with real-time market tracking and advanced machine learning algorithms, featuring an elegant dark-themed UI with golden accents, designed for professional gold market analysis and forecasting.

## 📊 Overview

MidasTrend combines LSTM neural networks with modern web technologies to deliver accurate gold price predictions. The platform features a React frontend with Tailwind CSS, custom animated backgrounds, and a Flask backend API that serves predictions from a trained machine learning model.

## ✨ Key Features

- **🎯 ML-Powered Price Prediction** - LSTM neural network model trained on historical gold price data
- **📊 Real-time Market Tracking** - Live price updates with API integration capabilities
- **🔮 Multi-timeframe Forecasting** - Next day, week, and custom (1-30 day) predictions
- **📈 Trend Analysis** - Pattern recognition with historical data comparison
- **🎨 Modern UI** - Elegant dark theme with golden accents and animated backgrounds
- **🖥️ Interactive Dashboard** - Streamlined interface for data visualization and predictions
- **🔍 Scenario Analysis** - "What-if" simulation for market conditions
- **⚡ API Integration** - RESTful endpoints for prediction services

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

The project can be configured through:

### Environment Variables

Create a `.env` file in the frontend directory:

```plaintext
VITE_API_BASE_URL=http://localhost:5000
```

## 📊 Data Sources

- **Training**: Historical gold price datasets
- **Runtime**: Supports integration with market data APIs (Alpha Vantage, etc.)
- **Fallback**: Simulated data for development and demos

## 🚀 Deployment

```bash
# Build the frontend for production
cd frontend
npm run build

# The built files will be in the frontend/dist/ directory
# Deploy these to your web server

# For the backend, deploy the Flask app using your preferred method:
# - Gunicorn/uWSGI for production
# - Docker containerization
# - Cloud platforms (Azure, AWS, GCP)
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- shadcn/ui for the component library
- Tailwind CSS for styling utilities
- TensorFlow team for the machine learning framework
- Flask and React communities for excellent documentation
