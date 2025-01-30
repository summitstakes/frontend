import React from 'react';
import { ChevronDown, Trophy, ArrowRight } from 'lucide-react';
import { SportItemProps } from './types';

export function SportItem({ 
  sport, 
  isExpanded, 
  searchQuery, 
  onSportClick, 
  onLeagueClick 
}: SportItemProps) {
  return (
    <div>
      {/* Sport Header - More compact with matches on same line */}
      <button
        onClick={() => onSportClick(sport.name)}
        className="w-full p-3 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
          border border-[#8000FF]/20 rounded-xl hover:border-[#8000FF]/40 transition-all 
          group flex items-center gap-3"
      >
        {/* Sport Icon */}
        <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
          group-hover:scale-110 transition-transform text-xl shrink-0">
          {sport.icon}
        </div>

        {/* Sport Name and Matches */}
        <div className="flex-1 flex items-center justify-between min-w-0">
          <span className="font-urbanist font-bold text-white group-hover:text-[#8000FF] 
            transition-colors text-sm truncate">
            {sport.name}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/60">{sport.matches} matches</span>
            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 shrink-0
              ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      {/* Leagues Dropdown */}
      {isExpanded && (
        <div className="mt-2 pl-11 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          {sport.leagues
            .filter(league => 
              league.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((league) => (
              <button
                key={league}
                onClick={() => onLeagueClick(league)}
                className="w-full p-2 rounded-lg bg-white/5 border border-white/10
                  hover:bg-[#8000FF]/10 hover:border-[#8000FF]/20 transition-all
                  flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#8000FF]" />
                  <span className="text-white/80 group-hover:text-white transition-colors text-sm">
                    {league}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#8000FF] 
                  group-hover:translate-x-1 transition-all" />
              </button>
            ))}
        </div>
      )}
    </div>
  );
}