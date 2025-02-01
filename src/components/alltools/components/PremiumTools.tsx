import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy, ArrowUpRight, Star, ArrowRight, Sparkles, Crown } from 'lucide-react';
import { PremiumTool } from '../types';

interface PremiumToolsProps {
  tools: PremiumTool[];
}

export function PremiumTools({ tools }: PremiumToolsProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Regular Tool Cards */}
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="group relative p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
            border border-[#8000FF]/20 rounded-xl hover:border-[#8000FF]/40 
            transition-all duration-500 cursor-pointer hover:-translate-y-1
            hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)] h-[200px] flex flex-col"
        >
          {tool.popular && (
            <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-[#8000FF] to-[#A855F7]
              rounded-full text-xs font-bold text-white shadow-lg animate-pulse">
              Popular
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center
                group-hover:scale-110 transition-transform duration-500">
                <div className="w-6 h-6 text-[#8000FF]">
                  {tool.icon}
                </div>
              </div>
              <div>
                <h3 className="font-urbanist font-bold text-white text-lg group-hover:text-[#8000FF] 
                  transition-colors">
                  {tool.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-white/40 text-xs">{tool.stat}</span>
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
              group-hover:bg-[#8000FF] transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#8000FF] group-hover:text-white 
                group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1 group-hover:text-white/80 
            transition-colors">
            {tool.description}
          </p>

          <div className="flex items-center gap-2 mt-auto">
            <div className="px-3 py-1.5 rounded-lg bg-[#8000FF]/10 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#8000FF]" />
              <span className="text-[#8000FF] text-xs">Pro Feature</span>
            </div>
          </div>
        </div>
      ))}

      {/* Enhanced CTA Card */}
      <div
        onClick={() => navigate('/signup')}
        className="group relative p-6 bg-gradient-to-br from-[#8000FF]/30 to-[#8000FF]/10 
          border border-[#8000FF] rounded-xl hover:border-[#8000FF] 
          transition-all duration-500 cursor-pointer hover:-translate-y-1
          shadow-[0_8px_32px_-6px_rgba(128,0,255,0.4)] overflow-visible h-[200px] flex flex-col"
      >
        {/* Animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/30 
            to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/30 
            to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Enhanced Price Badge */}
        <div className="absolute -top-3 -right-3 z-50">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] blur-lg opacity-50" />
            <div className="relative flex flex-col">
              <div className="px-4 py-1.5 bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full
                flex items-center gap-2 shadow-lg">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span className="text-white text-sm font-bold tracking-wide">50% OFF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Icon and title on same line, centered */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center
              group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF] to-[#A855F7] opacity-0 
                group-hover:opacity-100 transition-opacity" />
              <Crown className="w-6 h-6 text-white relative z-10" />
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white text-lg group-hover:text-white 
                transition-colors">
                Get Pro Access
              </h3>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-xs">$50/month</span>
              </div>
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed mb-4 flex-1">
            Unlock all premium tools and take your betting strategy to the next level with our comprehensive suite of professional features.
          </p>

          <div className="flex items-center gap-2 mt-auto">
            <button className="w-full h-[36px] bg-white text-[#8000FF] font-urbanist font-bold 
              rounded-lg hover:bg-white/90 transition-all duration-300 flex items-center 
              justify-center gap-2 group/btn relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] opacity-0 
                group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10 group-hover/btn:text-white transition-colors">Join Pro Plan</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:text-white 
                group-hover/btn:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}