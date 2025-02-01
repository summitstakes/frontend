import React from 'react';
import { Mail, AlertCircle, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { ForgotPasswordFormProps } from './types';

export function ForgotPasswordForm({
  email,
  setEmail,
  error,
  isLoading,
  setView,
  handleForgotPassword
}: ForgotPasswordFormProps) {
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-urbanist font-bold text-white mb-2">Reset Password</h1>
        <p className="text-white/60">Enter your registered email address to receive instructions on how to reset your password</p>
      </div>

      {error && (
        <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-500/90">{error}</p>
        </div>
      )}

      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/60 ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 
              group-focus-within:text-[#8000FF] transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[48px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
            hover:bg-[#6700CC] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
            hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group mt-4"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
                translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
                Send Reset Link
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setView('login')}
          className="w-full h-[48px] bg-white/5 text-white/60 font-urbanist font-bold rounded-xl
            hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>
      </form>
    </div>
  );
}