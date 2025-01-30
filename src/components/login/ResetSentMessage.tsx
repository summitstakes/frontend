import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { ResetSentMessageProps } from './types';

export function ResetSentMessage({ email, setView }: ResetSentMessageProps) {
  return (
    <div className="w-full text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-[#8000FF] animate-bounce" />
      </div>
      <h3 className="text-xl font-urbanist font-bold text-white mb-2">Check Your Email</h3>
      <p className="text-white/60 mb-6">
        We've sent password reset instructions to your email address. If you don't see the email in your inbox, please check your spam or junk folder.
      </p>
      <button
        onClick={() => setView('login')}
        className="w-full h-[48px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
          hover:bg-[#6700CC] transition-all duration-300 hover:shadow-[0_0_20px_rgba(128,0,255,0.3)]
          group relative overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
          translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        </div>
        <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
          Back to Login
        </span>
      </button>
    </div>
  );
}