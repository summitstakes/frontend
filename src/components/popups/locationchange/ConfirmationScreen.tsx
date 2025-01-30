import React from 'react';
import { Globe2, X, ArrowRight, AlertCircle, Check, MapPin, Target, Shield, Info } from 'lucide-react';
import { CountryResponse, StateProvinceResponse } from './types';
import * as Flags from 'country-flag-icons/react/3x2';

interface ConfirmationScreenProps {
  selectedCountry: CountryResponse | null;
  selectedStateOrProvince: StateProvinceResponse | null;
  onClose: () => void;
  onConfirm: () => void;
  onReset: () => void;
}

// Flag component
const CountryFlag = ({ countryCode }: { countryCode: string }) => {
  const code = countryCode.toUpperCase() as keyof typeof Flags;
  if (!Flags[code]) {
    return null;
  }
  
  const FlagComponent = Flags[code];
  return (
    <FlagComponent className="w-full h-full rounded-md" />
  );
};

export function ConfirmationScreen({ 
  selectedCountry, 
  selectedStateOrProvince,
  onClose,
  onConfirm,
  onReset
}: ConfirmationScreenProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header - Made more compact */}
      <div className="p-4 border-b border-[#8000FF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                p-[1px]">
                <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-[#8000FF]" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-lg bg-emerald-500 
                flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-urbanist font-bold text-white">Confirm Location</h2>
              <p className="text-xs text-white/60">Please verify your selection</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Location Card */}
        <div className="p-4 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
          border border-[#8000FF]/20 rounded-xl mb-4 relative overflow-hidden group">
          {/* Location Header - More compact */}
          <div className="flex items-center gap-3 mb-4">
            {selectedCountry && (
              <div className="w-12 h-8 overflow-hidden rounded-lg border border-[#8000FF]/20">
                <CountryFlag countryCode={selectedCountry.code} />
              </div>
            )}
            <div>
              <h3 className="text-lg font-urbanist font-bold text-white">
                {selectedCountry?.name}
                {selectedStateOrProvince && (
                  <span className="text-white/60 text-sm ml-2">
                    - {selectedStateOrProvince.name}
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-[#8000FF]" />
                <span className="text-white/60 text-xs">Selected Location</span>
              </div>
            </div>
          </div>

          {/* Location Details - More compact grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <Globe2 className="w-3.5 h-3.5 text-[#8000FF]" />
                </div>
                <div>
                  <div className="text-white/40 text-xs">Region</div>
                  <div className="text-white text-sm">{selectedCountry?.region.name}</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-[#8000FF]" />
                </div>
                <div>
                  <div className="text-white/40 text-xs">Location</div>
                  <div className="text-white text-sm truncate">
                    {selectedStateOrProvince 
                      ? `${selectedStateOrProvince.name}, ${selectedCountry?.name}`
                      : selectedCountry?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notices - More compact */}
          <div className="space-y-2">
            {/* Warning Notice */}
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-red-500 font-urbanist font-bold text-sm mb-1">Important Notice</h4>
                <p className="text-red-500/90 text-xs leading-relaxed">
                  By confirming this selection, you will be redirected to our region-specific platform 
                  with local sportsbooks and betting options.
                </p>
              </div>
            </div>

            {/* Info Notice */}
            <div className="p-3 bg-[#8000FF]/10 border border-[#8000FF]/20 rounded-xl flex items-start gap-2">
              <Info className="w-4 h-4 text-[#8000FF] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#8000FF] font-urbanist font-bold text-sm mb-1">What to Expect</h4>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-white/60 text-xs">
                    <Check className="w-3 h-3 text-[#8000FF]" />
                    Local sportsbook availability
                  </li>
                  <li className="flex items-center gap-2 text-white/60 text-xs">
                    <Check className="w-3 h-3 text-[#8000FF]" />
                    Region-specific odds and markets
                  </li>
                  <li className="flex items-center gap-2 text-white/60 text-xs">
                    <Check className="w-3 h-3 text-[#8000FF]" />
                    Relevant betting regulations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="p-4 border-t border-[#8000FF]/10 bg-[#120D1D]/95">
        <div className="space-y-2">
          <button
            onClick={onConfirm}
            className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
              hover:bg-[#6700CC] transition-all duration-300 flex items-center justify-center gap-2
              hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
              translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            <Shield className="w-5 h-5" />
            <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
              Confirm & Continue
            </span>
          </button>

          <button
            onClick={onReset}
            className="w-full h-[42px] bg-white/5 text-white/60 font-urbanist font-bold rounded-xl
              hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            Change Selection
          </button>
        </div>
      </div>
    </div>
  );
}