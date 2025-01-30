import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculatorCard } from './components/CalculatorCard';
import { InfoPanel } from './components/InfoPanel';
import { calculators } from './data/calculators';

export function AllCalculators() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#06060C] -mt-[120px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />

        {/* Additional gradient orbs */}
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#8000FF]/5 rounded-full 
          blur-[80px] animate-pulse mix-blend-screen" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#8000FF]/5 rounded-full 
          blur-[90px] animate-pulse mix-blend-screen" style={{ animationDuration: '7s' }} />

        {/* Diagonal lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[1px] rotate-[35deg] transform-gpu"
                style={{
                  width: '400%',
                  left: '-150%',
                  top: `${i * 18}px`,
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(128,0,255,0.03)'}, transparent)`,
                  animation: 'slideUp 8s linear infinite',
                  animationDelay: `${i * 0.6}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[#8000FF]/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `particle ${5 + Math.random() * 5}s linear infinite`,
              '--tx': `${(Math.random() - 0.5) * 200}px`,
              '--ty': `${(Math.random() - 0.5) * 200}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Split Screen Layout */}
        <div className="pt-[160px] pb-24">
          <div className="grid grid-cols-[1fr_450px] gap-16 items-start">
            {/* Left Column - Main Content */}
            <div>
              <div className="space-y-12">
                {/* Title Section */}
                <div>
                  <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white leading-tight mb-6">
                    Professional Grade
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                      animate-gradient relative">
                      Betting Calculators
                      <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                        from-transparent via-[#8000FF] to-transparent opacity-50" />
                    </span>
                  </h1>
                  
                  <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
                    Our comprehensive suite of betting calculators helps you make data-driven decisions 
                    and maximize your profits across all major sportsbooks.
                  </p>
                </div>

                {/* Decorative Divider */}
                <div className="relative">
                  <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent" />
                  <div className="absolute left-1/2 -translate-x-1/2 -top-4 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
                      flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#8000FF] rounded-full" />
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-[#8000FF]/40 to-transparent" />
                  </div>
                </div>

                {/* Calculator Cards */}
                <div className="grid grid-cols-2 gap-6 pt-8">
                  {calculators.map((calculator) => (
                    <CalculatorCard
                      key={calculator.id}
                      calculator={calculator}
                      onClick={() => navigate(calculator.path)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Info Panel */}
            <div className="sticky top-8">
              <InfoPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}