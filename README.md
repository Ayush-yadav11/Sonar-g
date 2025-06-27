# Golden Future Glance 🏆

A sophisticated gold price prediction model with real-time tracking dashboard, featuring advanced machine learning algorithms and a stunning golden-themed UI for professional gold market analysis.

## ✨ Features

- **🎯 Advanced Gold Price Prediction Model** - Machine learning-powered price forecasting with historical data analysis
- **📊 Real-time Gold Price Tracking** - Live price updates with simulated market data
- **🔮 Predictive Analytics** - Multi-timeframe predictions using advanced algorithms
- **📈 Market Trend Analysis** - Intelligent pattern recognition and trend identification
- **🎨 Beautiful Golden Theme** - Custom color scheme with light/dark mode support
- **🖥️ Interactive Dashboard** - Multiple tabs for different data views and predictions
- **🔍 Scenario Analysis** - Advanced prediction and what-if simulation tools
- **⚡ High-Frequency Data** - Real-time market data visualization
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🎪 Modern UI** - Built with shadcn/ui components and Tailwind CSS

## 🎨 Screenshots

The app features a stunning golden color palette with:
- Dynamic golden gradient backgrounds
- Theme switching (light/dark modes)
- Animated UI elements
- Professional data visualization

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd golden-future-glance-main

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🛠️ Built With

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom golden theme
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Data Visualization**: Custom charts and metrics
- **Theme Management**: next-themes

## 📱 Application Structure

### Dashboard Tabs
1. **Dashboard** - Main overview with live prices and key metrics
2. **Scenarios** - Market scenario analysis and predictions
3. **What-If** - Interactive simulation tools
4. **High-Freq Data** - Real-time high-frequency market data

### Key Components

- `LivePriceCard` - Real-time gold price display
- `PriceChart` - Interactive price charts with prediction overlays
- `MetricsCards` - Key market metrics and prediction confidence scores
- `PredictionPanel` - Advanced price predictions and analysis engine
- `ScenarioAnalysis` - Machine learning-powered market scenario modeling
- `WhatIfSimulator` - Interactive prediction simulation tools
- `ThemeToggle` - Light/dark mode switcher

## 🎨 Theme System

The app features a custom golden color palette:
- **Gold Accents**: Various shades of gold for highlights
- **Professional Backgrounds**: Clean, readable backgrounds
- **Smart Contrast**: Optimized text contrast for both themes
- **Consistent Styling**: Unified design across all components

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

### API Integration
The app supports Alpha Vantage API for real market data, but also includes intelligent mock data for development and demonstration.

## 📊 Data Sources & Prediction Model

- **Primary**: Alpha Vantage API (when configured)
- **Fallback**: Intelligent simulation with realistic price movements
- **Update Frequency**: Real-time updates every 3 seconds
- **Prediction Engine**: Advanced machine learning algorithms for price forecasting
- **Historical Analysis**: Deep analysis of historical gold price patterns
- **Market Indicators**: Integration of multiple economic and market indicators
- **Accuracy Metrics**: Continuous model performance monitoring and optimization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Tailwind CSS for the utility-first styling
- Alpha Vantage for market data API
- React and Vite communities for excellent tooling
