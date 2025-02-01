import React from 'react';
import { Plus, ArrowRight, Zap, Calculator, ArrowLeftRight, Sigma, Gift, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SplitSection() {
  const navigate = useNavigate();

  return (
    <div className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* Left Column - Custom Bets */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-[#8000FF]" />
                </div>
                <div>
                  <h3 className="text-2xl font-urbanist font-bold text-white">Custom Bets</h3>
                  <p className="text-white/60">Track any bet, from any sportsbook</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                Our flexible bet tracking system allows you to log and monitor any type of bet, 
                regardless of the sportsbook or market type.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Plus />, title: 'Quick Entry', desc: 'Add bets in seconds' },
                { icon: <Calculator />, title: 'Auto Calculations', desc: 'Instant ROI tracking' },
                { icon: <Star />, title: 'Custom Labels', desc: 'Organize your way' },
                { icon: <Zap />, title: 'Real-time Updates', desc: 'Live bet tracking' }
              ].map((feature, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10
                  hover:bg-[#8000FF]/5 hover:border-[#8000FF]/20 transition-all duration-300
                  group/feature">
                  <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center mb-3
                    group-hover/feature:scale-110 transition-transform">
                    <div className="text-[#8000FF]">{feature.icon}</div>
                  </div>
                  <h4 className="font-urbanist font-bold text-white text-sm mb-1">{feature.title}</h4>
                  <p className="text-white/60 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="w-full h-[48px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
              hover:bg-[#6700CC] transition-all duration-300 flex items-center justify-center gap-2
              group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6700CC] opacity-0 
                group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Start Tracking</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Center Divider */}
          <div className="h-full flex flex-col items-center">
            {/* Top Circle */}
            <div className="w-12 h-12 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
              flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#8000FF] rounded-full" />
              </div>
            </div>

            {/* Vertical Line */}
            <div className="flex-1 w-px bg-gradient-to-b from-[#8000FF]/40 via-[#8000FF]/20 to-[#8000FF]/40 
              min-h-[400px]" />

            {/* Bottom Circle */}
            <div className="w-12 h-12 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
              flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#8000FF] rounded-full" />
              </div>
            </div>
          </div>

          {/* Right Column - Tool Integration */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#8000FF]" />
                </div>
                <div>
                  <h3 className="text-2xl font-urbanist font-bold text-white">Seamless Integration</h3>
                  <p className="text-white/60">One-click bet tracking from our tools</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                Automatically track bets placed through our calculators and tools. No manual entry needed - 
                just click once and we'll handle the rest.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="space-y-3">
              {[
                { 
                  icon: <ArrowLeftRight />, 
                  name: 'Arbitrage Calculator',
                  desc: 'Track arbitrage bets automatically'
                },
                { 
                  icon: <Sigma />, 
                  name: '+EV Calculator',
                  desc: 'Monitor expected value bets'
                },
                { 
                  icon: <Gift />, 
                  name: 'Free Bet Converter',
                  desc: 'Track bonus bet conversions'
                }
              ].map((tool, index) => (
                <button key={index} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl
                  hover:bg-[#8000FF]/5 hover:border-[#8000FF]/20 transition-all duration-300
                  group flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                      group-hover:scale-110 transition-transform">
                      <div className="text-[#8000FF]">{tool.icon}</div>
                    </div>
                    <div className="text-left">
                      <h4 className="font-urbanist font-bold text-white text-sm mb-1">{tool.name}</h4>
                      <p className="text-white/60 text-xs">{tool.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#8000FF] 
                    group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => navigate('/calculators')}
              className="w-full h-[48px] bg-[#8000FF]/10 text-white font-urbanist font-bold rounded-xl
                hover:bg-[#8000FF]/20 transition-all duration-300 flex items-center justify-center gap-2
                group border border-[#8000FF]/20 hover:border-[#8000FF]/40"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}