import React from 'react';
import { Star, Lock } from 'lucide-react';
import { PremiumTools } from './components/PremiumTools';
import { FreeTools } from './components/FreeTools';
import { premiumTools } from './data/tools';

export function AllTools() {
  return (
    <div className="min-h-screen bg-[#06060C] -mt-[120px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#8000FF]/5 rounded-full 
          blur-[80px] animate-pulse mix-blend-screen" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#8000FF]/5 rounded-full 
          blur-[90px] animate-pulse mix-blend-screen" style={{ animationDuration: '7s' }} />

        {/* Diagonal divider */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated diagonal lines */}
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
        {/* Enhanced Header Section - Aligned with Contact page */}
        <div className="pt-[160px] pb-12">
          <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white mb-6 leading-tight
            animate-in slide-in-from-left duration-700">
            Professional
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
              animate-gradient relative">
              Betting Tools
              <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                from-transparent via-[#8000FF] to-transparent opacity-50" />
            </span>
          </h1>
          
          <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl
            animate-in slide-in-from-left duration-700 delay-200">
            Access our comprehensive suite of betting tools designed to help you make data-driven decisions 
            and maximize your profits across all major sportsbooks.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-[3fr_1fr] gap-16 pb-24 relative">
          {/* Premium Tools Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#8000FF]" />
                </div>
                <div>
                  <h2 className="text-xl font-urbanist font-bold text-white">Premium Tools</h2>
                  <p className="text-white/60 text-sm">Professional-grade betting tools</p>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#8000FF]/10 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#8000FF]" />
                <span className="text-[#8000FF] text-sm">Subscription Needed</span>
              </div>
            </div>

            {/* Premium Tools Grid */}
            <PremiumTools tools={premiumTools} />
          </div>

          {/* Enhanced Divider with Decorative Elements */}
          <div className="relative -mx-8">
            {/* Main Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#8000FF]/20 to-transparent" />
            
            {/* Decorative Dots */}
            <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-[#8000FF]/40" />
            <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#8000FF]" />
            <div className="absolute left-[-4px] bottom-0 w-2 h-2 rounded-full bg-[#8000FF]/40" />

            {/* Decorative Lines */}
            <div className="absolute left-0 top-[10%] w-8 h-[1px] bg-gradient-to-r from-[#8000FF]/40 to-transparent" />
            <div className="absolute left-0 top-[30%] w-4 h-[1px] bg-gradient-to-r from-[#8000FF]/20 to-transparent" />
            <div className="absolute left-0 top-[70%] w-4 h-[1px] bg-gradient-to-r from-[#8000FF]/20 to-transparent" />
            <div className="absolute left-0 top-[90%] w-8 h-[1px] bg-gradient-to-r from-[#8000FF]/40 to-transparent" />

            {/* Animated Glow Effect */}
            <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-32 
              bg-gradient-to-r from-[#8000FF]/20 to-transparent blur-lg animate-pulse"
              style={{ animationDuration: '2s' }} />

            {/* Free Tools Section */}
            <FreeTools />
          </div>
        </div>
      </div>
    </div>
  );
}