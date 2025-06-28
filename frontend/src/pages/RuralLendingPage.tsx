import React from 'react';
import RuralLendingRisk from '@/components/RuralLendingRisk';

const RuralLendingPage = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Rural Lending Risk Analysis</h1>
        <RuralLendingRisk />
      </div>
    </div>
  );
};

export default RuralLendingPage; 