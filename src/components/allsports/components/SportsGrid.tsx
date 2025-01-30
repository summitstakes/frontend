import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowUpRight, Flame } from 'lucide-react';
import { Sport } from '../types';

interface SportsGridProps {
  sports: Sport[];
  searchQuery: string;
}

export function SportsGrid({ sports, searchQuery }: SportsGridProps) {
  const navigate = useNavigate();
  const leaguesContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleLeagues, setVisibleLeagues] = useState<{ [key: string]: number }>({});
  
  // Memoize sorted and filtered sports to prevent unnecessary recalculations
  const filteredSports = useMemo(() => {
    // Sort sports alphabetically
    const sortedSports = [...sports].sort((a, b) => a.name.localeCompare(b.name));

    // Filter based on search query
    return searchQuery
      ? sortedSports.filter(sport => 
          sport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sport.leagues?.some(league => league.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : sortedSports;
  }, [sports, searchQuery]);

  // Function to calculate how many leagues can fit in one row
  const calculateVisibleLeagues = (containerWidth: number, leagues: string[]) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.position = 'absolute';
    tempDiv.style.whiteSpace = 'nowrap';
    document.body.appendChild(tempDiv);

    let totalWidth = 0;
    let visibleCount = 0;
    const padding = 16; // Account for padding and margins
    const moreTagWidth = 80; // Approximate width of "+X more" tag

    // First, measure each league's width
    for (let i = 0; i < leagues.length; i++) {
      tempDiv.className = 'px-2 py-1 text-xs';
      tempDiv.textContent = leagues[i];
      const leagueWidth = tempDiv.offsetWidth + padding;

      if (totalWidth + leagueWidth + (i < leagues.length - 1 ? moreTagWidth : 0) <= containerWidth) {
        totalWidth += leagueWidth;
        visibleCount++;
      } else {
        break;
      }
    }

    document.body.removeChild(tempDiv);
    return Math.max(1, visibleCount); // Always show at least one league
  };

  // Debounced resize handler
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const updateVisibleLeagues = () => {
      const newVisibleLeagues: { [key: string]: number } = {};
      
      filteredSports.forEach((sport, index) => {
        const container = leaguesContainerRefs.current[index];
        if (container && sport.leagues?.length) {
          const containerWidth = container.offsetWidth;
          const visibleCount = calculateVisibleLeagues(containerWidth, sport.leagues);
          newVisibleLeagues[sport.name] = visibleCount;
        }
      });

      setVisibleLeagues(newVisibleLeagues);
    };

    // Initial calculation
    updateVisibleLeagues();

    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateVisibleLeagues, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [filteredSports]); // Only depend on filteredSports

  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredSports.map((sport, index) => (
        <button
          key={sport.name}
          onClick={() => navigate(`/sports/${sport.name.toLowerCase()}`)}
          className="p-4 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
            border border-[#8000FF]/20 rounded-xl group hover:border-[#8000FF]/40 
            transition-all duration-300 text-left hover:-translate-y-1
            hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)] relative"
        >
          {/* Popular Badge */}
          {sport.popular && (
            <div className="absolute -top-3 -right-3 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] blur-lg opacity-50" />
                <div className="relative flex flex-col">
                  <div className="px-3 py-1 bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full
                    flex items-center gap-1.5 shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-white animate-pulse" />
                    <span className="text-white text-xs font-bold tracking-wide">POPULAR</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
              group-hover:scale-110 transition-transform text-2xl">
              {sport.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-urbanist font-bold text-white text-lg mb-1 group-hover:text-[#8000FF] 
                transition-colors truncate">
                {sport.name}
              </h3>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#8000FF]" />
                <span className="text-white/60 text-sm">
                  {sport.leagues?.length || 0} Leagues
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#8000FF] 
              group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          {/* Leagues Preview */}
          <div 
            ref={el => leaguesContainerRefs.current[index] = el}
            className="flex flex-wrap gap-2 h-[28px] overflow-hidden"
          >
            {sport.leagues?.slice(0, visibleLeagues[sport.name] || 1).map((league) => (
              <div key={league} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10
                text-white/60 text-xs group-hover:bg-[#8000FF]/10 group-hover:border-[#8000FF]/20 
                transition-all whitespace-nowrap">
                {league}
              </div>
            ))}
            {(sport.leagues?.length || 0) > (visibleLeagues[sport.name] || 1) && (
              <div className="px-2 py-1 rounded-lg bg-[#8000FF]/10 border border-[#8000FF]/20
                text-[#8000FF] text-xs whitespace-nowrap">
                +{(sport.leagues?.length || 0) - (visibleLeagues[sport.name] || 1)} more
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}