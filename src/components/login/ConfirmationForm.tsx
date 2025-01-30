import React from 'react';
import { KeyRound, AlertCircle, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { ConfirmationFormProps } from './types';

export function ConfirmationForm({
  email,
  confirmationCode,
  setConfirmationCode,
  error,
  isLoading,
  setView,
  handleConfirmationSubmit
}: ConfirmationFormProps) {
  const handleConfirmationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setConfirmationCode(value);
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
          <KeyRound className="w-8 h-8 text-[#8000FF]" />
        </div>
        <h1 className="text-2xl font-urbanist font-bold text-white mb-2">Confirm Your Email</h1>
        <p className="text-white/60">Enter the 5-digit code sent to {email}</p>
      </div>

      {error && (
        <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-500/90">{error}</p>
        </div>
      )}

      <form onSubmit={handleConfirmationSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/60 ml-1">Confirmation Code</label>
          <div className="relative group">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 
              group-focus-within:text-[#8000FF] transition-colors" />
            <input
              type="text"
              value={confirmationCode}
              onChange={handleConfirmationCodeChange}
              className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                focus:ring-1 focus:ring-[#8000FF]/40 transition-all text-center tracking-[0.5em] font-mono"
              placeholder="•••••"
              required
              maxLength={5}
            />
          </div>
          <p className="text-xs text-white/40 mt-1 ml-1">
            Didn't receive the code? <button type="button" className="text-[#8000FF] hover:text-[#6700CC] transition-colors">Resend</button>
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || confirmationCode.length !== 5}
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
                Verify Code
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setView('login');
            setConfirmationCode('');
          }}
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