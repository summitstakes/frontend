import React from 'react';
import { ArrowLeftRight, Info } from 'lucide-react';

interface FormHeaderProps {
  showCurrencyDropdown: boolean;
  showOddsFormatDropdown: boolean;
  setShowCurrencyDropdown: (show: boolean) => void;
  setShowOddsFormatDropdown: (show: boolean) => void;
}

export function FormHeader({ 
  showCurrencyDropdown, 
  showOddsFormatDropdown, 
  setShowCurrencyDropdown, 
  setShowOddsFormatDropdown 
}: FormHeaderProps) {
  return (
    <>
      {/* Form Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-[#8000FF]" />
          </div>
          <h3 className="font-urbanist font-bold text-white text-lg">Arbitrage Odds</h3>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-[#8000FF]/10 rounded-xl mb-6 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#8000FF] shrink-0 mt-0.5" />
        <p className="text-sm text-white/80">
          Enter the odds and stakes for both outcomes. The calculator will determine if there's an arbitrage 
          opportunity and calculate the optimal stake distribution.
        </p>
      </div>
    </>
  );
}