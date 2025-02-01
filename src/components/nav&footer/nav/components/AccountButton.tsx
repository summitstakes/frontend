import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Star, LogOut, ChevronDown } from 'lucide-react';
import { AccountButtonProps } from '../types';
import { buttonClasses } from '../constants';

export function AccountButton({
  session,
  profile,
  showDropdown,
  setShowDropdown,
  onSignOut,
  isLoading
}: AccountButtonProps) {
  const navigate = useNavigate();

  // Show skeleton loader while loading
  if (isLoading) {
    return (
      <div className={`${buttonClasses.common} bg-white/5 animate-pulse`} />
    );
  }

  if (!session) {
    return (
      <button 
        onClick={() => navigate('/login')}
        className={`${buttonClasses.common} ${buttonClasses.secondary}`}
      >
        <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 
          transition-opacity rounded-xl" />
        <User className="w-5 h-5" />
        <span className="font-urbanist font-bold text-[15px]">Login</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${buttonClasses.common} ${buttonClasses.secondary}`}
        aria-expanded={showDropdown}
        aria-controls="account-dropdown"
      >
        <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 
          transition-opacity rounded-xl" />
        <User className="w-5 h-5" />
        <span className="font-urbanist font-bold text-[15px]">Account</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300
          ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {showDropdown && (
        <div 
          id="account-dropdown"
          className="absolute top-[calc(100%+4px)] right-0 w-[200px] bg-gradient-to-br 
            from-[#1A1527]/95 to-[#120D1D]/95 backdrop-blur-md border border-[#8000FF]/20 
            rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
          role="menu"
        >
          {/* Plan Badge */}
          <div className="px-4 py-2 border-b border-[#8000FF]/20">
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg 
              ${profile?.plan === 'pro_plan' 
                ? 'bg-[#8000FF]/20 text-[#8000FF]' 
                : 'bg-white/10 text-white/60'}`}>
              <Star className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">
                {profile?.plan === 'pro_plan' ? 'Pro Plan' : 'Free Plan'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              navigate('/account');
              setShowDropdown(false);
            }}
            className="w-full h-[52px] px-5 text-left hover:bg-[#8000FF]/10 transition-all
              flex items-center gap-4 group/item relative overflow-hidden"
            role="menuitem"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/5 
              to-[#8000FF]/0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            <div className="w-9 h-9 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
              group-hover/item:bg-[#8000FF]/20 transition-all duration-300 relative">
              <User className="w-5 h-5 text-[#8000FF]" />
            </div>
            <span className="text-white/60 font-urbanist text-[15px] font-bold
              group-hover/item:text-white transition-colors">
              My Account
            </span>
          </button>

          <button
            onClick={() => {
              onSignOut();
              setShowDropdown(false);
            }}
            className="w-full h-[52px] px-5 text-left hover:bg-[#8000FF]/10 transition-all
              flex items-center gap-4 group/item relative overflow-hidden"
            role="menuitem"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/5 
              to-[#8000FF]/0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            <div className="w-9 h-9 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
              group-hover/item:bg-[#8000FF]/20 transition-all duration-300 relative">
              <LogOut className="w-5 h-5 text-[#8000FF]" />
            </div>
            <span className="text-white/60 font-urbanist text-[15px] font-bold
              group-hover/item:text-white transition-colors">
              Log Out
            </span>
          </button>
        </div>
      )}
    </div>
  );
}