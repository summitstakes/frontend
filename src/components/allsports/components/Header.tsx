import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight, Star, Flame } from 'lucide-react';
import { sports } from '../data/sports';

export function Header() {
  const navigate = useNavigate();
  const popularSports = sports.filter(sport => sport.popular);

  return (
    <div className="pt-[160px] pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-center">
        {/* Left Column - Main Content */}
        <div>
          <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white mb-6 leading-tight
            animate-in slide-in-from-left duration-700">
            Explore Our
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
              animate-gradient relative">
              Sports Coverage
              <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                from-transparent via-[#8000FF] to-transparent opacity-50" />
            </span>
          </h1>
          
          <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl
            animate-in slide-in-from-left duration-700 delay-200">
            Comprehensive coverage across major sports worldwide. Access real-time odds, expert analysis, 
            and betting insights for your favorite sports.
          </p>
        </div>

        {/* Right Column - Popular Sports */}
        <div className="animate-in slide-in-from-right duration-700 delay-300">
          {/* Popular Sports Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#8000FF]" />
              </div>
              <div>
                <h3 className="font-urbanist font-bold text-white text-lg">Popular Sports</h3>
                <p className="text-white/60 text-sm">Most active betting markets</p>
              </div>
            </div>
          </div>

          {/* Popular Sports Cards - Now with fixed heights and better text handling */}
          <div className="grid grid-cols-3 gap-3">
            {popularSports.map((sport) => (
              <button
                key={sport.name}
                onClick={() => navigate(`/sports/${sport.name.toLowerCase()}`)}
                className="group relative bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                  border border-[#8000FF]/20 rounded-xl hover:border-[#8000FF]/40 
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]"
              >
                {/* Fixed height container */}
                <div className="h-[180px] p-4 flex flex-col">
                  {/* Icon Section - Fixed Height */}
                  <div className="h-[48px] mb-3 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center
                      group-hover:scale-110 transition-transform text-2xl">
                      {sport.icon}
                    </div>
                  </div>

                  {/* Title Section - Fixed Height */}
                  <div className="h-[24px] mb-2">
                    <h3 className="font-urbanist font-bold text-white text-base group-hover:text-[#8000FF] 
                      transition-colors line-clamp-1">
                      {sport.name}
                    </h3>
                  </div>

                  {/* Stats Section - Fixed Height */}
                  <div className="h-[20px] mb-3 flex items-center justify-center">
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-[#8000FF] shrink-0" />
                      <span className="text-white/60 text-xs whitespace-nowrap">
                        {sport.leagues?.length || 0} Leagues
                      </span>
                    </div>
                  </div>

                  {/* Button Section - Fixed Height */}
                  <div className="h-[32px] mt-auto">
                    <div className="h-full bg-[#8000FF]/10 rounded-lg flex items-center justify-center gap-1.5
                      group-hover:bg-[#8000FF] transition-colors">
                      <span className="text-[#8000FF] text-xs font-medium group-hover:text-white transition-colors">
                        View Sport
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8000FF] group-hover:text-white 
                        group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}