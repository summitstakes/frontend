import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle, ArrowRight, Languages, Globe2, MapPin } from 'lucide-react';
import { CA } from 'country-flag-icons/react/3x2';

const provinces = [
  { name: 'Alberta', code: 'AB' },
  { name: 'British Columbia', code: 'BC' },
  { name: 'Ontario', code: 'ON' },
  { name: 'Quebec', code: 'QC' }
];

// Common languages for Canada
const languages = [
  { code: 'EN', name: 'English' },
  { code: 'FR', name: 'Français' },
  { code: 'ES', name: 'Español' },
  { code: 'ZH', name: '中文' },
  { code: 'AR', name: 'العربية' },
  { code: 'HI', name: 'हिन्दी' },
  { code: 'VI', name: 'Tiếng Việt' },
  { code: 'TA', name: 'தமிழ்' }
];

interface RegionPopupProps {
  onContinue: (province: string) => void;
  onChangeLocation: () => void;
}

export function RegionPopup({ onContinue, onChangeLocation }: RegionPopupProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  // Prevent scrolling when the popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Stop pulsing animation when province is selected
  useEffect(() => {
    if (selectedProvince) {
      setShowPulse(false);
    }
  }, [selectedProvince]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#06060C]/80 backdrop-blur-sm" />

      <div 
        onClick={handleContentClick}
        className="relative w-[800px] h-[600px] bg-gradient-to-br from-[#1A1527]/95 to-[#120D1D]/95 
          rounded-2xl border border-[#8000FF]/20 shadow-lg overflow-hidden flex flex-col"
        style={{ margin: '0 auto' }}
      >
        {/* Language Selector */}
        <div className="absolute top-4 right-4 z-10">
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="h-[36px] px-3 rounded-lg bg-white/5 border border-white/10 
                hover:bg-white/10 hover:border-[#8000FF]/20 transition-all duration-300
                flex items-center gap-2 group"
            >
              <Languages className="w-4 h-4 text-white/40 group-hover:text-[#8000FF] transition-colors" />
              <span className="text-white/60 text-sm font-medium">{selectedLang}</span>
              <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300
                ${showLangDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showLangDropdown && (
              <div className="absolute top-full right-0 mt-2 w-[180px] bg-[#1A1527] border border-[#8000FF]/20 
                rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="max-h-[240px] overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setShowLangDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-white/5 transition-all
                        flex items-center justify-between group/item"
                    >
                      <span className="text-white/60 text-sm group-hover/item:text-white transition-colors">
                        {lang.name}
                      </span>
                      {selectedLang === lang.code && (
                        <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#8000FF]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] h-full">
          {/* Left Column - Form */}
          <div className="p-6 overflow-y-auto">
            {/* Header */}
            <div className="text-center relative mb-6">
              <div className="h-16 flex items-center justify-center mx-auto mb-4">
                <img 
                  src="https://imgur.com/aJzVj8P.png" 
                  alt="Summit Stakes" 
                  className="h-full w-auto object-contain" 
                />
              </div>
              <h2 className="text-2xl font-urbanist font-bold text-white mb-2">
                Welcome to Summit Stakes
              </h2>
              <p className="text-white/60">
                You are currently on the <span className="text-white font-medium underline">Canadian</span> version of our website
              </p>
            </div>

            {/* Province Selection */}
            <div className="mb-6">
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
                  <span>Select Your Province</span>
                  {!selectedProvince && (
                    <span className="px-2 py-0.5 rounded-full bg-[#8000FF]/20 text-[#8000FF] text-xs animate-bounce">
                      Required
                    </span>
                  )}
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`w-full h-[52px] px-4 bg-white/5 border rounded-xl flex items-center justify-between
                      transition-all group hover:border-[#8000FF]/40 ${selectedProvince 
                        ? 'text-white border-[#8000FF]/40 bg-[#8000FF]/5' 
                        : 'text-white/40 border-white/10'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg ${selectedProvince ? 'bg-[#8000FF]/20' : 'bg-white/5'} 
                        flex items-center justify-center transition-colors group-hover:bg-[#8000FF]/20`}>
                        <MapPin className={`w-4 h-4 ${selectedProvince ? 'text-[#8000FF]' : 'text-white/40'} 
                          transition-colors group-hover:text-[#8000FF]`} />
                      </div>
                      <span className="group-hover:text-white transition-colors">
                        {selectedProvince || 'Select province'}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white/40 transition-all duration-300 
                      group-hover:text-white/60 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1527] border border-[#8000FF]/20 
                      rounded-xl shadow-lg overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                      {provinces.map((province) => (
                        <button
                          key={province.code}
                          onClick={() => {
                            setSelectedProvince(province.name);
                            setShowDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                            flex items-center justify-between group/item border-b border-[#8000FF]/10 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center
                              group-hover/item:bg-[#8000FF]/20 transition-colors">
                              <MapPin className="w-4 h-4 text-white/40 group-hover/item:text-[#8000FF] transition-colors" />
                            </div>
                            <span className="text-white/60 group-hover/item:text-white transition-colors">
                              {province.name}
                            </span>
                          </div>
                          <span className="text-white/40 text-sm group-hover/item:text-white/60 transition-colors">
                            {province.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mb-6 p-4 bg-[#8000FF]/10 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#8000FF] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-urbanist font-bold mb-1">Why is my location important?</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Featuring data from region-specific Sportsbooks & Popular Sports, every version of our website 
                  is tailored to one of the 45 countries we offer.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => selectedProvince && onContinue(selectedProvince)}
                disabled={!selectedProvince}
                className="w-full h-[48px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                  hover:bg-[#6700CC] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
                  translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
                  Continue to Site
                </span>
              </button>

              <button
                onClick={onChangeLocation}
                className="w-full h-[48px] bg-white/5 text-white/60 font-urbanist font-bold rounded-xl
                  hover:bg-white/10 hover:text-white transition-all duration-300 group"
              >
                Not in Canada?
              </button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative hidden lg:block">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3" 
                alt="Canada"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1527] via-[#1A1527]/50 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative h-full p-8 flex flex-col justify-between">
              {/* Top Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-urbanist font-bold text-white">Canada</h3>
                  <div className="w-8 h-6 overflow-hidden rounded-md">
                    <CA className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="text-white/60">
                  Select your province to get started with region-specific betting options
                </p>
              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Globe2 className="w-4 h-4" />, value: '45+', label: 'Countries' },
                  { icon: <Languages className="w-4 h-4" />, value: '20+', label: 'Languages' }
                ].map((stat, index) => (
                  <div key={index} className="p-3 rounded-xl bg-black/20 backdrop-blur-sm 
                    border border-white/10 text-center">
                    <div className="w-8 h-8 rounded-lg bg-[#8000FF]/20 flex items-center justify-center 
                      mx-auto mb-2">
                      <div className="text-[#8000FF]">{stat.icon}</div>
                    </div>
                    <div className="text-lg font-urbanist font-bold text-white">{stat.value}</div>
                    <div className="text-white/40 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}