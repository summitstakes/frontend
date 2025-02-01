import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe2, Mail, MessageSquare, Shield, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#06060C] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/5 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/5 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-16">
          {/* Left Column - Logo & Social */}
          <div>
            <div className="mb-8">
              <img 
                src="https://imgur.com/aJzVj8P.png" 
                alt="Summit Stakes" 
                className="h-[60px] w-auto object-contain" 
              />
            </div>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              Your trusted platform for sports betting analytics, odds comparison, and professional insights.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
                { icon: <MessageSquare className="w-5 h-5" />, label: 'Discord' },
                { icon: <Mail className="w-5 h-5" />, label: 'Email' }
              ].map((social, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                    border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
                    flex items-center justify-center text-white hover:text-[#8000FF] relative group"
                >
                  <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Navigation Links */}
          <div className="grid grid-cols-3 gap-8">
            {/* Products */}
            <div>
              <h3 className="text-white font-urbanist font-bold text-lg mb-6">Products</h3>
              <ul className="space-y-4">
                {['Bet Tracker', 'Calculators', 'Pro Insights', 'Odds Comparison'].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-urbanist font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-urbanist font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-4">
                {['Help Center', 'Contact Us', 'Community', 'Status'].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#8000FF]/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-white/40 text-sm">
              © {new Date().getFullYear()} Summit Stakes. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <Link to="/" className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link to="/" className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}