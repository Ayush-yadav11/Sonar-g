import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SplineBackground } from '@/components/Background';

const About = () => {
  return (
    <div className="min-h-screen pt-24">
      <SplineBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About MidasTrend</h1>
          
          <Card className="mb-8 border-app-accent-gold/20">
            <CardHeader>
              <CardTitle className="text-app-accent-gold">Gold Price Prediction Platform</CardTitle>
              <CardDescription>Advanced analytics for gold market trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                MidasTrend is a sophisticated gold price prediction platform that utilizes 
                machine learning and statistical analysis to forecast gold price trends. 
                Our LSTM (Long Short-Term Memory) neural network model has been trained on 
                over a decade of historical gold price data to provide accurate predictions.
              </p>
              <p>
                The platform offers real-time price monitoring, historical data analysis, 
                and scenario simulation to help investors and gold enthusiasts make informed 
                decisions based on data-driven insights.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-app-accent-gold/20">
              <CardHeader>
                <CardTitle className="text-app-accent-gold">Model Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our LSTM model achieves approximately 96% accuracy in predicting next-day 
                  gold prices. The model was trained on 10 years of historical data (2013-2023) 
                  and uses a 60-day window for making predictions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-app-accent-gold/20">
              <CardHeader>
                <CardTitle className="text-app-accent-gold">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Real-time price monitoring</li>
                  <li>ML-based price predictions</li>
                  <li>Historical trend analysis</li>
                  <li>Scenario simulation</li>
                  <li>High-frequency data insights</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-app-accent-gold/20">
            <CardHeader>
              <CardTitle className="text-app-accent-gold">Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-app-text-secondary">
                MidasTrend is a data analysis tool for informational purposes only. While we strive for accuracy, 
                gold price predictions involve inherent risks and uncertainties. The information provided should not
                be considered financial advice. Always consult with a qualified financial advisor before making investment decisions.
              </p>
            </CardContent>
            <CardFooter className="text-sm text-app-text-secondary border-t border-border pt-4">
              © {new Date().getFullYear()} MidasTrend | All rights reserved
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
