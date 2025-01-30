import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { Calculator } from '../types';

interface CalculatorCardProps {
  calculator: Calculator;
  onClick: () => void;
}

export function CalculatorCard({ calculator, onClick }: CalculatorCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative p-6 bg-gradient-to-br from-[#120D1D] to-[#1A1527] 
        border border-[#8000FF]/20 rounded-2xl hover:border-[#8000FF]/40 
        transition-all duration-500 cursor-pointer hover:-translate-y-2
        hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)] text-left
        overflow-visible w-full h-[280px] flex flex-col"
    >
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${calculator.color} opacity-5 
        group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {/* Diagonal Lines */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] rotate-[35deg] transform-gpu"
            style={{
              width: '200%',
              left: '-50%',
              top: `${i * 30}px`,
              background: `linear-gradient(90deg, transparent, ${calculator.color.split(' ')[0].replace('from-', '')}10, transparent)`,
              animation: 'slideUp 8s linear infinite',
              animationDelay: `${i * 0.6}s`
            }}
          />
        ))}
      </div>

      {/* Popular Badge */}
      {calculator.popular && (
        <div className="absolute -top-3 -right-3 z-50">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] blur-lg opacity-50" />
            <div className="relative flex flex-col">
              <div className="px-4 py-1.5 bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full
                flex items-center gap-2 shadow-lg">
                <div className="w-4 h-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-white text-sm font-bold tracking-wide">POPULAR</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section with Icon and Title on same line */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF]/20 to-[#8000FF]/5 
              p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
              <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center
                group-hover:scale-110 transition-transform duration-500">
                <div className="text-[#8000FF] transform group-hover:rotate-12 transition-transform duration-500">
                  {calculator.icon}
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-urbanist font-bold text-white group-hover:text-[#8000FF] 
              transition-colors line-clamp-1">
              {calculator.name}
            </h3>
          </div>

          {/* Action Button */}
          <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center
            group-hover:bg-[#8000FF] transition-colors">
            <ArrowRight className="w-5 h-5 text-[#8000FF] group-hover:text-white 
              group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Description Section - Fixed Height */}
        <div className="h-[80px]">
          <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 
            transition-colors line-clamp-3">
            {calculator.description}
          </p>
        </div>

        {/* Features List - Fixed Height at Bottom */}
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            {calculator.features.map((feature, index) => (
              <div key={index} className="h-[30px] px-3 flex items-center rounded-lg bg-[#8000FF]/10 
                group-hover:bg-[#8000FF]/20 transition-colors gap-1.5
                border border-[#8000FF]/20 group-hover:border-[#8000FF]/40">
                <Shield className="w-3.5 h-3.5 text-[#8000FF]" />
                <span className="text-[#8000FF] text-xs whitespace-nowrap">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 rounded-2xl">
        {/* Corner Glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8000FF]/10 
          to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#8000FF]/10 
          to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/20 to-[#8000FF]/0
          opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      </div>
    </button>
  );
}