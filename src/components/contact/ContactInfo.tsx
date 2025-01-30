import React from 'react';
import { Mail, MessageSquare, Trophy, ArrowRight, Star } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export function ContactInfo() {
  return (
    <div className="h-[550px] flex flex-col">
      {/* Main Contact Card */}
      <div className="flex-1 p-8 bg-gradient-to-br from-[#1A1527] to-[#120D1D] backdrop-blur-md 
        border border-[#8000FF]/20 rounded-2xl relative group overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/20 
            to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/20 
            to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
          
          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#8000FF]/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="relative h-full flex flex-col">
          {/* Enhanced header with glowing effect */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-[#8000FF]" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg bg-[#8000FF] 
                flex items-center justify-center animate-bounce">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-urbanist font-bold text-white">Contact Information</h3>
              <p className="text-white/60">Get in touch with our team</p>
            </div>
          </div>

          {/* Enhanced Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Support', value: '24/7' },
              { label: 'Response Time', value: '2-4h' },
              { label: 'Resolution Rate', value: '99%' }
            ].map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent 
                border border-white/10 group/stat hover:border-[#8000FF]/20 transition-all duration-300">
                <div className="text-lg font-urbanist font-bold text-white group-hover/stat:text-[#8000FF] 
                  transition-colors">
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Contact Methods */}
          <div className="space-y-4 flex-1">
            {/* Email - Now with enhanced hover effects */}
            <a
              href="mailto:support@summitstakes.com"
              className="block p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent 
                border border-white/10 hover:border-[#8000FF]/20 transition-all duration-300 
                group/email cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/5 
                to-[#8000FF]/0 opacity-0 group-hover/email:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                    group-hover/email:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-[#8000FF]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-sm mb-1">Email Us At</div>
                    <div className="text-white font-urbanist font-bold group-hover/email:text-[#8000FF] 
                      transition-colors">
                      support@summitstakes.com
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover/email:text-[#8000FF] 
                  group-hover/email:translate-x-1 transition-all" />
              </div>
            </a>

            {/* Live Chat - Now with pulsing online indicator */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent 
              border border-white/10 hover:border-[#8000FF]/20 transition-all duration-300 
              group/chat relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/5 
                to-[#8000FF]/0 opacity-0 group-hover/chat:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                    group-hover/chat:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-5 h-5 text-[#8000FF]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-sm mb-1">Live Chat</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-emerald-500 text-sm font-medium">Online Now</span>
                    </div>
                  </div>
                </div>
                <button className="h-[38px] px-4 bg-[#8000FF]/10 text-[#8000FF] rounded-lg 
                  hover:bg-[#8000FF]/20 transition-all duration-300 flex items-center gap-2 text-sm
                  font-urbanist font-bold group-hover/chat:scale-105">
                  Start Chat
                  <ArrowRight className="w-4 h-4 group-hover/chat:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Footer - Social Links & Pro Support */}
          <div className="mt-6 pt-6 border-t border-[#8000FF]/20">
            <div className="flex items-center justify-between">
              {/* Social Links with improved hover effects */}
              <div className="flex items-center gap-3">
                {[
                  { icon: faXTwitter, label: 'Twitter' },
                  { icon: faDiscord, label: 'Discord' }
                ].map((social, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                      border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
                      flex items-center justify-center text-white hover:text-[#8000FF] relative group"
                  >
                    <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 
                      transition-opacity rounded-lg" />
                    <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                  </button>
                ))}
              </div>

              {/* Enhanced Pro Support Badge */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-[#8000FF]/10 border border-[#8000FF]/20
                  flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#8000FF]" />
                  <span className="text-[#8000FF] text-sm font-medium">Priority Support for Pro Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}