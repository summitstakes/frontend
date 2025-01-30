import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, Shield, Star, Trophy } from 'lucide-react';
import { LoginFormProps } from './types';

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  isLoading,
  setView,
  handleSubmit
}: LoginFormProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-urbanist font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-white/60">Sign in to access your account</p>
      </div>

      {error && (
        <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-500/90">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/60">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/60">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-12
                text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 
                hover:text-white/60 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-4 h-4 border-2 border-white/20 rounded 
                peer-checked:border-[#8000FF] peer-checked:bg-[#8000FF] transition-all" />
              <div className="absolute inset-0 flex items-center justify-center 
                text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
              Remember me
            </span>
          </label>
          <button 
            type="button" 
            onClick={() => setView('forgot-password')}
            className="text-sm text-[#8000FF] hover:text-[#6700CC] transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[48px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
            hover:bg-[#6700CC] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
            hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group"
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
                Sign In
              </span>
            </>
          )}
        </button>

        <div className="text-center">
          <span className="text-white/60">Don't have an account? </span>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-[#8000FF] hover:text-[#6700CC] font-medium transition-colors"
          >
            Sign up
          </button>
        </div>

        {/* Enhanced Security Info */}
        <div className="mt-6 p-4 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
          border border-[#8000FF]/20 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#8000FF]" />
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white text-sm">Secure Login</h3>
              <p className="text-white/60 text-xs">Your data is protected</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <Star className="w-4 h-4 text-[#8000FF]" />
              <span className="text-white/60 text-xs">256-bit encryption</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <Trophy className="w-4 h-4 text-[#8000FF]" />
              <span className="text-white/60 text-xs">24/7 monitoring</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}