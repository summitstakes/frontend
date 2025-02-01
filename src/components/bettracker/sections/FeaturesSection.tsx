import React, { useState } from 'react';
import { 
  LineChart, TrendingUp, BarChart3, Calendar, ChevronRight, ArrowUpRight, 
  Clock, ClipboardList, MousePointerClick, Sparkles, Trophy, Target, 
  ArrowRight, Zap, Bell, Wallet, PieChart, History, Maximize2, X, Star,
  Users, Layers, Gauge, ArrowUpDown, Filter, Pencil, Trash2, Plus
} from 'lucide-react';

export function FeaturesSection() {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<'log' | 'dashboard'>('log');

  return (
    <div className="py-12 bg-[#06060C] relative overflow-visible">
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
          <div 
            className="absolute inset-0 bg-[#06060C]/90 backdrop-blur-md"
            onClick={() => setShowPreview(false)}
          />
          <div className="relative w-full max-w-[1200px] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 
                backdrop-blur-md border border-white/20 flex items-center justify-center
                transition-all duration-300 z-10 group"
            >
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
            
            <img 
              src={selectedImage === 'log' 
                ? "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                : "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
              }
              alt={selectedImage === 'log' ? "Bet Log Interface" : "Dashboard Interface"}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-[40%_1fr] gap-8">
          {/* Left Column - Image Previews */}
          <div className="flex items-center">
            <div className="space-y-4 w-full relative">
              {/* Dashboard Preview */}
              <div className="relative z-10">
                {/* Decorative Circle */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
                    flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#8000FF] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8000FF]/20
                  hover:border-[#8000FF]/40 transition-all duration-500 group cursor-pointer"
                  onClick={() => {
                    setSelectedImage('dashboard');
                    setShowPreview(true);
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                    alt="Dashboard Interface"
                    className="w-full h-full object-cover transition-transform duration-700
                      group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06060C]/80 to-[#06060C]/50" />
                  
                  {/* Preview Button */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    h-[42px] px-6 bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    hover:bg-[#6700CC] flex items-center gap-2">
                    <Maximize2 className="w-5 h-5" />
                    <span>Preview Dashboard</span>
                  </button>

                  {/* Feature Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 rounded-lg bg-[#8000FF]/20 backdrop-blur-sm 
                      border border-[#8000FF]/20 text-white text-sm font-medium">
                      Dashboard View
                    </div>
                  </div>
                </div>
              </div>

              {/* Bet Log Preview */}
              <div className="relative z-20">
                {/* Decorative Circle - Now with higher z-index */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30">
                  <div className="w-8 h-8 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
                    flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#8000FF] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8000FF]/20
                  hover:border-[#8000FF]/40 transition-all duration-500 group cursor-pointer"
                  onClick={() => {
                    setSelectedImage('log');
                    setShowPreview(true);
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                    alt="Bet Log Interface"
                    className="w-full h-full object-cover transition-transform duration-700
                      group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06060C]/80 to-[#06060C]/50" />
                  
                  {/* Preview Button */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    h-[42px] px-6 bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    hover:bg-[#6700CC] flex items-center gap-2 z-10">
                    <Maximize2 className="w-5 h-5" />
                    <span>Preview Bet Log</span>
                  </button>

                  {/* Feature Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 rounded-lg bg-[#8000FF]/20 backdrop-blur-sm 
                      border border-[#8000FF]/20 text-white text-sm font-medium">
                      Bet Log View
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Split Content */}
          <div className="space-y-4">
            {/* Dashboard Section */}
            <div className="p-8 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
              border border-[#8000FF]/20 rounded-2xl relative group overflow-visible">
              {/* Decorative Dot */}
              <div className="absolute -left-4 top-[65px] z-20">
                <div className="w-8 h-8 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
                  flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#8000FF] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/20 
                  to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/20 
                  to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
              </div>

              {/* Content */}
              <div className="relative">
                {/* New Title Style */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-urbanist font-extrabold text-white mb-3">
                    Professional
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                      animate-gradient relative">
                      Dashboard Analytics
                      <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                        from-transparent via-[#8000FF] to-transparent opacity-50" />
                    </span>
                  </h3>
                  <p className="text-white/60 text-sm max-w-md mx-auto">
                    Visualize your betting performance with advanced analytics and real-time insights
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: <PieChart />, title: 'Visual Analytics', desc: 'Beautiful data visualization' },
                    { icon: <TrendingUp />, title: 'Performance Tracking', desc: 'Track your success rate' },
                    { icon: <Filter />, title: 'Smart Filters', desc: 'Filter by any metric' },
                    { icon: <Sparkles />, title: 'AI Insights', desc: 'Get betting recommendations' }
                  ].map((feature, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10
                      hover:border-[#8000FF]/40 hover:bg-[#8000FF]/5 transition-all duration-300
                      group/feature">
                      <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center mb-3
                        group-hover/feature:scale-110 transition-transform">
                        <div className="text-[#8000FF]">{feature.icon}</div>
                      </div>
                      <div className="font-urbanist font-bold text-white text-sm mb-1">{feature.title}</div>
                      <p className="text-white/60 text-xs">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                  hover:bg-[#6700CC] transition-all duration-300 flex items-center justify-center gap-2
                  group/btn relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6700CC] opacity-0 
                    group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10">Try Dashboard</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bet Log Section */}
            <div className="p-8 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
              border border-[#8000FF]/20 rounded-2xl relative group overflow-visible">

              {/* Left Decorative Dot */}
              <div className="absolute -left-4 bottom-[65px] z-20">
                <div className="w-8 h-8 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
                  flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#8000FF] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/20 
                  to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/20 
                  to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
              </div>

              {/* Content */}
              <div className="relative">
                {/* New Title Style */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-urbanist font-extrabold text-white mb-3">
                    Comprehensive
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                      animate-gradient relative">
                      Bet Tracking
                      <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                        from-transparent via-[#8000FF] to-transparent opacity-50" />
                    </span>
                  </h3>
                  <p className="text-white/60 text-sm max-w-md mx-auto">
                    Track every bet with precision and manage your portfolio like a professional
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: <Plus />, title: 'Quick Entry', desc: 'Add bets in seconds' },
                    { icon: <Clock />, title: 'Live Tracking', desc: 'Real-time updates' },
                    { icon: <Pencil />, title: 'Easy Edit', desc: 'Update bet details' },
                    { icon: <History />, title: 'Full History', desc: 'Complete records' }
                  ].map((feature, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10
                      hover:border-[#8000FF]/40 hover:bg-[#8000FF]/5 transition-all duration-300
                      group/feature">
                      <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center mb-3
                        group-hover/feature:scale-110 transition-transform">
                        <div className="text-[#8000FF]">{feature.icon}</div>
                      </div>
                      <div className="font-urbanist font-bold text-white text-sm mb-1">{feature.title}</div>
                      <p className="text-white/60 text-xs">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                  hover:bg-[#6700CC] transition-all duration-300 flex items-center justify-center gap-2
                  group/btn relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6700CC] opacity-0 
                    group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10">Try Bet Log</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}