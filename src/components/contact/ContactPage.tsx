import React from 'react';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { categories, countries, languages } from './data/formData';
import { MessageSquare, Star, Trophy, Target, ArrowRight, Globe2, BookOpen, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#06060C] -mt-[120px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />

        {/* Diagonal divider */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated diagonal lines */}
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
        </div>

        {/* Floating particles */}
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
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Enhanced Header Section */}
        <div className="pt-[160px] pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-center">
            {/* Left Column - Main Content */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white mb-6 leading-tight
                animate-in slide-in-from-left duration-700 delay-100">
                Get in Touch with
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                  animate-gradient relative">
                  Our Team
                  <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                    from-transparent via-[#8000FF] to-transparent opacity-50" />
                </span>
              </h1>
              
              <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl
                animate-in slide-in-from-left duration-700 delay-200">
                Before reaching out, check our comprehensive resources below - you might find the answer you're looking for! 
                If not, our dedicated support team is here to help 24/7.
              </p>
            </div>

            {/* Right Column - Resource Cards */}
            <div className="space-y-4 animate-in slide-in-from-right duration-700 delay-300">
              {/* Info Box */}
              <div className="p-4 bg-[#8000FF]/10 border border-[#8000FF]/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-[#8000FF] shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    Before contacting support, check our FAQ and Betting101 guides - you might find exactly what 
                    you're looking for! If not, our team is ready to help below.
                  </p>
                </div>
              </div>

              {/* FAQ and Betting101 Cards - Now in a grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* FAQ Card */}
                <button 
                  onClick={() => navigate('/faq')}
                  className="w-full p-4 bg-gradient-to-br from-[#8000FF]/10 to-[#8000FF]/5 
                    border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
                    transition-all duration-300 hover:-translate-y-1
                    hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]">
                  <div className="flex flex-col h-full">
                    <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                      group-hover:scale-110 transition-transform mb-3">
                      <HelpCircle className="w-5 h-5 text-[#8000FF]" />
                    </div>
                    <h3 className="font-urbanist font-bold text-white text-lg mb-2 group-hover:text-[#8000FF] 
                      transition-colors">
                      Browse FAQ
                    </h3>
                    <p className="text-white/60 text-sm">Find answers to common questions</p>
                    <div className="mt-auto pt-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                        group-hover:bg-[#8000FF] transition-colors ml-auto">
                        <ArrowRight className="w-4 h-4 text-[#8000FF] group-hover:text-white 
                          group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Betting101 Card */}
                <button 
                  onClick={() => navigate('/betting101')}
                  className="w-full p-4 bg-gradient-to-br from-[#8000FF]/10 to-[#8000FF]/5 
                    border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
                    transition-all duration-300 hover:-translate-y-1
                    hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]">
                  <div className="flex flex-col h-full">
                    <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                      group-hover:scale-110 transition-transform mb-3">
                      <BookOpen className="w-5 h-5 text-[#8000FF]" />
                    </div>
                    <h3 className="font-urbanist font-bold text-white text-lg mb-2 group-hover:text-[#8000FF] 
                      transition-colors">
                      Betting101
                    </h3>
                    <p className="text-white/60 text-sm">Learn betting basics and strategies</p>
                    <div className="mt-auto pt-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                        group-hover:bg-[#8000FF] transition-colors ml-auto">
                        <ArrowRight className="w-4 h-4 text-[#8000FF] group-hover:text-white 
                          group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Connector */}
        <div className="relative -mt-6 mb-12">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
              flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#8000FF] rounded-full" />
              </div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-[#8000FF]/40 to-transparent" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-start pb-24">
          {/* Left Column - Contact Form */}
          <div>
            {/* Enhanced Form Container */}
            <div className="relative animate-in slide-in-from-left duration-700 delay-400">
              {/* Overlapping Banner */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] blur-lg opacity-50" />
                  <div className="relative flex flex-col">
                    <div className="px-6 py-1.5 bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full
                      flex items-center gap-2 shadow-lg">
                      <MessageSquare className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold tracking-wide">CONTACT FORM</span>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm 
                categories={categories}
                countries={countries}
                languages={languages}
              />
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="relative animate-in slide-in-from-right duration-700 delay-500">
            {/* Enhanced glow effect */}
            <div className="absolute -inset-4">
              <div className="w-full h-full bg-gradient-to-r from-[#8000FF]/30 to-[#A855F7]/30 opacity-50 
                blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
            </div>

            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}