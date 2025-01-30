import React from 'react';
import { Instagram, Send, ArrowRight, Users, Globe2, Sparkles, Gift, Zap, ArrowUpRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export function JoinCommunity() {
  return (
    <div className="w-full h-[400px] bg-[#06060C] relative overflow-hidden py-12">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06060C] via-[#8000FF]/5 to-[#06060C]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[1px] rotate-[35deg] transform-gpu"
                style={{
                  width: '400%',
                  left: '-150%',
                  top: `${i * 18}px`,
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(128,0,255,0.03)'}, transparent)`,
                  animation: 'slideUp 8s linear infinite',
                  animationDelay: `${i * 0.6}s`
                }}
              />
            ))}
          </div>

          {[...Array(30)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[#8000FF]/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `particle ${5 + Math.random() * 5}s linear infinite`,
                '--tx': `${(Math.random() - 0.5) * 200}px`,
                '--ty': `${(Math.random() - 0.5) * 200}px`,
              } as React.CSSProperties}
            />
          ))}

          <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full 
            bg-gradient-to-br from-[#8000FF]/20 to-[#8000FF]/5 blur-[100px] animate-pulse
            hover:from-[#8000FF]/30 hover:to-[#8000FF]/10 transition-colors duration-500" 
            style={{ animationDuration: '3s' }} />
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full 
            bg-gradient-to-br from-[#8000FF]/20 to-[#8000FF]/5 blur-[100px] animate-pulse
            hover:from-[#8000FF]/30 hover:to-[#8000FF]/10 transition-colors duration-500" 
            style={{ animationDelay: '1.5s', animationDuration: '4s' }} />
        </div>
      </div>

      {/* Content Container */}
      <div className="h-full px-8 relative">
        <div className="h-full flex items-center justify-between gap-16">
          {/* Left side */}
          <div className="w-[480px] shrink-0 ml-[5%]">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2 animate-in slide-in-from-left-4">
                <div className="w-10 h-10 rounded-full bg-[#8000FF]/20 flex items-center justify-center
                  hover:bg-[#8000FF]/30 transition-colors">
                  <Users className="w-5 h-5 text-[#8000FF]" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#8000FF]/20 flex items-center justify-center
                  hover:bg-[#8000FF]/30 transition-colors">
                  <Globe2 className="w-5 h-5 text-[#8000FF]" />
                </div>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20
                hover:bg-[#8000FF]/20 hover:border-[#8000FF]/30 transition-all duration-300
                animate-in slide-in-from-left-4 delay-150">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8000FF]" />
                  <span className="text-[#8000FF] text-sm font-medium">10K+ Members</span>
                </div>
              </div>
            </div>
            <h2 className="text-5xl font-urbanist font-bold text-white mb-6 leading-tight
              animate-in slide-in-from-left-4 delay-300">
              Join the Summit Stakes{' '}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                  animate-gradient">
                  community!
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r 
                  from-[#8000FF] to-[#A855F7] rounded-full opacity-50" />
              </span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed animate-in slide-in-from-left-4 delay-500">
              Everything is better in numbers! Connect with other betting enthusiasts, stay updated with the latest trends, and never miss important updates.
            </p>
          </div>

          {/* Enhanced Right side - Social Links Grid */}
          <div className="flex-1 grid grid-cols-4 gap-6 mr-[5%] ml-12">
            {[
              { 
                icon: <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />, 
                name: 'Discord',
                desc: 'From community discussions to requesting new features, our Discord has it all!',
                delay: 100,
                gradient: 'from-[#5865F2]/20 to-[#8000FF]/5'
              },
              { 
                icon: <Instagram className="w-5 h-5" />, 
                name: 'Instagram',
                desc: 'Follow us on Instagram for a diverse range of sports content and updates!',
                delay: 200,
                gradient: 'from-[#E4405F]/20 to-[#8000FF]/5'
              },
              { 
                icon: <Send className="w-5 h-5" />, 
                name: 'Telegram',
                desc: 'Join our Telegram channel for arbitrage opportunities posted daily!',
                delay: 300,
                gradient: 'from-[#0088cc]/20 to-[#8000FF]/5',
                special: {
                  text: 'FREE ARBS',
                  subtext: 'DAILY',
                  icon: <Gift className="w-4 h-4" />
                }
              },
              { 
                icon: <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />, 
                name: 'X (Twitter)',
                desc: 'Stay updated on all software changes, betting insights & more on X!',
                delay: 400,
                gradient: 'from-[#1DA1F2]/20 to-[#8000FF]/5'
              }
            ].map((platform, index) => (
              <button
                key={index}
                className="group relative p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                  border border-[#8000FF]/20 rounded-xl hover:border-[#8000FF]/40 transition-all duration-500
                  hover:shadow-[0_8px_16px_-6px_rgba(128,0,255,0.2)] h-[240px] flex flex-col justify-between
                  hover:-translate-y-1 animate-in slide-in-from-bottom-4 overflow-hidden"
                style={{ animationDelay: `${platform.delay}ms` }}
              >
                {/* Enhanced FREE ARBS Badge for Telegram */}
                {platform.special && (
                  <div className="absolute -top-[2px] -right-[2px] z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] blur-lg opacity-50" />
                      <div className="relative flex flex-col">
                        {/* Main badge */}
                        <div className="px-4 py-1.5 bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-bl-xl rounded-tr-xl
                          flex items-center gap-2 shadow-lg">
                          {platform.special.icon}
                          <span className="text-white text-sm font-bold tracking-wide">{platform.special.text}</span>
                        </div>
                        {/* Sub-badge */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 px-3 py-0.5 bg-white/10 
                          backdrop-blur-sm rounded-b-lg border-x border-b border-white/20
                          flex items-center justify-center min-w-[60px]">
                          <span className="text-white/90 text-[10px] font-bold tracking-wider">
                            {platform.special.subtext}
                          </span>
                        </div>
                      </div>
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-4 h-4 bg-[#8000FF] clip-corner" />
                    </div>
                  </div>
                )}

                {/* Enhanced Platform Icon with Glow Effect */}
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                    group-hover:bg-[#8000FF]/20 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/0 to-[#8000FF]/0
                      group-hover:from-[#8000FF]/20 group-hover:to-transparent transition-all duration-500" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#8000FF] to-[#A855F7] opacity-0
                      group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                    <div className="text-[#8000FF] group-hover:scale-110 transition-transform duration-500
                      relative z-10">
                      {platform.icon}
                    </div>
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#8000FF]/20 to-transparent
                    group-hover:from-[#8000FF]/40 transition-all duration-500" />
                </div>

                {/* Enhanced Platform Info with Better Typography */}
                <div className="flex-1 flex flex-col justify-center relative z-10">
                  <h3 className="font-urbanist font-bold text-lg text-white group-hover:text-[#8000FF] 
                    transition-colors duration-500 mb-3">
                    {platform.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 
                    transition-colors duration-500">
                    {platform.desc}
                  </p>
                </div>

                {/* Enhanced Hover Indicator with Pulse Effect */}
                <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-[#8000FF]/10
                  flex items-center justify-center opacity-0 group-hover:opacity-100 
                  transition-all duration-500 group-hover:translate-x-1 group-hover:bg-[#8000FF]
                  group-hover:shadow-[0_0_15px_rgba(128,0,255,0.3)] z-10">
                  <div className="absolute inset-0 rounded-full bg-[#8000FF] animate-ping opacity-30" />
                  <ArrowRight className="w-5 h-5 text-[#8000FF] group-hover:text-white transition-colors" />
                </div>

                {/* Enhanced Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 pointer-events-none" />
                
                {/* Platform-specific gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl`} />
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/20 to-[#8000FF]/0
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                  animate-gradient" style={{ backgroundSize: '200% 100%' }} />

                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                  rotate-45 transform origin-bottom-left" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                  -rotate-45 transform origin-top-right" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced top and bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent 
        opacity-50 animate-gradient" style={{ backgroundSize: '200% 100%' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent 
        opacity-50 animate-gradient" style={{ backgroundSize: '200% 100%', animationDirection: 'reverse' }} />
    </div>
  );
}