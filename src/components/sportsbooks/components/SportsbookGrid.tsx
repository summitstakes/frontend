import React from 'react';
import { Star, Trophy, Check, Shield, ExternalLink, Info } from 'lucide-react';
import { SportsbookGridProps } from '../types';

export function SportsbookGrid({ sportsbooks, isLoading }: SportsbookGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index}
            className="animate-pulse bg-white/5 rounded-xl p-4 border border-white/10"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'fadeIn 0.8s ease-out forwards'
            }}
          >
            <div className="w-12 h-12 bg-white/10 rounded-lg mb-3" />
            <div className="h-5 bg-white/10 rounded-full w-3/4 mb-2 animate-shimmer" />
            <div className="h-4 bg-white/10 rounded-full w-1/2 animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (!sportsbooks.length) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-[#8000FF]" />
        </div>
        <h3 className="text-xl font-urbanist font-bold text-white mb-2">No Sportsbooks Available</h3>
        <p className="text-white/60 text-sm max-w-md mx-auto">
          Please select a different region or location to view available sportsbooks.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sportsbooks.map((sportsbook, index) => (
        <div
          key={sportsbook.id}
          className="relative group"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animation: 'fadeIn 0.8s ease-out forwards'
          }}
        >
          {/* Card Number Badge */}
          <div className="absolute -top-3 -right-3 z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8000FF] blur-md opacity-50" />
              <div className="relative w-8 h-8 bg-[#8000FF] rounded-lg flex items-center justify-center
                transition-transform duration-300">
                <span className="text-white font-urbanist font-bold text-sm">
                  {index + 1}
                </span>
              </div>
            </div>
          </div>

          {/* Card Container */}
          <div className="group relative bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
            border border-[#8000FF]/20 rounded-xl overflow-hidden hover:border-[#8000FF]/40 
            transition-all duration-500 hover:-translate-y-1 p-4
            hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]">
            
            {/* Enhanced Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

            {/* Card Content */}
            <div className="relative">
              {/* Header with Logo & Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 
                  flex items-center justify-center group-hover:scale-110 transition-transform duration-500
                  overflow-hidden">
                  <img 
                    src={sportsbook.logo} 
                    alt={sportsbook.name} 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-urbanist font-bold text-white group-hover:text-[#8000FF] 
                      transition-colors">
                      {sportsbook.name}
                    </h3>
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Shield className="w-3 h-3 text-emerald-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(sportsbook.rating) 
                            ? 'text-[#8000FF]' 
                            : 'text-white/20'}`}
                          fill={i < Math.floor(sportsbook.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-xs">({sportsbook.rating})</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm mb-4 line-clamp-2">{sportsbook.description}</p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {sportsbook.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1.5 group/feature">
                    <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0
                      group-hover/feature:bg-[#8000FF]/30 transition-colors">
                      <Check className="w-2.5 h-2.5 text-[#8000FF]" />
                    </div>
                    <span className="text-white/80 text-xs truncate group-hover/feature:text-white 
                      transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 h-[36px] bg-[#8000FF] text-white font-urbanist font-bold text-sm
                  rounded-lg hover:bg-[#6700CC] transition-all duration-300 flex items-center 
                  justify-center gap-2 group/btn relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6700CC] opacity-0 
                    group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10">Visit Site</span>
                  <ExternalLink className="w-4 h-4 relative z-10 group-hover/btn:translate-x-0.5 
                    group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
                <button className="w-[36px] h-[36px] bg-[#8000FF]/10 rounded-lg hover:bg-[#8000FF]/20 
                  transition-colors flex items-center justify-center">
                  <Info className="w-4 h-4 text-[#8000FF]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}