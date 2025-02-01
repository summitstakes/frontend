import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe2, MapPin, ChevronDown, X } from 'lucide-react';
import { FilterBarProps } from '../types';

export function FilterBar({
  selectedRegion,
  setSelectedRegion,
  selectedCountry,
  setSelectedCountry,
  selectedStateOrProvince,
  setSelectedStateOrProvince,
  regions
}: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<'region' | 'country' | 'state' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRegionSelect = (regionName: string) => {
    if (regionName === selectedRegion) {
      setActiveDropdown(null);
      return;
    }
    
    setSelectedRegion(regionName);
    setSelectedCountry(null);
    setSelectedStateOrProvince(null);
    setActiveDropdown(null);
  };

  const handleCountrySelect = (countryName: string) => {
    if (countryName === selectedCountry) {
      setActiveDropdown(null);
      return;
    }
    
    setSelectedCountry(countryName);
    setSelectedStateOrProvince(null);
    setActiveDropdown(null);
  };

  const handleStateSelect = (stateName: string) => {
    if (stateName === selectedStateOrProvince) {
      setActiveDropdown(null);
      return;
    }
    
    setSelectedStateOrProvince(stateName);
    setActiveDropdown(null);
  };

  const clearFilters = () => {
    setSelectedRegion(null);
    setSelectedCountry(null);
    setSelectedStateOrProvince(null);
    setActiveDropdown(null);
  };

  const getSelectedCountryData = () => {
    if (!selectedRegion || !selectedCountry) return null;
    const region = regions.find(r => r.name === selectedRegion);
    if (!region) return null;
    return region.countries.find(c => c.name === selectedCountry);
  };

  const hasStateOrProvince = () => {
    const country = getSelectedCountryData();
    return country?.states?.length || country?.provinces?.length;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Steps - Now in a flex container with Clear Filters */}
      <div className="flex items-start gap-4">
        {/* Steps Container - Now with flex-1 to allow space for Clear Filters */}
        <div className="flex gap-4 w-full">
          {/* Main filters container - 90% width */}
          <div className="flex-[0.9] grid grid-cols-3 gap-4">
            {/* Step 1: Region - With relative positioning */}
            <div className="space-y-2 relative">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center 
                  text-[#8000FF] text-xs font-bold">1</span>
                <span>Select Region</span>
              </div>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'region' ? null : 'region')}
                className={`w-full h-[42px] px-3 rounded-xl transition-all duration-300 flex items-center gap-2
                  ${activeDropdown === 'region'
                    ? 'bg-[#8000FF] text-white'
                    : selectedRegion
                      ? 'bg-[#8000FF]/20 text-white hover:bg-[#8000FF]/30'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                <Globe2 className="w-4 h-4" />
                <span className="flex-1 text-left truncate text-sm">{selectedRegion || 'Select Region'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300
                  ${activeDropdown === 'region' ? 'rotate-180' : ''}`} />
              </button>

              {/* Region Dropdown */}
              {activeDropdown === 'region' && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-[320px] bg-[#120D1D] border border-[#8000FF]/20 
                  rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {/* Search Bar */}
                  <div className="p-3 border-b border-[#8000FF]/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search regions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-[36px] bg-white/5 border border-white/10 rounded-lg pl-10 pr-4
                          text-white/60 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                          focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Region List */}
                  <div className="max-h-[320px] overflow-y-auto">
                    {regions
                      .filter(region => 
                        region.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(region => (
                        <button
                          key={region.name}
                          onClick={() => handleRegionSelect(region.name)}
                          className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                            flex items-center justify-between
                            ${selectedRegion === region.name ? 'bg-[#8000FF]/20' : ''}`}
                        >
                          <span className={selectedRegion === region.name 
                            ? 'text-white' 
                            : 'text-white/60'}>
                            {region.name}
                          </span>
                          <span className="text-white/40 text-sm">
                            {region.countries.length} countries
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Country - With relative positioning */}
            <div className="space-y-2 relative">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center 
                  text-[#8000FF] text-xs font-bold">2</span>
                <span>Select Country</span>
              </div>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'country' ? null : 'country')}
                disabled={!selectedRegion}
                className={`w-full h-[42px] px-3 rounded-xl transition-all duration-300 flex items-center gap-2
                  ${!selectedRegion ? 'opacity-50 cursor-not-allowed' : ''}
                  ${activeDropdown === 'country'
                    ? 'bg-[#8000FF] text-white'
                    : selectedCountry
                      ? 'bg-[#8000FF]/20 text-white hover:bg-[#8000FF]/30'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                <MapPin className="w-4 h-4" />
                <span className="flex-1 text-left truncate text-sm">{selectedCountry || 'Select Country'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300
                  ${activeDropdown === 'country' ? 'rotate-180' : ''}`} />
              </button>

              {/* Country Dropdown */}
              {activeDropdown === 'country' && selectedRegion && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-[320px] bg-[#120D1D] border border-[#8000FF]/20 
                  rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {/* Search Bar */}
                  <div className="p-3 border-b border-[#8000FF]/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-[36px] bg-white/5 border border-white/10 rounded-lg pl-10 pr-4
                          text-white/60 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                          focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Country List */}
                  <div className="max-h-[320px] overflow-y-auto">
                    {regions
                      .find(r => r.name === selectedRegion)
                      ?.countries
                      .filter(country => 
                        country.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(country => (
                        <button
                          key={country.name}
                          onClick={() => handleCountrySelect(country.name)}
                          className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                            flex items-center justify-between
                            ${selectedCountry === country.name ? 'bg-[#8000FF]/20' : ''}`}
                        >
                          <span className={selectedCountry === country.name 
                            ? 'text-white' 
                            : 'text-white/60'}>
                            {country.name}
                          </span>
                          {country.sportsbooks && (
                            <span className="text-white/40 text-sm">
                              {country.sportsbooks.length} sportsbooks
                            </span>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: State/Province - With relative positioning */}
            <div className="space-y-2 relative">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center 
                  text-[#8000FF] text-xs font-bold">3</span>
                <span>Select State/Province</span>
                {!hasStateOrProvince() && selectedCountry && (
                  <span className="text-xs text-white/40">(Not Required)</span>
                )}
              </div>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'state' ? null : 'state')}
                disabled={!selectedCountry || !hasStateOrProvince()}
                className={`w-full h-[42px] px-3 rounded-xl transition-all duration-300 flex items-center gap-2
                  ${(!selectedCountry || !hasStateOrProvince()) ? 'opacity-50 cursor-not-allowed' : ''}
                  ${activeDropdown === 'state'
                    ? 'bg-[#8000FF] text-white'
                    : selectedStateOrProvince
                      ? 'bg-[#8000FF]/20 text-white hover:bg-[#8000FF]/30'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                <MapPin className="w-4 h-4" />
                <span className="flex-1 text-left truncate text-sm">
                  {selectedStateOrProvince || 'Select State/Province'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300
                  ${activeDropdown === 'state' ? 'rotate-180' : ''}`} />
              </button>

              {/* State/Province Dropdown */}
              {activeDropdown === 'state' && selectedRegion && selectedCountry && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-[320px] bg-[#120D1D] border border-[#8000FF]/20 
                  rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {/* Search Bar */}
                  <div className="p-3 border-b border-[#8000FF]/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search states/provinces..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-[36px] bg-white/5 border border-white/10 rounded-lg pl-10 pr-4
                          text-white/60 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                          focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* State/Province List */}
                  <div className="max-h-[320px] overflow-y-auto">
                    {getSelectedCountryData()?.states?.filter(state =>
                      state.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map(state => (
                      <button
                        key={state}
                        onClick={() => handleStateSelect(state)}
                        className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                          ${selectedStateOrProvince === state ? 'bg-[#8000FF]/20' : ''}`}
                      >
                        <span className={selectedStateOrProvince === state 
                          ? 'text-white' 
                          : 'text-white/60'}>
                          {state}
                        </span>
                      </button>
                    ))}
                    {getSelectedCountryData()?.provinces?.filter(province =>
                      province.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map(province => (
                      <button
                        key={province}
                        onClick={() => handleStateSelect(province)}
                        className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                          ${selectedStateOrProvince === province ? 'bg-[#8000FF]/20' : ''}`}
                      >
                        <span className={selectedStateOrProvince === province 
                          ? 'text-white' 
                          : 'text-white/60'}>
                          {province}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clear Filters - Now 10% width */}
          <div className="flex-[0.1] space-y-2">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center 
                text-[#8000FF] text-xs font-bold opacity-0">4</span>
              <span className="opacity-0">Clear</span>
            </div>
            <button
              onClick={clearFilters}
              disabled={!selectedRegion && !selectedCountry && !selectedStateOrProvince}
              className={`w-full h-[42px] px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                ${(!selectedRegion && !selectedCountry && !selectedStateOrProvince)
                  ? 'opacity-50 cursor-not-allowed bg-white/5 text-white/40'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              <X className="w-4 h-4" />
              <span className="text-sm">Clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}