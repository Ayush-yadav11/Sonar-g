import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import HistoricalDataPage from "./pages/HistoricalDataPage";
import ScenariosPage from "./pages/ScenariosPage";
import RuralLendingPage from "./pages/RuralLendingPage";
import GoldPricePrediction from "@/components/GoldPricePrediction";
import { Navbar } from "@/components/Navbar";

const queryClient = new QueryClient();

const App = () => {
  const [isLive, setIsLive] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar isLive={isLive} onToggleLive={() => setIsLive(!isLive)} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Index isLive={isLive} setIsLive={setIsLive} />} />
              <Route path="/prediction" element={<GoldPricePrediction />} />
              <Route path="/rural-lending" element={<RuralLendingPage />} />
              <Route path="/historical" element={<HistoricalDataPage />} />
              <Route path="/scenarios" element={<ScenariosPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
