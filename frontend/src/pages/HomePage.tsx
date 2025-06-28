import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'ML-Powered Price Prediction',
    desc: 'LSTM neural network model trained on historical gold price data for accurate forecasting.'
  },
  {
    title: 'Real-time Market Tracking',
    desc: 'Live gold price updates with API integration capabilities.'
  },
  {
    title: 'Multi-timeframe Forecasting',
    desc: 'Next day, week, and custom (1-30 day) predictions.'
  },
  {
    title: 'Trend Analysis',
    desc: 'Pattern recognition and historical data comparison.'
  },
  {
    title: 'Responsive UI',
    desc: 'Modern interface with light/dark mode support.'
  },
  {
    title: 'Interactive Dashboard',
    desc: 'Multiple tabs for data views and prediction tools.'
  },
  {
    title: 'Scenario Analysis',
    desc: '"What-if" simulation for market conditions.'
  },
  {
    title: 'API Integration',
    desc: 'RESTful endpoints for prediction services.'
  },
];

const tech = [
  'Python 3.11+',
  'Flask & Flask-CORS',
  'TensorFlow',
  'NumPy & Pandas',
  'React 18 + TypeScript',
  'Vite',
  'Tailwind CSS',
  'shadcn/ui',
  'Recharts',
  'React Query',
];

const projectStructure = [
  'backend/    # Flask API server',
  'frontend/   # React frontend',
  'dataset/    # Training datasets',
  'Gold_Price_Prediction_LSTM.ipynb  # Model training notebook',
  'setup_project.bat  # Complete project setup',
];

const HomePage = () => (
  <div className="min-h-screen relative overflow-hidden bg-app-theme-cream">
    {/* Animated Golden Background */}
    <div className="absolute inset-0 -z-10 animate-gold-bg">
      <svg width="100%" height="100%" className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <radialGradient id="gold1" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#F3C623" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFB22C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gold2" cx="70%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#FFB22C" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FA812F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="30%" cy="30%" r="400" fill="url(#gold1)">
          <animate attributeName="cx" values="30%;40%;30%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="30%;40%;30%" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle cx="70%" cy="70%" r="300" fill="url(#gold2)">
          <animate attributeName="cx" values="70%;60%;70%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="cy" values="70%;60%;70%" dur="11s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
    <div className="relative z-10">
      {/* Hero */}
      <section className="pt-36 pb-16 text-center max-w-3xl mx-auto px-4">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-app-neutral-900 mb-4 tracking-tight">MidasTrend</h1>
          <p className="text-xl md:text-2xl text-app-theme-orange-dark mb-6 font-medium">
            A sophisticated gold price prediction platform with real-time market tracking and advanced machine learning algorithms.
          </p>
          <p className="text-lg text-app-neutral-600 mb-8">
            Designed for professional gold market analysis and forecasting.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-theme-warm hover:bg-gradient-theme-warm/90 text-white shadow-lg hover:shadow-xl rounded-xl px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
          >
            <Link to="/dashboard">Explore Dashboard</Link>
          </Button>
        </div>
      </section>
      {/* Features */}
      <section className="container mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-app-theme-orange text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map(f => (
            <div 
              key={f.title} 
              className="bg-white rounded-2xl shadow p-6 border border-app-theme-yellow/20 hover:shadow-lg hover:bg-white transform hover:scale-105 transition-all duration-200 flex flex-col items-center text-center"
            >
              <div className="font-bold text-lg text-app-theme-orange-dark mb-2">{f.title}</div>
              <div className="text-app-neutral-600 text-sm">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full py-8 bg-white/80 border-t border-app-theme-yellow/20 text-center text-app-neutral-600 text-sm">
        &copy; {new Date().getFullYear()} MidasTrend. All rights reserved.
      </footer>
    </div>
  </div>
);

export default HomePage;
