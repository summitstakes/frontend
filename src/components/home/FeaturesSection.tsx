import React from 'react';
import { ArrowLeftRight, Sigma, Calculator, ChevronRight, Trophy, MountainSnow, Target, TrendingUp, Clock, LineChart, Users, Database, Crown, Sparkles } from 'lucide-react';

export function FeaturesSection() {
  return (
    <div className="py-24 bg-[#06060C] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] bg-[#8000FF]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Live Stats Banner */}
        <div className="flex items-center justify-center gap-12 mb-16 overflow-hidden">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-[#8000FF]" />
            <span className="font-urbanist text-white/60">
              <span className="text-white font-bold">20+</span> Supported Sportsbooks
            </span>
          </div>
          <div className="w-[1px] h-4 bg-white/10" />
          <div className="flex items-center gap-3">
            <Database className="w-4 h-4 text-[#8000FF]" />
            <span className="font-urbanist text-white/60">
              <span className="text-white font-bold">100K+</span> Daily Odds Updates
            </span>
          </div>
          <div className="w-[1px] h-4 bg-white/10" />
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#8000FF]" />
            <span className="font-urbanist text-white/60">
              <span className="text-white font-bold">24/7</span> Real-time Updates
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          {/* Left Column - Tool Preview */}
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-[140%] h-[140%] bg-gradient-to-br from-[#8000FF]/20 to-transparent opacity-30 blur-3xl animate-pulse"
              style={{ animationDuration: '3s' }} />
            
            {/* Tools Header */}
            <div className="mb-6 relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-[#8000FF]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-[#8000FF] 
                    flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs font-bold">9</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-urbanist font-bold text-white mb-1">Premium Tools</h3>
                  <p className="text-white/60">Take advantage of all odds, your way!</p>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 h-[2px] w-[30%] 
                bg-gradient-to-r from-[#8000FF] to-transparent" />
            </div>
            
            <div className="relative backdrop-blur-md bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
              border border-[#8000FF]/20 rounded-2xl overflow-hidden hover:border-[#8000FF]/40 
              transition-all duration-300 group">
              
              {/* Tools Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Arbitrage Tool */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-[#8000FF]/5 
                    hover:border-[#8000FF]/20 transition-all duration-300 cursor-pointer group/tool">
                    <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mb-4">
                      <ArrowLeftRight className="w-6 h-6 text-[#8000FF]" />
                    </div>
                    <h3 className="font-urbanist font-bold text-white mb-2">Arbitrage</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Find risk-free opportunities across multiple sportsbooks
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[#8000FF] text-sm font-medium">Learn more</span>
                      <ChevronRight className="w-4 h-4 text-[#8000FF] group-hover/tool:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* EV Tool */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-[#8000FF]/5 
                    hover:border-[#8000FF]/20 transition-all duration-300 cursor-pointer group/tool">
                    <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mb-4">
                      <Sigma className="w-6 h-6 text-[#8000FF]" />
                    </div>
                    <h3 className="font-urbanist font-bold text-white mb-2">+EV</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Calculate expected value and find profitable bets
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[#8000FF] text-sm font-medium">Learn more</span>
                      <ChevronRight className="w-4 h-4 text-[#8000FF] group-hover/tool:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Free Bet Converter */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-[#8000FF]/5 
                    hover:border-[#8000FF]/20 transition-all duration-300 cursor-pointer group/tool">
                    <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mb-4">
                      <Calculator className="w-6 h-6 text-[#8000FF]" />
                    </div>
                    <h3 className="font-urbanist font-bold text-white mb-2">Free Bet Converter</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Maximize value from your free bet promotions
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[#8000FF] text-sm font-medium">Learn more</span>
                      <ChevronRight className="w-4 h-4 text-[#8000FF] group-hover/tool:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Browse All Tools Card */}
                  <div className="p-4 bg-gradient-to-br from-[#8000FF]/20 to-[#8000FF]/5 border border-[#8000FF]/20 
                    rounded-xl hover:bg-[#8000FF]/30 hover:border-[#8000FF]/40 transition-all duration-300 
                    cursor-pointer group/tool relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8000FF] rounded-full blur-[80px] opacity-20" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-[#8000FF]/20 flex items-center justify-center mb-4">
                        <Sparkles className="w-6 h-6 text-[#8000FF]" />
                      </div>
                      <h3 className="font-urbanist font-bold text-white mb-2">And Many More...</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Explore our full suite of premium betting tools and analytics
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-white font-medium text-sm">Browse all tools</span>
                        <ChevronRight className="w-4 h-4 text-white group-hover/tool:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-urbanist font-extrabold text-white leading-tight">
              Your Complete <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A366FF]">
                Betting Solution
              </span>
            </h2>
            
            <p className="text-white/80 text-lg leading-relaxed">
              When considering statistical advantage and odd differentials, navigating the sports betting 
              industry has never been easier. These strategies maximize opportunities and ensure consistent 
              profits, granting you an advantage over the sportsbooks.
            </p>

            <div className="p-4 bg-[#8000FF]/10 border border-[#8000FF]/20 rounded-xl">
              <p className="text-white/80 text-sm leading-relaxed">
                With region-specific sportsbooks, the experience is tailored to you!
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-urbanist font-bold text-white">
                Sports Data, Analysis & Information
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Trophy className="w-5 h-5" />, label: 'Matchups & Live Scores', desc: 'Live scores & updates' },
                  { icon: <Users className="w-5 h-5" />, label: 'Player & Team Data', desc: 'Team statistics' },
                  { icon: <TrendingUp className="w-5 h-5" />, label: 'Line Movement', desc: 'Cross-book tracking' },
                  { icon: <Target className="w-5 h-5" />, label: 'Pro Betting Insights', desc: 'Expert analysis' }
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl
                    hover:bg-[#8000FF]/5 hover:border-[#8000FF]/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center mb-3 text-[#8000FF]">
                      {feature.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="font-urbanist font-bold text-white">{feature.label}</div>
                      <div className="text-white/40 text-sm">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full h-[52px] bg-[#8000FF] text-white font-urbanist text-lg font-bold
              rounded-xl hover:bg-[#6700CC] transition-all duration-300 
              hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] flex items-center justify-center gap-2
              hover:scale-[1.02] hover:-translate-y-0.5">
              <span>Join For Free</span>
              <MountainSnow className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}