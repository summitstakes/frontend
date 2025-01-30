import React from 'react';
import { Share2, Users, Star, Sparkles } from 'lucide-react';

export function UpcomingFeaturesBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-[#06060C] via-[#8000FF]/5 to-[#06060C] relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Diagonal lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[1px] rotate-[35deg] transform-gpu"
                style={{
                  width: '200%',
                  left: '-50%',
                  top: `${i * 12}px`,
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(128,0,255,0.02)'}, transparent)`,
                  animation: 'slideUp 8s linear infinite',
                  animationDelay: `${i * 0.4}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#8000FF]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle ${5 + Math.random() * 5}s linear infinite`,
              '--tx': `${(Math.random() - 0.5) * 200}px`,
              '--ty': `${(Math.random() - 0.5) * 200}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="max-w-[1440px] mx-auto px-6 h-[140px] flex items-center justify-center relative">
        {/* Centered Content */}
        <div className="flex items-center gap-12">
          {/* Icon and Title */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#8000FF]" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-lg bg-[#8000FF] 
                flex items-center justify-center animate-bounce">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-urbanist font-bold text-white mb-1">Coming Soon</h3>
              <p className="text-white/60">More exciting features</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center gap-8">
            {[
              { icon: <Share2 className="w-5 h-5" />, text: 'Share Public Bets' },
              { icon: <Users className="w-5 h-5" />, text: 'Follow Pro Bettors' },
              { icon: <Star className="w-5 h-5" />, text: 'Social Features' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                  group-hover:scale-110 transition-transform">
                  <div className="text-[#8000FF]">{feature.icon}</div>
                </div>
                <span className="text-white font-urbanist font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top and Bottom Borders */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent" />
      </div>
    </div>
  );
}