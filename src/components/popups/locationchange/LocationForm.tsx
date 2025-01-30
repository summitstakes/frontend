import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe2, ChevronRight, Check, X, MapPin } from 'lucide-react';
import * as Flags from 'country-flag-icons/react/3x2';
import { LocationService } from '../../../lib/locationService';
import { LocationFormProps } from './types';
import { ConfirmationScreen } from './ConfirmationScreen';
import type { Country, StateProvince } from '../../../lib/locationService';

// Flag component
function CountryFlag({ countryCode }: { countryCode: string }) {
  const code = countryCode.toUpperCase() as keyof typeof Flags;
  if (!Flags[code]) {
    return null;
  }
  
  const FlagComponent = Flags[code];
  return (
    <FlagComponent className="w-full h-full rounded-md" />
  );
}

// Helper function to check if country has states/provinces
const hasStatesOrProvinces = (country: Country) => {
  return ['CA', 'US'].includes(country.code);
};

export function LocationForm({ onClose, currentLocation, setView }: LocationFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedStateOrProvince, setSelectedStateOrProvince] = useState<StateProvince | null>(null);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [isLoadingStatesProvinces, setIsLoadingStatesProvinces] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [groupedCountries, setGroupedCountries] = useState<Record<string, Country[]>>({});
  const [statesProvinces, setStatesProvinces] = useState<StateProvince[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<'region' | 'country' | 'state' | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Reset function to completely clear the selection
  const resetSelection = () => {
    setShowConfirmation(false);
    setSelectedRegion(null);
    setSelectedCountry(null);
    setSelectedStateOrProvince(null);
    setActiveDropdown(null);
    setSearchQuery('');
  };

  // Toggle dropdown handler
  const toggleDropdown = (type: 'region' | 'country' | 'state' | null) => {
    if (type === 'state' && statesProvinces.length === 0) {
      return;
    }
    
    setActiveDropdown(current => current === type ? null : type);
    
    // Reset search when closing dropdown
    if (type === 'country') {
      setSearchQuery('');
    } else if (type === 'state') {
      setSearchQuery('');
    }
  };

  // Handle country selection from search results
  const handleCountrySelect = (country: Country) => {
    // Set selected country
    setSelectedCountry(country);
    
    // Set the region based on the selected country
    setSelectedRegion(country.region.name);
    
    // Reset state/province selection
    setSelectedStateOrProvince(null);
    setStatesProvinces([]);
    
    // Clear search
    setSearchQuery('');
    
    // If country has states/provinces, show that dropdown
    if (hasStatesOrProvinces(country)) {
      setActiveDropdown('state');
    } else {
      // If no states/provinces, show confirmation
      setActiveDropdown(null);
      setShowConfirmation(true);
    }
  };

  const handleStateSelect = (state: StateProvince) => {
    setSelectedStateOrProvince(state);
    setActiveDropdown(null);
    setShowConfirmation(true); // Show confirmation after state selection
  };

  const handleConfirm = () => {
    // Handle confirmation here
    console.log('Location confirmed:', {
      region: selectedRegion,
      country: selectedCountry?.name,
      state: selectedStateOrProvince?.name
    });
    onClose();
  };

  // Fetch states/provinces
  useEffect(() => {
    const fetchStatesProvinces = async () => {
      if (!selectedCountry?.id) {
        setStatesProvinces([]);
        return;
      }

      setIsLoadingStatesProvinces(true);
      try {
        const data = await LocationService.getStatesProvinces(selectedCountry.id);
        setStatesProvinces(data || []);
        
        if (data?.length > 0) {
          setActiveDropdown('state');
        }
      } catch (error) {
        console.error('Error fetching states/provinces:', error);
        setStatesProvinces([]);
      } finally {
        setIsLoadingStatesProvinces(false);
      }
    };

    fetchStatesProvinces();
  }, [selectedCountry]);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await LocationService.getCountries();
        const grouped = data.reduce((acc, country) => {
          const regionName = country.region.name;
          if (!acc[regionName]) {
            acc[regionName] = [];
          }
          acc[regionName].push(country);
          return acc;
        }, {} as Record<string, Country[]>);

        setGroupedCountries(grouped);
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search
  const getFilteredCountries = () => {
    if (!searchQuery) return [];
    
    const normalizedSearch = searchQuery.toLowerCase().trim();
    const results: Country[] = [];
    
    Object.values(groupedCountries).forEach(countries => {
      countries.forEach(country => {
        if (country.name.toLowerCase().includes(normalizedSearch)) {
          results.push(country);
        }
      });
    });
    
    return results;
  };

  // Render search results
  const renderSearchResults = () => {
    const filteredCountries = getFilteredCountries();
    
    if (filteredCountries.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6 text-[#8000FF]" />
          </div>
          <p className="text-white/60">No countries found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <button
            key={country.id}
            onClick={() => handleCountrySelect(country)}
            className="flex items-center justify-between p-4 rounded-xl
              bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20
              hover:border-[#8000FF]/40 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-6 overflow-hidden rounded-md">
                <CountryFlag countryCode={country.code} />
              </div>
              <span className="font-urbanist font-bold text-white group-hover:text-[#8000FF] 
                transition-colors block truncate">
                {country.name}
              </span>
            </div>
            {hasStatesOrProvinces(country) ? (
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-[#8000FF] 
                group-hover:translate-x-1 transition-all shrink-0" />
            ) : (
              <Check className="w-5 h-5 text-[#8000FF] opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        ))}
      </div>
    );
  };

  // Render confirmation screen if showing confirmation
  if (showConfirmation) {
    return (
      <ConfirmationScreen
        selectedCountry={selectedCountry}
        selectedStateOrProvince={selectedStateOrProvince}
        onClose={onClose}
        onConfirm={handleConfirm}
        onReset={resetSelection}
      />
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col p-6 border-b border-[#8000FF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe2 className="w-6 h-6 text-[#8000FF]" />
            <div>
              <h2 className="text-xl font-urbanist font-bold text-white">Select Location</h2>
              <p className="text-sm text-white/60">Current location: {currentLocation}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        {/* Disclaimer */}
        <div className="flex items-start gap-3 px-4 py-3 bg-[#8000FF]/10 rounded-xl border border-[#8000FF]/20 mt-4">
          <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[#8000FF] text-sm font-bold">i</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            Our software is tailored to provide the most accurate odds, sportsbooks, and betting data specific to your region. 
            <span className="text-[#8000FF] font-semibold"> Select your location to unlock personalized betting insights and access region-specific features.</span>
          </p>
        </div>
      </div>

      {!selectedRegion && (
        <div className="flex items-center px-6 h-[90px] border-b border-[#8000FF]/10">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[46px] bg-white/5 border border-white/10 rounded-xl pl-11 pr-4
                text-white placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6">
        {isLoadingCountries ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : searchQuery ? (
          renderSearchResults()
        ) : !selectedRegion ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(groupedCountries).map((regionName) => (
              <button
                key={regionName}
                onClick={() => setSelectedRegion(regionName)}
                className="flex items-center justify-between p-4 rounded-xl
                  bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20
                  hover:border-[#8000FF]/40 transition-all duration-300 group"
              >
                <span className="font-urbanist font-bold text-white group-hover:text-[#8000FF] transition-colors">
                  {regionName}
                </span>
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-[#8000FF] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        ) : !selectedCountry ? (
          <div>
            <button
              onClick={() => {
                setSelectedRegion(null);
                setSelectedCountry(null);
                setSelectedStateOrProvince(null);
              }}
              className="mb-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 
                text-white/60 hover:text-white text-sm transition-all"
            >
              ← Back to Regions
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedCountries[selectedRegion]?.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountrySelect(country)}
                  className="flex items-center justify-between p-4 rounded-xl
                    bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20
                    hover:border-[#8000FF]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-6 overflow-hidden rounded-md">
                      <CountryFlag countryCode={country.code} />
                    </div>
                    <span className="font-urbanist font-bold text-white group-hover:text-[#8000FF] 
                      transition-colors block truncate">
                      {country.name}
                    </span>
                  </div>
                  {hasStatesOrProvinces(country) && (
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-[#8000FF] 
                      group-hover:translate-x-1 transition-all shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                setSelectedCountry(null);
                setSelectedStateOrProvince(null);
              }}
              className="mb-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 
                text-white/60 hover:text-white text-sm transition-all"
            >
              ← Back to {selectedRegion}
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingStatesProvinces ? (
                <div className="col-span-3 flex items-center justify-center py-12">
                  <div className="w-6 h-6 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                statesProvinces.map((state) => (
                  <button
                    key={state.id}
                    onClick={() => handleStateSelect(state)}
                    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                      border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300 
                      group w-full text-left"
                  >
                    <span className="font-urbanist font-bold text-white group-hover:text-[#8000FF] transition-colors">
                      {state.name}
                      {state.code && (
                        <span className="text-white/40 text-sm ml-2">({state.code})</span>
                      )}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Request Location Button */}
      <div className="flex items-center justify-center h-[80px] border-t border-[#8000FF]/10 bg-[#120D1D]/95 px-6">
        <button
          onClick={() => setView('request')}
          className="w-full h-[42px] bg-white/5 hover:bg-white/10 text-white/60 hover:text-white
            font-urbanist font-bold rounded-xl transition-all duration-300 group flex items-center justify-center gap-2"
        >
          Can't find your location? Request it here
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </>
  );
}