import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Trophy, Target, Star, Sparkles, ArrowRight, Shield, Clock, Users, LineChart } from 'lucide-react';

export function InfoPanel() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Enhanced Why Use Our Calculators */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-2xl relative group overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/20 
            to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/20 
            to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#8000FF]" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-[#8000FF] 
                flex items-center justify-center animate-bounce">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white text-lg">Professional Tools</h3>
              <p className="text-white/60 text-sm">Trusted by experts worldwide</p>
            </div>
          </div>

          {/* Enhanced Feature List */}
          <div className="space-y-4">
            {[
              {
                icon: <Calculator className="w-4 h-4" />,
                title: 'Advanced Algorithms',
                desc: 'Real-time calculations with professional-grade accuracy'
              },
              {
                icon: <LineChart className="w-4 h-4" />,
                title: 'Market Coverage',
                desc: 'Support for all major betting markets and odds formats'
              },
              {
                icon: <Clock className="w-4 h-4" />,
                title: 'Instant Updates',
                desc: 'Lightning-fast calculations for time-sensitive decisions'
              },
              {
                icon: <Shield className="w-4 h-4" />,
                title: 'Reliable Results',
                desc: 'Triple-checked calculations you can trust'
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3 group/feature">
                <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center shrink-0
                  group-hover/feature:bg-[#8000FF]/20 transition-colors">
                  <div className="text-[#8000FF]">{feature.icon}</div>
                </div>
                <div>
                  <div className="font-urbanist font-bold text-white text-sm mb-1 
                    group-hover/feature:text-[#8000FF] transition-colors">
                    {feature.title}
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: <Users />, label: 'Active Users', value: '50K+' },
          { icon: <Calculator />, label: 'Daily Calcs', value: '1M+' }
        ].map((stat, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
            border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
            transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center mb-3
              group-hover:scale-110 transition-transform">
              <div className="w-5 h-5 text-[#8000FF]">{stat.icon}</div>
            </div>
            <div className="text-lg font-urbanist font-bold text-white group-hover:text-[#8000FF] 
              transition-colors">
              {stat.value}
            </div>
            <div className="text-white/40 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Enhanced CTA Card */}
      <div className="p-6 bg-gradient-to-br from-[#8000FF]/20 to-[#8000FF]/5 
        border border-[#8000FF]/20 rounded-2xl relative overflow-hidden
        hover:border-[#8000FF]/40 transition-all duration-500 group">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/20 
            to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/20 
            to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
              p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
              <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#8000FF]" />
              </div>
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white text-lg">Ready to Start?</h3>
              <p className="text-white/60 text-sm">Join thousands of smart bettors</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/signup')}
              className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                hover:bg-[#6700CC] transition-all duration-300 flex items-center justify-center gap-2
                group/btn relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6700CC] opacity-0 
                group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10">Create Free Account</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/tools')}
              className="w-full h-[42px] bg-[#8000FF]/10 text-[#8000FF] font-urbanist font-bold rounded-xl
                hover:bg-[#8000FF]/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              <span>View All Tools</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}