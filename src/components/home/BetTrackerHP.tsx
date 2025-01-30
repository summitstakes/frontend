import React, { useState } from 'react';
import { LineChart, TrendingUp, BarChart3, Calendar, ChevronRight, ArrowUpRight, 
  Clock, ClipboardList, MousePointerClick, Sparkles, Trophy, Target, 
  ArrowRight, Zap, Bell, Wallet, PieChart, History, Maximize2, X } from 'lucide-react';

export function BetTrackerHP() {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <div className="py-24 bg-[#06060C] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-[#8000FF]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s' }} />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
          <div 
            className="absolute inset-0 bg-[#06060C]/90 backdrop-blur-md"
            onClick={() => setShowImageModal(false)}
          />
          <div className="relative w-full max-w-[1200px] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Close button */}
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 
                backdrop-blur-md border border-white/20 flex items-center justify-center
                transition-all duration-300 z-10 group"
            >
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
            
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
              alt="Bet Tracker Interface"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Header Section */}
        <div className="text-center mb-16 relative">          
          <h2 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white leading-tight mb-4
            relative inline-block">
            <span className="relative z-10">Bet Tracker: </span>
            <span className="text-4xl sm:text-6xl font-urbanist font-extrabold
              bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] via-[#A855F7] to-[#8000FF]
              animate-gradient">
              Stay Updated in Real Time!
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
              from-transparent via-[#8000FF] to-transparent" />
          </h2>

          <p className="text-white/60 text-xl max-w-3xl mx-auto mt-6">
            When tracking bets, you can identify the trends and betting strategies that work for you. 
            Take control of your betting habits starting now!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12">
          {/* Left Column - Feature Showcase */}
          <div className="space-y-8">
            {/* First Container - Now with permanent gradient */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
              border border-[#8000FF]/20 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/10 to-transparent" />
              
              <div className="relative">
                <h3 className="text-2xl font-urbanist font-bold text-white mb-4">
                  Our Bet Tracker makes your life easy!
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Across all our sports offerings, you are able to log your bets and stay updated 
                  throughout the course of the match, getting a better idea of where you stand on a 
                  daily basis. The capability of custom entries allows for you to keep track regardless 
                  of the sport, market or sportsbook.
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <History />, title: 'Real-time Updates', desc: 'Live tracking of your bets' },
                    { icon: <PieChart />, title: 'Performance Analytics', desc: 'Visual insights into your betting' },
                    { icon: <Bell />, title: 'Smart Notifications', desc: 'Never miss important updates' },
                    { icon: <Wallet />, title: 'Bankroll Management', desc: 'Track your betting finances' }
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10
                      hover:border-[#8000FF]/40 hover:bg-[#8000FF]/5 transition-all duration-300 group/item">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                          group-hover/item:bg-[#8000FF]/20 transition-colors">
                          <div className="text-[#8000FF]">{item.icon}</div>
                        </div>
                        <div>
                          <h4 className="font-urbanist font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-white/60 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Container - Core Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: <ClipboardList className="w-6 h-6" />,
                  title: 'Custom Entries',
                  description: 'Log bets across any sport, market, or sportsbook with our flexible entry system'
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: 'Detailed Info',
                  description: 'Get comprehensive insights into your betting patterns and performance'
                },
                {
                  icon: <MousePointerClick className="w-6 h-6" />,
                  title: 'Easy to Use',
                  description: 'Intuitive interface designed for seamless, quick, and efficient bet tracking'
                }
              ].map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                    border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-500
                    hover:-translate-y-2 hover:shadow-[0_8px_16px_-6px_rgba(128,0,255,0.2)]">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7]
                        flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <div className="absolute top-0 right-0 w-8 h-8">
                        <div className="absolute inset-0 bg-[#8000FF] rounded-full animate-ping opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF] to-[#A855F7] rounded-full" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-urbanist font-bold text-white mb-2 group-hover:text-[#8000FF] 
                      transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interface Preview */}
          <div className="relative flex">
            {/* Interface Preview */}
            <div className="sticky top-24 w-full rounded-2xl overflow-hidden border border-[#8000FF]/20
              bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] backdrop-blur-md
              hover:border-[#8000FF]/40 transition-all duration-500 group flex flex-col">
              
              <div className="p-6 border-b border-[#8000FF]/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7]
                    flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-urbanist font-bold text-white">Interface Preview</h3>
                    <p className="text-white/60 text-sm">Modern, intuitive design</p>
                  </div>
                </div>
              </div>

              {/* Preview Image - With expand button */}
              <div className="relative flex-grow overflow-hidden group/image">
                <div className="absolute inset-0 group-hover/image:scale-105 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
                    alt="Bet Tracker Interface"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060C] to-transparent" />
                </div>

                {/* Expand button - Now always visible */}
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 
                    backdrop-blur-md border border-white/20 flex items-center justify-center
                    transition-all duration-300 z-10 group/btn"
                >
                  <Maximize2 className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
                </button>
                
                {/* Preview Stats */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Active Users', value: '10,000+' },
                      { label: 'Bets Tracked', value: '1M+' },
                      { label: 'Success Rate', value: '95%' }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-urbanist font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="p-6 border-t border-[#8000FF]/10">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8000FF]/10 rounded-full">
                      <Target className="w-4 h-4 text-[#8000FF]" />
                      <span className="text-white/80 text-sm font-medium">Try It Now</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-urbanist font-bold text-white mb-2">
                    Ready to Level Up Your Betting Game?
                  </h4>
                  <p className="text-white/60 text-sm mb-4 max-w-sm">
                    Join thousands of smart bettors who are already tracking their bets and improving their strategy.
                  </p>
                  <button className="group relative w-full h-[48px] bg-gradient-to-r from-[#8000FF] to-[#A855F7] 
                    rounded-xl text-white font-urbanist font-bold hover:shadow-[0_0_30px_rgba(128,0,255,0.3)] 
                    transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#8000FF] opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center justify-center gap-2">
                      <span>Access Bet Tracker</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
