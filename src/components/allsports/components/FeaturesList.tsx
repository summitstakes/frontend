import React from 'react';
import { Target, Users, TrendingUp, Star, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FeaturesList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Live Stats Panel */}
      <div className="p-6 bg-gradient-to-br from-[#8000FF]/10 to-[#8000FF]/5 
        border border-[#8000FF]/20 rounded-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8000FF]/20 rounded-full blur-xl 
          opacity-30 group-hover:opacity-50 transition-opacity" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8000FF]/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#8000FF]" />
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white text-lg">Live Stats</h3>
              <p className="text-white/60 text-sm">Real-time updates</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Users />, value: '50K+', label: 'Active Users' },
              { icon: <TrendingUp />, value: '1M+', label: 'Daily Odds' },
              { icon: <Star />, value: '24/7', label: 'Coverage' },
              { icon: <Trophy />, value: '99%', label: 'Accuracy' }
            ].map((stat, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-xl border border-white/10
                group/stat hover:border-[#8000FF]/20 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center mb-2
                  group-hover/stat:scale-110 transition-transform">
                  <div className="text-[#8000FF]">{stat.icon}</div>
                </div>
                <div className="text-lg font-urbanist font-bold text-white">{stat.value}</div>
                <div className="text-white/40 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-4">
        {[
          { 
            icon: <Target />, 
            title: 'Matchups & Scores',
            desc: 'Real-time updates across all sports',
            stat: '1000+ Daily'
          },
          { 
            icon: <Users />, 
            title: 'Player & Team Data',
            desc: 'Comprehensive statistics and analysis',
            stat: '10K+ Players'
          },
          { 
            icon: <TrendingUp />, 
            title: 'Line Movement',
            desc: 'Track odds changes in real-time',
            stat: 'Live Updates'
          },
          { 
            icon: <Star />, 
            title: 'Best Odds',
            desc: 'Compare odds across major sportsbooks',
            stat: '20+ Books'
          }
        ].map((feature, index) => (
          <div key={index} className="h-[88px] p-4 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
            border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
            transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 h-full">
              <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center
                group-hover:scale-110 transition-transform shrink-0">
                <div className="text-[#8000FF]">{feature.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-urbanist font-bold text-white group-hover:text-[#8000FF] 
                    transition-colors truncate">
                    {feature.title}
                  </h3>
                  <div className="px-2 py-0.5 rounded-lg bg-[#8000FF]/10 text-[#8000FF] text-xs shrink-0 ml-2">
                    {feature.stat}
                  </div>
                </div>
                <p className="text-white/60 text-sm truncate">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button 
        onClick={() => navigate('/signup')}
        className="w-full p-4 bg-gradient-to-br from-[#8000FF]/20 to-[#8000FF]/5 
          border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
          transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8000FF]/20 rounded-full blur-xl 
            opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8000FF]/20 rounded-full blur-xl 
            opacity-30 group-hover:opacity-50 transition-opacity" />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8000FF]/20 flex items-center justify-center
              group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-[#8000FF]" />
            </div>
            <div className="text-left">
              <h3 className="font-urbanist font-bold text-white text-lg group-hover:text-[#8000FF] 
                transition-colors">
                Get Started
              </h3>
              <p className="text-white/60 text-sm">Join thousands of smart bettors</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#8000FF]/20 flex items-center justify-center
            group-hover:bg-[#8000FF] transition-colors">
            <ArrowRight className="w-4 h-4 text-[#8000FF] group-hover:text-white 
              group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </button>
    </div>
  );
}