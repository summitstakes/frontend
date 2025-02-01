import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Play, Maximize2, X, Volume2, Volume1, Sparkles, Trophy, ArrowUpCircle
} from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate video progress
  useEffect(() => {
    if (isFullscreen) {
      const interval = setInterval(() => {
        setProgress(prev => (prev + 1) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isFullscreen]);

  return (
    <div className="relative pt-[160px] pb-12">
      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06060C]/90 backdrop-blur-sm">
          <div className="relative w-full max-w-[1200px] aspect-video rounded-2xl overflow-hidden">
            {/* Enhanced Controls Bar */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-end z-20">
              {/* Right Controls */}
              <div className="flex items-center gap-4">
                {/* Volume Control */}
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md 
                    border border-white/20 flex items-center justify-center transition-all"
                >
                  {isMuted ? (
                    <Volume1 className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>

                {/* Close Button */}
                <button 
                  onClick={() => setIsFullscreen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md 
                    border border-white/20 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
              <div 
                className="h-full bg-[#8000FF] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Video Placeholder */}
            <div className="w-full h-full bg-[#120D1D] relative">
              {/* Enhanced Animated Background Pattern */}
              <div className="absolute inset-0">
                {/* Diagonal Lines */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`line-${i}`}
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

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: i % 2 === 0 ? '#8000FF' : '#FFFFFF',
                      opacity: 0.2,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `${5 + Math.random() * 5}s linear ${i * 0.2}s infinite particle`
                    }}
                  />
                ))}

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8000FF]/20 rounded-full blur-[100px]" 
                  style={{ animation: '4s infinite pulse' }} />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#8000FF]/20 rounded-full blur-[100px]" 
                  style={{ animation: '6s infinite pulse', animationDelay: '2s' }} />
              </div>

              {/* Enhanced Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group">
                  {/* Animated Rings */}
                  <div className="absolute -inset-8 rounded-full border-2 border-[#8000FF]/20 
                    animate-ping opacity-20" />
                  <div className="absolute -inset-12 rounded-full border-2 border-[#8000FF]/10 
                    animate-ping opacity-10" style={{ animation: 'ping 2s infinite', animationDelay: '0.5s' }} />
                  
                  {/* Main Play Button */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8000FF]/20 to-[#8000FF]/5 
                    backdrop-blur-sm border border-[#8000FF]/20 flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-500 relative">
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/20 to-transparent 
                      rounded-full" style={{ animation: '2s infinite pulse' }} />
                    {/* Play Icon */}
                    <Play className="w-12 h-12 text-[#8000FF] ml-2 relative z-10 
                      group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-center">
        {/* Left Column - Main Content */}
        <div>
          <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white mb-6 leading-tight">
            Track Your Bets Like
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
              animate-gradient relative">
              A Professional
              <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                from-transparent via-[#8000FF] to-transparent opacity-50" />
            </span>
          </h1>
          
          <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
            Take control of your betting journey with our comprehensive tracking system. Monitor performance, 
            analyze trends, and make data-driven decisions to improve your success rate.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/signup')}
            className="h-[52px] bg-[#8000FF] text-white font-urbanist font-bold px-8 rounded-xl
              hover:bg-[#6700CC] transition-all duration-300 flex items-center gap-2
              hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] group"
          >
            <span>Start Tracking Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Column - Enhanced Video Preview */}
        <div className="relative space-y-6">
          {/* Enhanced glow effect */}
          <div className="absolute -inset-4">
            <div className="w-full h-full bg-gradient-to-r from-[#8000FF]/30 to-[#A855F7]/30 opacity-50 
              blur-2xl" style={{ animation: '3s infinite pulse' }} />
          </div>

          {/* Enhanced Banner - Now positioned outside the container */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] blur-lg opacity-50" />
              <div className="relative flex flex-col">
                <div className="px-6 py-1.5 bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full
                  flex items-center gap-2 shadow-lg">
                  <Trophy className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-bold tracking-wide">INTERACTIVE DEMO</span>
                </div>
                {/* Sub-badge */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 px-3 py-0.5 bg-white/10 
                  backdrop-blur-sm rounded-b-lg border-x border-b border-white/20
                  flex items-center justify-center min-w-[80px]">
                  <span className="text-white/90 text-[10px] font-bold tracking-wider">PREVIEW</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#8000FF]/20
            hover:border-[#8000FF]/40 transition-all duration-500 group">
            {/* Video Container */}
            <div className="aspect-video bg-[#120D1D] relative group/video">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-[1px] rotate-[35deg] transform-gpu"
                    style={{
                      width: '400%',
                      left: '-150%',
                      top: `${i * 18}px`,
                      background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(128,0,255,0.03)'}, transparent)`,
                      animation: `${8}s linear ${i * 0.6}s infinite slideUp`
                    }}
                  />
                ))}
              </div>

              {/* Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group">
                  {/* Outer ring */}
                  <div className="absolute -inset-4 bg-[#8000FF]/20 rounded-full blur-xl opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Play button */}
                  <div className="w-20 h-20 rounded-full bg-[#8000FF]/20 flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-500 relative cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/20 to-transparent 
                      rounded-full" style={{ animation: '2s infinite pulse' }} />
                    <Play className="w-10 h-10 text-[#8000FF] ml-1.5 relative z-10" />
                  </div>
                </div>
              </div>

              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060C] via-transparent to-[#06060C]/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06060C]/50 via-transparent to-[#06060C]/50" />
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 
                  backdrop-blur-md border border-white/20 flex items-center justify-center
                  transition-all duration-300 group/btn"
              >
                <Maximize2 className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Description Text with Arrows */}
          <div className="flex items-center justify-center gap-4">
            <ArrowUpCircle className="w-6 h-6 text-[#8000FF] animate-pulse" />
            <p className="text-center text-white/80 text-lg font-urbanist">
              Watch above to see how easy it is to track your bets and maximize your profits with our 
              <span className="text-[#8000FF] font-bold"> professional-grade tools</span>
            </p>
            <ArrowUpCircle className="w-6 h-6 text-[#8000FF] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}