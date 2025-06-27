
import React from 'react';

export const LiquidGoldBackground: React.FC = () => {
  const styles = `
    .liquid-gold-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
      background: linear-gradient(45deg, #fbbf24, #f59e0b, #d97706, #b45309);
      animation: liquidFlow 15s ease-in-out infinite;
    }

    .blob-1 {
      width: 300px;
      height: 300px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    .blob-2 {
      width: 400px;
      height: 400px;
      top: 60%;
      right: 10%;
      animation-delay: -5s;
    }

    .blob-3 {
      width: 250px;
      height: 250px;
      bottom: 20%;
      left: 30%;
      animation-delay: -10s;
    }

    .blob-4 {
      width: 350px;
      height: 350px;
      top: 30%;
      right: 30%;
      animation-delay: -7.5s;
    }

    .floating-particle {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, #fbbf24, transparent 70%);
      animation: floatParticle 12s linear infinite;
    }

    .particle-1 {
      width: 8px;
      height: 8px;
      top: 20%;
      left: 15%;
      animation-delay: 0s;
    }

    .particle-2 {
      width: 12px;
      height: 12px;
      top: 70%;
      left: 80%;
      animation-delay: -3s;
    }

    .particle-3 {
      width: 6px;
      height: 6px;
      top: 40%;
      left: 60%;
      animation-delay: -6s;
    }

    .particle-4 {
      width: 10px;
      height: 10px;
      top: 80%;
      left: 40%;
      animation-delay: -9s;
    }

    .particle-5 {
      width: 14px;
      height: 14px;
      top: 10%;
      left: 70%;
      animation-delay: -4.5s;
    }

    @keyframes liquidFlow {
      0%, 100% {
        transform: translateX(0) translateY(0) scale(1);
        opacity: 0.3;
      }
      25% {
        transform: translateX(-20px) translateY(-30px) scale(1.1);
        opacity: 0.4;
      }
      50% {
        transform: translateX(20px) translateY(20px) scale(0.9);
        opacity: 0.5;
      }
      75% {
        transform: translateX(-10px) translateY(15px) scale(1.05);
        opacity: 0.35;
      }
    }

    @keyframes floatParticle {
      0% {
        transform: translateY(100vh) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) translateX(50px);
        opacity: 0;
      }
    }
  `;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Main liquid gold animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="liquid-gold-blob blob-1"></div>
        <div className="liquid-gold-blob blob-2"></div>
        <div className="liquid-gold-blob blob-3"></div>
        <div className="liquid-gold-blob blob-4"></div>
      </div>
      
      {/* Additional flowing particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="floating-particle particle-1"></div>
        <div className="floating-particle particle-2"></div>
        <div className="floating-particle particle-3"></div>
        <div className="floating-particle particle-4"></div>
        <div className="floating-particle particle-5"></div>
      </div>
    </div>
  );
};
