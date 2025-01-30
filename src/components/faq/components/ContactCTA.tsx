import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, ArrowRight } from 'lucide-react';

export function ContactCTA() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#8000FF]/10 to-[#8000FF]/5 
      border border-[#8000FF]/20 text-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/20 
          to-transparent opacity-30 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/20 
          to-transparent opacity-30 blur-2xl" />
      </div>

      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-8 h-8 text-[#8000FF]" />
        </div>
        
        <h2 className="text-2xl font-urbanist font-bold text-white mb-4">
          Still have questions?
        </h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto">
          Can't find the answer you're looking for? Our support team is here to help.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate('/contact')}
            className="h-[48px] bg-[#8000FF] text-white font-urbanist font-bold px-6 rounded-xl
              hover:bg-[#6700CC] transition-all duration-300 flex items-center gap-2
              hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] group"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Support</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="h-[48px] bg-white/5 text-white font-urbanist font-bold px-6 rounded-xl
            hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Live Chat</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}