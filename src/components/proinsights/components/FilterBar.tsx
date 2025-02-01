import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, Clock, Star, Calendar, Search, Trophy, X } from 'lucide-react';
import { sportsData } from '../data/filters';

interface FilterBarProps {
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setCurrentPage: (page: number) => void;
}

const dateFilters = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: '7days', label: 'Past 7 Days' },
  { id: '30days', label: 'Past 30 Days' }
];

export function FilterBar({
  selectedSport,
  setSelectedSport,
  selectedLeague,
  setSelectedLeague,
  selectedDate,
  setSelectedDate,
  setCurrentPage
}: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<'sport' | 'league' | 'date' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if any filters are active
  const hasActiveFilters = selectedSport !== 'All Sports' || 
    selectedLeague !== 'All Leagues' || 
    selectedDate !== 'newest';

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

  const getAvailableLeagues = () => {
    if (selectedSport === 'All Sports') return [];
    const sport = sportsData.find(s => s.name === selectedSport);
    return sport ? sport.leagues : [];
  };

  const handleSportSelect = (sportName: string) => {
    if (sportName === selectedSport) {
      setActiveDropdown(null);
      return;
    }
    
    setSelectedSport(sportName);
    setSelectedLeague('All Leagues');
    setCurrentPage(1);
    setActiveDropdown(null);
    setSearchQuery('');
  };

  const handleLeagueSelect = (league: string) => {
    if (league === selectedLeague) {
      setActiveDropdown(null);
      return;
    }
    
    setSelectedLeague(league);
    setCurrentPage(1);
    setActiveDropdown(null);
  };

  const handleDateSelect = (dateFilter: string) => {
    if (dateFilter === selectedDate) {
      setActiveDropdown(null);
      return;
    }
    
    setSelectedDate(dateFilter);
    setCurrentPage(1);
    setActiveDropdown(null);
  };

  const clearFilters = () => {
    setSelectedSport('All Sports');
    setSelectedLeague('All Leagues');
    setSelectedDate('newest');
    setCurrentPage(1);
    setActiveDropdown(null);
    setSearchQuery('');
  };

  const filteredSports = searchQuery
    ? [
        ...(['All Sports'].filter(sport => 
          sport.toLowerCase().includes(searchQuery.toLowerCase())
        )),
        ...sportsData.filter(sport =>
          sport.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ]
    : ['All Sports', ...sportsData.map(sport => sport.name)];

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-urbanist font-bold text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
          <Clock className="w-5 h-5 text-[#8000FF]" />
        </div>
        Latest Insights
      </h2>
      
      {/* Enhanced Filter Container */}
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-2">
          {/* Sport Filter */}
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'sport' ? null : 'sport')}
            className={`h-[36px] px-3 rounded-lg transition-all duration-300 flex items-center gap-2
              ${activeDropdown === 'sport'
                ? 'bg-[#8000FF] text-white'
                : selectedSport !== 'All Sports'
                  ? 'bg-[#8000FF]/20 text-white hover:bg-[#8000FF]/30'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
          >
            <span className="text-sm">{selectedSport}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300
              ${activeDropdown === 'sport' ? 'rotate-180' : ''}`} />
          </button>

          {/* League Filter */}
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'league' ? null : 'league')}
            className={`h-[36px] px-3 rounded-lg transition-all duration-300 flex items-center gap-2
              ${activeDropdown === 'league'
                ? 'bg-[#8000FF] text-white'
                : selectedLeague !== 'All Leagues'
                  ? 'bg-[#8000FF]/20 text-white hover:bg-[#8000FF]/30'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
          >
            <span className="text-sm">{selectedLeague}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300
              ${activeDropdown === 'league' ? 'rotate-180' : ''}`} />
          </button>

          {/* Date Filter */}
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
            className={`h-[36px] px-3 rounded-lg transition-all duration-300 flex items-center gap-2
              ${activeDropdown === 'date'
                ? 'bg-[#8000FF] text-white'
                : selectedDate !== 'newest'
                  ? 'bg-[#8000FF]/20 text-white hover:bg-[#8000FF]/30'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
          >
            <span className="text-sm">{dateFilters.find(d => d.id === selectedDate)?.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300
              ${activeDropdown === 'date' ? 'rotate-180' : ''}`} />
          </button>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="h-[36px] w-[36px] rounded-lg bg-white/5 hover:bg-white/10 
                transition-all duration-300 flex items-center justify-center text-white/40 
                hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Panels */}
        {activeDropdown && (
          <div className="absolute top-full right-0 mt-2 w-[280px] bg-[#120D1D] border border-[#8000FF]/20 
            rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            {/* Sport Dropdown */}
            {activeDropdown === 'sport' && (
              <div>
                {/* Search Bar */}
                <div className="p-3 border-b border-[#8000FF]/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search sports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-[36px] bg-white/5 border border-white/10 rounded-lg pl-10 pr-4
                        text-white/60 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                        focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                    />
                  </div>
                </div>

                {/* Sports List */}
                <div className="max-h-[320px] overflow-y-auto">
                  {filteredSports.map((sport) => (
                    <button
                      key={sport}
                      onClick={() => handleSportSelect(sport)}
                      className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                        flex items-center justify-between group/item
                        ${selectedSport === sport ? 'bg-[#8000FF]/20' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                          ${selectedSport === sport 
                            ? 'bg-[#8000FF]/30 text-[#8000FF]' 
                            : 'bg-white/5 text-white/40'} 
                          group-hover/item:bg-[#8000FF]/20 transition-colors`}>
                          {sport === 'All Sports' ? (
                            <Trophy className="w-4 h-4" />
                          ) : (
                            <span className="text-lg">
                              {sportsData.find(s => s.name === sport)?.icon || '🎯'}
                            </span>
                          )}
                        </div>
                        <span className={`${selectedSport === sport 
                          ? 'text-white' 
                          : 'text-white/60 group-hover/item:text-white'} 
                          transition-colors`}>
                          {sport}
                        </span>
                      </div>
                      {selectedSport === sport && (
                        <Star className="w-4 h-4 text-[#8000FF]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* League Dropdown */}
            {activeDropdown === 'league' && (
              <div>
                <button
                  onClick={() => handleLeagueSelect('All Leagues')}
                  className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                    flex items-center justify-between group/item
                    ${selectedLeague === 'All Leagues' ? 'bg-[#8000FF]/20' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                      ${selectedLeague === 'All Leagues' 
                        ? 'bg-[#8000FF]/30 text-[#8000FF]' 
                        : 'bg-white/5 text-white/40'} 
                      group-hover/item:bg-[#8000FF]/20 transition-colors`}>
                      <Trophy className="w-4 h-4" />
                    </div>
                    <span className={`${selectedLeague === 'All Leagues' 
                      ? 'text-white' 
                      : 'text-white/60 group-hover/item:text-white'} 
                      transition-colors`}>
                      All Leagues
                    </span>
                  </div>
                  {selectedLeague === 'All Leagues' && (
                    <Star className="w-4 h-4 text-[#8000FF]" />
                  )}
                </button>

                {selectedSport !== 'All Sports' ? (
                  <div className="max-h-[320px] overflow-y-auto">
                    {getAvailableLeagues().map((league) => (
                      <button
                        key={league}
                        onClick={() => handleLeagueSelect(league)}
                        className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                          flex items-center justify-between group/item
                          ${selectedLeague === league ? 'bg-[#8000FF]/20' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                            ${selectedLeague === league 
                              ? 'bg-[#8000FF]/30 text-[#8000FF]' 
                              : 'bg-white/5 text-white/40'} 
                            group-hover/item:bg-[#8000FF]/20 transition-colors`}>
                            <Trophy className="w-4 h-4" />
                          </div>
                          <span className={`${selectedLeague === league 
                            ? 'text-white' 
                            : 'text-white/60 group-hover/item:text-white'} 
                            transition-colors`}>
                            {league}
                          </span>
                        </div>
                        {selectedLeague === league && (
                          <Star className="w-4 h-4 text-[#8000FF]" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-[#8000FF]" />
                    </div>
                    <p className="text-white/60 text-sm">
                      Select a sport to view available leagues
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Date Dropdown */}
            {activeDropdown === 'date' && (
              <div className="max-h-[320px] overflow-y-auto">
                {dateFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleDateSelect(filter.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                      flex items-center justify-between group/item
                      ${selectedDate === filter.id ? 'bg-[#8000FF]/20' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                        ${selectedDate === filter.id 
                          ? 'bg-[#8000FF]/30 text-[#8000FF]' 
                          : 'bg-white/5 text-white/40'} 
                        group-hover/item:bg-[#8000FF]/20 transition-colors`}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className={`${selectedDate === filter.id 
                        ? 'text-white' 
                        : 'text-white/60 group-hover/item:text-white'} 
                        transition-colors`}>
                        {filter.label}
                      </span>
                    </div>
                    {selectedDate === filter.id && (
                      <Star className="w-4 h-4 text-[#8000FF]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}