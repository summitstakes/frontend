import React from 'react';
import { Calculator, ArrowRight, Sigma, Percent, RefreshCcw, Sparkles, ChevronRight, Target, Gift, ArrowUpRight } from 'lucide-react';

export function LastSection() {
  return (
    <div className="py-24 bg-[#06060C] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#8000FF]/20 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--tx': `${(Math.random() - 0.5) * 200}px`,
              '--ty': `${(Math.random() - 0.5) * 200}px`,
              animationDelay: `${i * 0.5}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Column - Calculator Showcase */}
          <div className="space-y-8">
            <div className="space-y-6">              
              <h2 className="text-4xl sm:text-5xl font-urbanist font-extrabold text-white leading-tight">
                Precision at Your
                <br />
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                    animate-gradient">
                    Fingertips
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                    from-transparent via-[#8000FF] to-transparent" />
                </span>
              </h2>
              
              <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                Featuring a user-friendly interface, our calculators offer precise solutions based on your 
                specific need. Count on our calculators to optimize any outcome.
              </p>
            </div>

            {/* Calculator Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { 
                  icon: <RefreshCcw className="w-5 h-5" />, 
                  name: 'Arbitrage Calculator',
                  desc: 'Calculate guaranteed profits across different bookmakers',
                  popular: true
                },
                { 
                  icon: <Gift className="w-5 h-5" />, 
                  name: 'Free Bet Calculator',
                  desc: 'Maximize returns from your free bet bonuses'
                },
                { 
                  icon: <Sigma className="w-5 h-5" />, 
                  name: 'Odd Converter',
                  desc: 'Convert between decimal, fractional & American odds'
                },
                { 
                  icon: <Percent className="w-5 h-5" />, 
                  name: 'Vig Calculator',
                  desc: 'Calculate the true implied probability'
                }
              ].map((calc, index) => (
                <div
                  key={index}
                  className="group relative p-4 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                    border border-[#8000FF]/20 rounded-xl hover:border-[#8000FF]/40 
                    transition-all duration-300 cursor-pointer hover:-translate-y-1
                    hover:shadow-[0_8px_16px_-6px_rgba(128,0,255,0.2)]"
                >
                  {/* Popular badge */}
                  {calc.popular && (
                    <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                      rounded-full text-xs font-bold text-white shadow-lg animate-pulse">
                      Popular
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                      group-hover:bg-[#8000FF]/20 transition-colors text-[#8000FF] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/0 to-[#8000FF]/0
                        group-hover:from-[#8000FF]/20 group-hover:to-transparent transition-all duration-500" />
                      <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {calc.icon}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#8000FF] 
                      group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-urbanist font-bold text-white mb-2 group-hover:text-[#8000FF] 
                    transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 
                    transition-colors">
                    {calc.desc}
                  </p>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Enhanced CTA */}
          <div className="relative">
            {/* Enhanced glow effect */}
            <div className="absolute -inset-4">
              <div className="w-full h-full bg-gradient-to-r from-[#8000FF]/30 to-[#A855F7]/30 opacity-50 
                blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
            </div>

            <div className="relative p-8 bg-gradient-to-br from-[#8000FF]/10 to-[#A855F7]/5 
              backdrop-blur-md border border-[#8000FF]/30 rounded-2xl overflow-hidden
              hover:border-[#8000FF]/50 transition-all duration-500 group
              shadow-[0_0_50px_rgba(128,0,255,0.15)]">
              
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/20 
                to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/20 
                to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />

              <div className="relative">
                {/* Enhanced header with distinct icons */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                    p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                    <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                      <Target className="w-7 h-7 text-[#8000FF]" />
                    </div>
                  </div>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#8000FF]/40 to-transparent" />
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                    p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                    <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-[#8000FF]" />
                    </div>
                  </div>
                </div>

                {/* Enhanced content with better contrast */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-urbanist font-bold text-white mb-4 
                    bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/90">
                    Join For Free Today
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Access our premium tools, track games across our vast sports offering, and stay updated 
                    with the latest insights. Everything you need, all in one place.
                  </p>
                </div>

                {/* Enhanced Action Button */}
                <button className="w-full h-[52px] bg-gradient-to-r from-[#8000FF] to-[#A855F7] 
                  text-white font-urbanist font-bold rounded-xl 
                  hover:shadow-[0_0_30px_rgba(128,0,255,0.3)]
                  transition-all duration-500 relative overflow-hidden group/btn">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#8000FF] 
                    opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-2">
                    <span>Join For Free</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Enhanced Stats with better visual hierarchy */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  {[
                    { label: 'Active Users', value: '10K+' },
                    { label: 'Calculations', value: '1M+' },
                    { label: 'Success Rate', value: '99%' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-3 rounded-xl bg-white/5 
                      border border-white/10 group/stat hover:border-[#8000FF]/30 
                      hover:bg-[#8000FF]/5 transition-all duration-300">
                      <div className="text-xl font-urbanist font-bold text-white mb-1
                        group-hover/stat:text-[#8000FF] transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-white/50 text-sm group-hover/stat:text-white/70 transition-colors">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
