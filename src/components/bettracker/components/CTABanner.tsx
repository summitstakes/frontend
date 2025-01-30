import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, Trophy, Target } from 'lucide-react';

export function CTABanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-r from-[#06060C] via-[#8000FF]/10 to-[#06060C] relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-[20%] w-[300px] h-[300px] bg-[#8000FF]/20 rounded-full 
          blur-[80px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] bg-[#8000FF]/20 rounded-full 
          blur-[80px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
        
        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
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

      {/* Enhanced Content Container */}
      <div className="max-w-[1440px] mx-auto px-6 h-[120px] flex items-center justify-between relative">
        {/* Left Content with Stats */}
        <div className="flex items-center gap-8">
          {/* Icon and Text */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#8000FF]" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-[#8000FF] 
                flex items-center justify-center animate-bounce">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-urbanist font-bold text-white mb-1">
                Did we mention it's completely free?
              </h3>
              <p className="text-white/60">Join thousands of smart bettors tracking their bets</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 pl-6 border-l border-[#8000FF]/20">
            {[
              { icon: <Trophy className="w-4 h-4" />, value: '10K+', label: 'Active Users' },
              { icon: <Target className="w-4 h-4" />, value: '99%', label: 'Success Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-[#8000FF]/20 flex items-center justify-center">
                    <div className="text-[#8000FF]">{stat.icon}</div>
                  </div>
                  <span className="text-lg font-urbanist font-bold text-white">{stat.value}</span>
                </div>
                <span className="text-white/40 text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <button
          onClick={() => navigate('/signup')}
          className="h-[48px] bg-gradient-to-r from-[#8000FF] to-[#A855F7] text-white font-urbanist 
            font-bold px-8 rounded-xl hover:shadow-[0_0_30px_rgba(128,0,255,0.3)] 
            transition-all duration-500 flex items-center gap-2 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#8000FF] opacity-0 
            group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10">Join For Free</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Diagonal Lines */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] rotate-[35deg] transform-gpu"
              style={{
                width: '200%',
                left: '-50%',
                top: `${i * 8}px`,
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(128,0,255,0.02)'}, transparent)`,
                animation: 'slideUp 8s linear infinite',
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Top and Bottom Borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent" />
    </div>
  );
}