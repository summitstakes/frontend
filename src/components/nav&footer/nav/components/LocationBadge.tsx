import React from 'react';
import { Navigation } from 'lucide-react';
import { CA } from 'country-flag-icons/react/3x2';

interface LocationBadgeProps {
  location: string;
  onClick: () => void;
}

export function LocationBadge({ location, onClick }: LocationBadgeProps) {
  return (
    <button
      onClick={onClick}
      className="absolute -top-[32px] left-1/2 -translate-x-1/2 w-[360px] h-[32px] 
        bg-gradient-to-br from-[#120D1D] to-[#120D1D] backdrop-blur-xl 
        border-t border-l border-r border-[#8000FF]/20 rounded-t-xl overflow-hidden
        shadow-[0_-8px_32px_-6px_rgba(128,0,255,0.15)]"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] rotate-[35deg] transform-gpu"
              style={{
                width: '200%',
                left: '-50%',
                top: `${i * 12}px`,
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(128,0,255,0.03)'}, transparent)`,
                animation: 'slideUp 8s linear infinite',
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>

        {/* Subtle Glowing Orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8000FF]/10 to-transparent 
          rounded-full blur-2xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#8000FF]/10 to-transparent 
          rounded-full blur-2xl opacity-30" />

        {/* Subtle Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent
          animate-shimmer" />
      </div>

      {/* Content Container */}
      <div className="relative w-full h-full grid grid-cols-2">
        {/* Left Side - Region */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center">
            <Navigation className="w-2.5 h-2.5 text-white/60" />
          </div>
          <span className="text-white/60 text-[11px] font-medium">
            North America
          </span>
        </div>

        {/* Right Side - Current Location with Flag */}
        <div className="flex items-center justify-center gap-2">
          {/* Flag Container */}
          <div className="relative">
            <div className="w-5 h-3.5 overflow-hidden rounded-[2px] border border-[#8000FF]/20
              shadow-[0_0_10px_rgba(128,0,255,0.1)]">
              <CA className="w-full h-full object-cover" />
            </div>
            {/* Pulsing Dot */}
            <div className="absolute -top-0.5 -right-0.5">
              <div className="relative">
                <div className="absolute inset-0 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping opacity-75" />
                <div className="relative w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              </div>
            </div>
          </div>

          {/* Location Text */}
          <span className="text-white/60 text-[11px] font-medium">
            {location}
          </span>
        </div>
      </div>

      {/* Bottom Arrow */}
      <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2">
        <div className="relative w-3 h-3">
          {/* Arrow Shadow */}
          <div className="absolute inset-0 bg-[#8000FF]/10 rotate-45 transform origin-center blur-sm" />
          {/* Arrow Body */}
          <div className="relative w-3 h-3 bg-[#120D1D] border border-[#8000FF]/20 rotate-45 
            transform origin-center shadow-[0_0_10px_rgba(128,0,255,0.1)]" />
        </div>
      </div>

      {/* Subtle Active State */}
      <div className="absolute inset-0 bg-[#8000FF]/[0.02]" />
    </button>
  );
}
