import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { goldPredictionAPI } from '@/services/goldPredictionApi';
import { AlertCircle, TrendingUp, IndianRupee, Scale, Percent } from 'lucide-react';

interface LoanRiskMetrics {
  loanToValue: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  maxLoanAmount: number;
  predictedLTV: number;
  worstCaseLTV: number;
}

const RuralLendingRisk: React.FC = () => {
  // State for loan inputs
  const [goldWeight, setGoldWeight] = useState<number>(10); // in grams
  const [goldPurity, setGoldPurity] = useState<number>(22); // in karats
  const [loanAmount, setLoanAmount] = useState<number>(50000); // in INR
  const [loanDuration, setLoanDuration] = useState<number>(3); // in months

  // State for predictions and calculations
  const [currentGoldPrice, setCurrentGoldPrice] = useState<number>(0); // in INR per gram
  const [predictedPrices, setPredictedPrices] = useState<number[]>([]);
  const [riskMetrics, setRiskMetrics] = useState<LoanRiskMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Constants
  const USD_TO_INR = 83; // Example exchange rate
  const GOLD_PURITY_RATIO = {
    24: 1,
    22: 0.916,
    18: 0.75,
  };

  useEffect(() => {
    fetchCurrentGoldPrice();
  }, []);

  useEffect(() => {
    calculateRiskMetrics();
  }, [goldWeight, goldPurity, loanAmount, currentGoldPrice, predictedPrices]);

  const fetchCurrentGoldPrice = async () => {
    setLoading(true);
    try {
      const response = await goldPredictionAPI.getNextDayPrediction();
      // Convert USD/oz to INR/gram
      const priceInINRPerGram = (response.prediction * USD_TO_INR) / 31.1035; // 1 oz = 31.1035g
      setCurrentGoldPrice(priceInINRPerGram);
      fetchPricePredictions();
    } catch (err) {
      setError('Failed to fetch current gold price');
    } finally {
      setLoading(false);
    }
  };

  const fetchPricePredictions = async () => {
    try {
      const response = await goldPredictionAPI.getCustomPredictions(30); // Get 30 days prediction
      const predictionsInINR = response.predictions.map(price => (price * USD_TO_INR) / 31.1035);
      setPredictedPrices(predictionsInINR);
    } catch (err) {
      setError('Failed to fetch price predictions');
    }
  };

  const calculateRiskMetrics = () => {
    if (!currentGoldPrice || predictedPrices.length === 0) return;

    const purityFactor = GOLD_PURITY_RATIO[goldPurity as keyof typeof GOLD_PURITY_RATIO] || 0.916;
    const currentGoldValue = goldWeight * currentGoldPrice * purityFactor;
    const loanToValue = (loanAmount / currentGoldValue) * 100;

    // Calculate predicted LTV based on minimum predicted price
    const minPredictedPrice = Math.min(...predictedPrices);
    const predictedGoldValue = goldWeight * minPredictedPrice * purityFactor;
    const predictedLTV = (loanAmount / predictedGoldValue) * 100;

    // Add 10% buffer for worst case scenario
    const worstCaseValue = predictedGoldValue * 0.9;
    const worstCaseLTV = (loanAmount / worstCaseValue) * 100;

    // Determine risk level
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (worstCaseLTV > 80) riskLevel = 'High';
    else if (worstCaseLTV > 65) riskLevel = 'Medium';

    // Calculate maximum recommended loan amount (65% of current value)
    const maxLoanAmount = currentGoldValue * 0.65;

    setRiskMetrics({
      loanToValue,
      riskLevel,
      maxLoanAmount,
      predictedLTV,
      worstCaseLTV,
    });
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Rural Gold Loan Risk Assessment
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Calculate loan risk based on gold collateral and market predictions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Enter the gold and loan specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goldWeight">Gold Weight (grams)</Label>
              <Input
                id="goldWeight"
                type="number"
                value={goldWeight}
                onChange={(e) => setGoldWeight(Number(e.target.value))}
                min={1}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goldPurity">Gold Purity (Karats)</Label>
              <select
                id="goldPurity"
                className="w-full p-2 border rounded"
                value={goldPurity}
                onChange={(e) => setGoldPurity(Number(e.target.value))}
              >
                <option value={24}>24K - Pure Gold</option>
                <option value={22}>22K - Standard Jewelry</option>
                <option value={18}>18K - Lower Purity</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount (INR)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                min={1000}
                step={1000}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanDuration">Loan Duration (months)</Label>
              <Slider
                id="loanDuration"
                value={[loanDuration]}
                onValueChange={(value) => setLoanDuration(value[0])}
                min={1}
                max={12}
                step={1}
              />
              <div className="text-sm text-slate-500">{loanDuration} months</div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment Section */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Current market value and risk metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskMetrics && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Gold Rate</Label>
                    <div className="text-2xl font-bold">
                      {formatINR(currentGoldPrice)}/g
                    </div>
                  </div>
                  <div>
                    <Label>Total Gold Value</Label>
                    <div className="text-2xl font-bold">
                      {formatINR(goldWeight * currentGoldPrice * (GOLD_PURITY_RATIO[goldPurity as keyof typeof GOLD_PURITY_RATIO] || 0.916))}
                    </div>
                  </div>
                </div>

                <Alert className={`
                  ${riskMetrics.riskLevel === 'Low' ? 'bg-green-50 border-green-200' :
                    riskMetrics.riskLevel === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'}
                `}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Risk Level: {riskMetrics.riskLevel}</AlertTitle>
                  <AlertDescription>
                    Current LTV: {riskMetrics.loanToValue.toFixed(1)}%<br />
                    Predicted Worst-Case LTV: {riskMetrics.worstCaseLTV.toFixed(1)}%
                  </AlertDescription>
                </Alert>

                <div>
                  <Label>Recommended Maximum Loan</Label>
                  <div className="text-2xl font-bold text-green-600">
                    {formatINR(riskMetrics.maxLoanAmount)}
                  </div>
                </div>

                {riskMetrics.loanToValue > 65 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>High LTV Warning</AlertTitle>
                    <AlertDescription>
                      The requested loan amount exceeds the recommended 65% LTV ratio.
                      Consider reducing the loan amount to {formatINR(riskMetrics.maxLoanAmount)}.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Loading data...</p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Price Prediction Chart */}
      {predictedPrices.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>30-Day Price Prediction</CardTitle>
            <CardDescription>Forecasted gold prices for risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={predictedPrices.map((price, index) => ({
                    day: `Day ${index + 1}`,
                    price: price
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#FFB800"
                    name="Gold Price (INR/g)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RuralLendingRisk;