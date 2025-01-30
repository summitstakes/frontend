import React from 'react';
import { Timer, Trophy, ArrowRight } from 'lucide-react';

// Sport name mapping
const sportIcons: { [key: string]: string } = {
  'NBA': '🏀',
  'NHL': '🏒',
  'EPL': '⚽',
  'LaLiga': '⚽',
  'UCL': '⚽',
};

const sportNames: { [key: string]: string } = {
  'NBA': 'Basketball',
  'NHL': 'Hockey',
  'EPL': 'Soccer',
  'LaLiga': 'Soccer',
  'UCL': 'Soccer',
};

// Function to generate game time based on sport
function generateGameTime(league: string): string {
  switch (league) {
    case 'NBA':
      const quarter = Math.floor(Math.random() * 4) + 1;
      const minutes = Math.floor(Math.random() * 12);
      return `${quarter}th - ${minutes}:00`;
    case 'NHL':
      const period = Math.floor(Math.random() * 3) + 1;
      return `${period}rd - ${Math.floor(Math.random() * 20)}:00`;
    case 'EPL':
    case 'LaLiga':
    case 'UCL':
      const half = Math.floor(Math.random() * 2) + 1;
      return half === 1 ? 
        `1st - ${Math.floor(Math.random() * 45)}\'` :
        `2nd - ${Math.floor(Math.random() * 45 + 45)}\'`;
    default:
      return '1st - 00:00';
  }
}

// Function to generate realistic odds pairs
function generateOddsPair() {
  const isFavorite = Math.random() > 0.5;
  if (isFavorite) {
    const favoriteOdds = -Math.floor(Math.random() * 200 + 110);
    const underdogOdds = Math.floor(Math.random() * 200 + 150);
    return {
      homeOdds: favoriteOdds,
      awayOdds: `+${underdogOdds}`
    };
  } else {
    const favoriteOdds = -Math.floor(Math.random() * 200 + 110);
    const underdogOdds = Math.floor(Math.random() * 200 + 150);
    return {
      homeOdds: `+${underdogOdds}`,
      awayOdds: favoriteOdds
    };
  }
}

export function LiveScores() {
  const liveGames = [...Array.from({ length: 25 })].map((_, index) => {
    const odds = generateOddsPair();
    const league = ['NBA', 'NHL', 'EPL', 'LaLiga', 'UCL'][Math.floor(Math.random() * 5)];
    const homeScore = Math.floor(Math.random() * 5);
    const awayScore = Math.floor(Math.random() * 5);
    const time = generateGameTime(league);
    
    return {
      id: index + 1,
      league,
      homeTeam: 'Toronto Maple Leafs',
      awayTeam: 'Montreal Canadiens',
      homeScore,
      awayScore,
      time,
      homeOdds: odds.homeOdds,
      awayOdds: odds.awayOdds
    };
  });

  const content = [...liveGames, ...liveGames];

  return (
    <div className="relative h-full overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#06060C] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06060C] to-transparent z-10 pointer-events-none" />
      
      <div className="animate-scroll-x flex h-full items-center py-2" style={{ width: `${content.length * 286}px` }}>
        {content.map((game, index) => (
          <div 
            key={`${game.id}-${index}`}
            className="flex-none w-[280px] h-[110px] mx-3 rounded-xl bg-gradient-to-br from-[#1A1527]/95 to-[#120D1D]/95 backdrop-blur-sm border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_15px_rgba(128,0,255,0.15)] hover:-translate-y-0.5"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            <div className="flex flex-col h-full py-3 px-4">
              {/* Header with Sport, League, and Live Time */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="flex items-center shrink-0">
                    <span className="text-sm">{sportIcons[game.league]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="text-[11px] font-medium text-white/60 truncate">{sportNames[game.league]}</span>
                    <div className="w-[1px] h-2.5 bg-white/10 shrink-0" />
                    <div className="flex items-center gap-1 shrink-0">
                      <Trophy className="w-3 h-3 text-emerald-500" />
                      <span className="text-[11px] font-medium text-emerald-500">{game.league}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <Timer className="w-3 h-3 text-emerald-500" />
                  <span className="text-[11px] font-medium text-emerald-500">{game.time}</span>
                </div>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="font-urbanist font-bold text-[13px] text-white group-hover:text-[#8000FF] transition-colors truncate">
                        {game.homeTeam}
                      </span>
                      <span className="text-[11px] font-medium text-white/60 shrink-0">
                        {game.homeOdds}
                      </span>
                    </div>
                    <span className="font-urbanist font-bold text-[#8000FF] shrink-0">
                      {game.homeScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="font-urbanist font-bold text-[13px] text-white group-hover:text-[#8000FF] transition-colors truncate">
                        {game.awayTeam}
                      </span>
                      <span className="text-[11px] font-medium text-white/60 shrink-0">
                        {game.awayOdds}
                      </span>
                    </div>
                    <span className="font-urbanist font-bold text-[#8000FF] shrink-0">
                      {game.awayScore}
                    </span>
                  </div>
                </div>

                {/* View Game Button */}
                <div className="w-[1px] h-[40px] bg-gradient-to-b from-transparent via-white/10 to-transparent mx-3 shrink-0" />
                <button 
                  className="flex flex-col items-center justify-center px-2 py-1 rounded-lg 
                    bg-[#8000FF]/10 hover:bg-[#8000FF]/20 transition-all duration-300 group/btn shrink-0"
                >
                  <span className="text-[10px] font-medium text-[#8000FF] mb-0.5">View</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8000FF] group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}