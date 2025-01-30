import React, { useState, useEffect } from 'react';
import { ChevronRight, Trophy, Users, Clock, Star, TrendingUp, ArrowRight, Sparkles, Target } from 'lucide-react';
import { sportsData } from '../../data/sportsData';

export function SportsCoverage() {
  const [hoveredSport, setHoveredSport] = useState<string | null>(null);
  const repeatedSportsData = [...sportsData, ...sportsData];
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; tx: number; ty: number }>>([]);

  // Generate particles on component mount
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      tx: (Math.random() - 0.5) * 200,
      ty: (Math.random() - 0.5) * 200
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="py-24 bg-[#06060C] relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full blur-[100px] animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-[#8000FF]/5 rounded-full blur-[80px] animate-pulse"
          style={{ animationDuration: '6s' }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#8000FF]/8 rounded-full blur-[60px] animate-pulse"
          style={{ animationDuration: '5s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#8000FF]/20 rounded-full animate-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              '--tx': `${particle.tx}px`,
              '--ty': `${particle.ty}px`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#8000FF]/10 to-transparent rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-[#8000FF]/10 to-transparent rounded-full blur-xl animate-float" 
          style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-[#8000FF]/5 to-transparent rounded-full blur-lg animate-float"
          style={{ animationDelay: '-1s' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Header Section */}
        <div className="mb-8">
          <div className="lg:max-w-[800px]">
            <h2 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white leading-tight
              animate-in slide-in-from-left duration-700 delay-100">
              Explore Our
            </h2>
            <div className="relative">
              <h2 className="text-4xl sm:text-7xl font-urbanist font-extrabold leading-tight
                animate-in slide-in-from-left duration-700 delay-200
                bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] via-[#A855F7] to-[#8000FF]
                bg-[length:200%_100%] animate-gradient">
                Elite Sports Coverage
              </h2>
              <div className="absolute -bottom-2 left-0 right-[60%] h-[3px] bg-gradient-to-r from-[#8000FF] to-transparent rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-stretch">
          {/* Left Column */}
          <div className="relative h-full">
            <div className="absolute top-0 right-[-32px] bottom-0 w-[32px] 
              bg-gradient-to-r from-[#06060C] to-transparent z-20 pointer-events-none" />
            
            <button className="w-[280px] h-full min-h-[340px] rounded-2xl relative group
              overflow-hidden transition-all duration-500">
              {/* Main gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF] to-[#A855F7] opacity-[0.15]
                group-hover:opacity-[0.2] transition-opacity duration-500" />
              
              {/* White accent lines */}
              <div className="absolute inset-0">
                <div className="absolute top-[10%] right-[15%] w-[150px] h-[1px] bg-white/20 rotate-[15deg]" />
                <div className="absolute top-[15%] right-[25%] w-[100px] h-[1px] bg-white/10 rotate-[15deg]" />
                <div className="absolute bottom-[20%] left-[10%] w-[120px] h-[1px] bg-white/15 -rotate-[15deg]" />
                <div className="absolute bottom-[25%] left-[20%] w-[80px] h-[1px] bg-white/10 -rotate-[15deg]" />
              </div>

              {/* Content Container */}
              <div className="relative h-full flex flex-col justify-between p-6 z-10">
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    {/* Pulsing ring */}
                    <div className="absolute inset-[-4px] rounded-xl border-2 border-white/20
                      animate-ping opacity-20" />
                    
                    {/* Icon container */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7]
                      flex items-center justify-center group-hover:scale-110 
                      transition-transform duration-500">
                      <Target className="w-8 h-8 text-white transform 
                        group-hover:rotate-180 transition-all duration-700" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-urbanist font-bold text-white mb-2
                    group-hover:text-[#A855F7] transition-colors duration-500">
                    All Sports
                  </h3>
                  <p className="text-white/60 text-sm px-2">Discover our complete coverage</p>
                </div>

                <div className="space-y-3 px-3">
                  {['Sports', 'Leagues'].map((label, index) => (
                    <div key={label} 
                      className="flex items-center justify-between p-3 rounded-lg
                        bg-white/5 backdrop-blur-sm border border-white/10
                        group-hover:border-white/20 transition-all duration-500"
                      style={{ transitionDelay: `${index * 100}ms` }}>
                      <span className="text-white/60 text-sm">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{label === 'Sports' ? '20+' : '100+'}</span>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#8000FF] to-[#A855F7]
                          flex items-center justify-center">
                          <ChevronRight className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-3">
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Button gradient background */}
                    <div className="p-3 bg-gradient-to-r from-[#8000FF] to-[#A855F7] 
                      group-hover:to-[#8000FF] transition-[background] duration-500
                      flex items-center justify-center gap-2">
                      <span className="text-white font-urbanist font-bold text-sm">
                        View All Sports
                      </span>
                      <ArrowRight className="w-4 h-4 text-white 
                        group-hover:translate-x-1 transition-transform duration-500" />
                    </div>
                  </div>
                </div>

                {/* Corner sparkles */}
                <Sparkles className="absolute top-4 left-4 w-4 h-4 text-white/40
                  animate-pulse" style={{ animationDuration: '3s' }} />
                <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-white/40
                  animate-pulse" style={{ animationDuration: '4s' }} />
              </div>
            </button>
          </div>

          {/* Right Column - Sports Cards */}
          <div className="relative lg:-mr-6 flex flex-col space-y-4">
            {/* Gradient Overlays */}
            <div className="absolute left-[-32px] top-0 bottom-0 w-[64px] 
              bg-gradient-to-r from-[#06060C] via-[#06060C]/95 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 
              bg-gradient-to-l from-[#06060C] via-[#06060C]/90 to-transparent z-10 pointer-events-none" />

            {/* Scrollable Container */}
            <div className="overflow-visible">
              <div className="overflow-x-auto scrollbar-hide py-4 -my-4">
                <div className="flex gap-6 animate-scroll-x-fast pb-4" style={{ width: 'max-content' }}>
                  {repeatedSportsData.map((sport, index) => (
                    <div
                      key={`${sport.name}-${index}`}
                      className="w-[340px] p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                        border border-[#8000FF]/20 rounded-2xl hover:border-[#8000FF]/40 transition-all 
                        duration-500 group cursor-pointer hover:-translate-y-2
                        hover:shadow-[0_8px_16px_-6px_rgba(128,0,255,0.2)] relative z-20"
                      onMouseEnter={() => setHoveredSport(sport.name)}
                      onMouseLeave={() => setHoveredSport(null)}
                    >
                      {/* Sport Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-[#8000FF]/10 flex items-center justify-center text-3xl
                            group-hover:scale-110 group-hover:bg-[#8000FF]/20 transition-all duration-500">
                            {sport.icon}
                          </div>
                          <div>
                            <h3 className="font-urbanist font-bold text-xl text-white group-hover:text-[#8000FF] 
                              transition-colors mb-2">
                              {sport.name}
                            </h3>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10">
                                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-500 text-xs font-medium">
                                  {sport.activeGames} Live
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5">
                                <Users className="w-3.5 h-3.5 text-white/60" />
                                <span className="text-white/60 text-xs font-medium">
                                  {sport.totalBets} Bets
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                          group-hover:bg-[#8000FF] transition-all duration-500">
                          <ArrowRight className="w-4 h-4 text-[#8000FF] group-hover:text-white 
                            group-hover:translate-x-0.5 transition-all duration-500" />
                        </div>
                      </div>

                      {/* Trending Match */}
                      <div className="p-4 bg-gradient-to-br from-white/5 to-transparent rounded-xl mb-6
                        border border-white/5 group-hover:border-[#8000FF]/20 transition-all duration-500">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-[#8000FF]" />
                          <span className="text-white/60 text-sm">Trending Match</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-urbanist font-bold">{sport.trendingMatch}</span>
                          <div className="px-2.5 py-1 rounded-lg bg-[#8000FF]/10 text-[#8000FF] font-medium">
                            {sport.trendingOdds}
                          </div>
                        </div>
                      </div>

                      {/* Top Leagues */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-[#8000FF]" />
                          <span className="text-white/60 text-sm">Featured Leagues</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sport.topLeagues.map((league) => (
                            <div
                              key={league}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg 
                                border border-white/10 hover:bg-[#8000FF]/10 hover:border-[#8000FF]/20 
                                transition-all duration-300 group/league"
                            >
                              <span className="text-white/80 text-sm font-medium whitespace-nowrap">{league}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Region-specific message */}
            <div className="lg:max-w-[800px] p-4 bg-[#8000FF]/10 border border-[#8000FF]/20 rounded-xl 
              animate-in fade-in slide-in-from-bottom-4">
              <p className="text-white/80 text-sm leading-relaxed">
                Stay ahead with in-depth insights and exclusive updates on top sports leagues worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}