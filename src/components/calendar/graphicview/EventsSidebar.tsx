import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, ChevronLeft, ChevronRight, Trophy, ArrowRight } from 'lucide-react';
import { EventsSidebarProps } from './types';
import { sportsData } from './mockData';
import { SportItem } from './SportItem';

const SPORTS_PER_PAGE = 5;

export function EventsSidebar({ selectedDate, dayData }: EventsSidebarProps) {
  const navigate = useNavigate();
  const [expandedSport, setExpandedSport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Check if selected date is today
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  // Calculate total leagues for the selected date
  const totalLeagues = sportsData.reduce((acc, sport) => acc + sport.leagues.length, 0);

  // Mock live games count (you would get this from your data)
  const liveGamesCount = isToday ? 5 : 0;

  // Filter sports based on search
  const filteredSports = sportsData.filter(sport => {
    const matchesSport = sport.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLeagues = sport.leagues.some(league => 
      league.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesSport || matchesLeagues;
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredSports.length / SPORTS_PER_PAGE));
  const startIndex = (currentPage - 1) * SPORTS_PER_PAGE;
  const visibleSports = filteredSports.slice(startIndex, startIndex + SPORTS_PER_PAGE);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Search effect
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const handleSportClick = (sportName: string) => {
    setExpandedSport(expandedSport === sportName ? null : sportName);
  };

  const handleLeagueClick = (league: string) => {
    navigate(`/sports/${league.toLowerCase()}`);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
      border border-[#8000FF]/20 rounded-2xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-[#8000FF]" />
        </div>
        <div>
          <h3 className="font-urbanist font-bold text-white text-xl">
            {selectedDate.toLocaleDateString('default', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </h3>
          <p className="text-white/60">
            {dayData?.matches || 0} matches across {dayData?.sports || 0} sports
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors
          ${isSearching ? 'text-[#8000FF]' : 'text-white/40'}`} />
        <input
          type="text"
          placeholder="Search sports or leagues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
            text-white placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
            focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-lg font-urbanist font-bold text-white mb-1">
            {dayData?.matches || 0}
          </div>
          <div className="text-sm text-white/60">Total Matches</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative">
          <div className="text-lg font-urbanist font-bold text-white mb-1">
            {isToday ? liveGamesCount : totalLeagues}
          </div>
          <div className="text-sm text-white/60">
            {isToday ? 'Live Now' : 'Total Leagues'}
          </div>
          {/* Live Games Indicator */}
          {isToday && liveGamesCount > 0 && (
            <div className="absolute -top-1 -right-1">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-50" />
                <div className="relative w-3 h-3 bg-emerald-500 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sports List */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {visibleSports.length > 0 ? (
            visibleSports.map((sport) => (
              <SportItem
                key={sport.name}
                sport={sport}
                isExpanded={expandedSport === sport.name}
                searchQuery={searchQuery}
                onSportClick={handleSportClick}
                onLeagueClick={handleLeagueClick}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-[#8000FF]" />
              </div>
              <h4 className="text-white font-urbanist font-bold mb-1">No Results Found</h4>
              <p className="text-white/60 text-sm">Try adjusting your search query</p>
            </div>
          )}
        </div>

        {/* Footer with Pagination and CTA */}
        <div className="space-y-3 mt-4 pt-4 border-t border-[#8000FF]/10">
          {/* Compact Pagination */}
          <div className="flex items-center justify-between h-8">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
              className="h-8 px-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1
                hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                text-white/60 hover:text-white text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <span className="text-xs text-white/40">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
              className="h-8 px-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1
                hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                text-white/60 hover:text-white text-xs"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* All Sports CTA */}
          <button
            onClick={() => navigate('/sports')}
            className="w-full h-[42px] bg-[#8000FF]/10 text-white font-urbanist font-bold rounded-xl
              hover:bg-[#8000FF]/20 transition-all duration-300 flex items-center justify-center gap-2
              group border border-[#8000FF]/20 hover:border-[#8000FF]/40"
          >
            <Trophy className="w-5 h-5 text-[#8000FF]" />
            <span>View All Sports</span>
            <ArrowRight className="w-5 h-5 text-[#8000FF] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}