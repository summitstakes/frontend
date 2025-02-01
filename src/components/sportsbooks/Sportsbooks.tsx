import React, { useState, useEffect } from 'react';
import { Globe2, MapPin, Search, ArrowRight, Trophy, Target, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FilterBar } from './components/FilterBar';
import { SportsbookGrid } from './components/SportsbookGrid';
import { regions } from './data/sportsbooks';
import { Sportsbook } from './types';

export function Sportsbooks() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedStateOrProvince, setSelectedStateOrProvince] = useState<string | null>(null);
  const [sportsbooks, setSportsbooks] = useState<Sportsbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allSportsbooks, setAllSportsbooks] = useState<Sportsbook[]>([]);

  // Get all unique sportsbooks
  useEffect(() => {
    const books = new Map<string, Sportsbook>();
    regions.forEach(region => {
      region.countries.forEach(country => {
        country.sportsbooks?.forEach(book => {
          books.set(book.id, book);
        });
      });
    });
    setAllSportsbooks(Array.from(books.values()));
    setSportsbooks(Array.from(books.values())); // Set initial sportsbooks to all
    setIsLoading(false);
  }, []);

  // Update sportsbooks when selection changes
  useEffect(() => {
    if (!selectedRegion) {
      setSportsbooks(allSportsbooks);
      return;
    }

    const region = regions.find(r => r.name === selectedRegion);
    if (!region) {
      setSportsbooks(allSportsbooks);
      return;
    }

    if (!selectedCountry) {
      // Show all sportsbooks from the selected region
      const regionBooks = new Map<string, Sportsbook>();
      region.countries.forEach(country => {
        country.sportsbooks?.forEach(book => {
          regionBooks.set(book.id, book);
        });
      });
      setSportsbooks(Array.from(regionBooks.values()));
      return;
    }

    const country = region.countries.find(c => c.name === selectedCountry);
    if (!country) {
      setSportsbooks(allSportsbooks);
      return;
    }

    // For US and Canada, require state/province selection
    if ((country.name === 'USA' || country.name === 'Canada') && !selectedStateOrProvince) {
      setSportsbooks(country.sportsbooks || []);
      return;
    }

    setSportsbooks(country.sportsbooks || []);
  }, [selectedRegion, selectedCountry, selectedStateOrProvince, allSportsbooks]);

  // Get filtered counts based on current selection
  const getFilteredCounts = () => {
    if (!selectedRegion) {
      return {
        regionCount: regions.length,
        countryCount: regions.reduce((acc, region) => acc + region.countries.length, 0)
      };
    }

    const region = regions.find(r => r.name === selectedRegion);
    if (!region) {
      return { regionCount: 0, countryCount: 0 };
    }

    return {
      regionCount: 1,
      countryCount: region.countries.length
    };
  };

  const { regionCount, countryCount } = getFilteredCounts();

  return (
    <div className="min-h-screen bg-[#06060C] -mt-[120px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Header Section */}
        <div className="pt-[160px] pb-12">
          <div className="grid grid-cols-[1fr_400px] gap-16 items-start">
            {/* Left Column - Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white mb-6 leading-tight">
                Explore Our
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                  animate-gradient relative">
                  Sportsbook Coverage
                  <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                    from-transparent via-[#8000FF] to-transparent opacity-50" />
                </span>
              </h1>
              
              <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
                Our Software is tailored to every region specifically, here are the sportsbooks we cover in your region!
              </p>
            </div>

            {/* Right Column - Info Tabs */}
            <div className="space-y-4">
              {/* Weekly Updates Tab */}
              <div className="p-4 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
                hover:-translate-y-1 hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]
                transition-all duration-500 relative overflow-hidden">
                {/* Gradient Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                
                <div className="flex items-center gap-3 relative">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                      group-hover:scale-110 transition-transform duration-500">
                      <Clock className="w-5 h-5 text-[#8000FF]" />
                    </div>
                    {/* Pulsing Dot */}
                    <div className="absolute -top-1 -right-1">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-50" />
                        <div className="relative w-3 h-3 bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-urbanist font-bold text-white text-lg group-hover:text-[#8000FF] 
                      transition-colors">
                      Weekly Updates
                    </h3>
                    <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                      Last updated: 2 days ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Info Tab */}
              <div className="p-4 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
                hover:-translate-y-1 hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]
                transition-all duration-500 relative overflow-hidden">
                {/* Gradient Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                
                <div className="flex items-center gap-3 relative">
                  <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-500">
                    <AlertCircle className="w-5 h-5 text-[#8000FF]" />
                  </div>
                  <div>
                    <h3 className="font-urbanist font-bold text-white text-lg group-hover:text-[#8000FF] 
                      transition-colors">
                      Verified Info
                    </h3>
                    <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                      100% manually verified data
                    </p>
                  </div>
                </div>
              </div>

              {/* Report Issues Tab */}
              <button 
                onClick={() => navigate('/contactus')}
                className="w-full p-4 bg-gradient-to-br from-[#8000FF]/20 to-[#8000FF]/5 
                  border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
                  hover:-translate-y-1 hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.3)]
                  transition-all duration-500 relative overflow-hidden"
              >
                {/* Enhanced Gradient Glow Effect */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8000FF]/20 
                    to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8000FF]/20 
                    to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
                </div>

                <div className="flex items-center gap-3 relative">
                  <div className="w-10 h-10 rounded-lg bg-[#8000FF]/20 flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-500">
                    <MessageSquare className="w-5 h-5 text-[#8000FF]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-urbanist font-bold text-white text-lg group-hover:text-[#8000FF] 
                      transition-colors">
                      Report Issues
                    </h3>
                    <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                      Help us improve our coverage
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#8000FF]/20 flex items-center justify-center
                    group-hover:bg-[#8000FF] transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#8000FF] group-hover:text-white 
                      group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-[#8000FF]" />
            </div>
            <span className="text-white font-urbanist font-bold">Filter by Location</span>
          </div>

          <FilterBar
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedStateOrProvince={selectedStateOrProvince}
            setSelectedStateOrProvince={setSelectedStateOrProvince}
            regions={regions}
          />
        </div>

        {/* Enhanced Stats Bar */}
        <div className="mb-8 p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
          border border-[#8000FF]/20 rounded-xl">
          <div className="flex items-center justify-center gap-8">
            {/* Region Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center
                group-hover:bg-[#8000FF]/20 transition-colors">
                <Globe2 className="w-6 h-6 text-[#8000FF]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-urbanist font-bold text-white mb-1">
                  {selectedRegion || `All Regions (${regionCount})`}
                </div>
                <div className="text-white/60">
                  {selectedRegion ? 'Selected Region' : 'Regions Available'}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#8000FF]/20 to-transparent" />

            {/* Country/Location Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center
                group-hover:bg-[#8000FF]/20 transition-colors">
                <MapPin className="w-6 h-6 text-[#8000FF]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-urbanist font-bold text-white mb-1">
                  {selectedCountry ? (
                    <>
                      {selectedCountry}
                      {selectedStateOrProvince && (
                        <span className="text-lg text-white/60 ml-2">
                          ({selectedStateOrProvince})
                        </span>
                      )}
                    </>
                  ) : selectedRegion ? (
                    `${countryCount} Countries`
                  ) : (
                    `All Countries (${countryCount})`
                  )}
                </div>
                <div className="text-white/60">
                  {selectedCountry ? 'Selected Location' : 'Countries Available'}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#8000FF]/20 to-transparent" />

            {/* Total Sportsbooks */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center
                group-hover:bg-[#8000FF]/20 transition-colors">
                <Trophy className="w-6 h-6 text-[#8000FF]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-urbanist font-bold text-white mb-1">
                  {sportsbooks.length}
                </div>
                <div className="text-white/60">
                  {sportsbooks.length === 1 ? 'Sportsbook' : 'Sportsbooks'} Available
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sportsbooks Grid */}
        <div className="pb-24">
          <SportsbookGrid 
            sportsbooks={sportsbooks}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}