import React, { useState, useEffect } from 'react';
import { Calendar, Search, ChevronRight, Trophy, Clock, Users, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { DayData } from '../graphicview/types';
import { DateGroup } from './types';
import { sportsData } from '../graphicview/mockData';

interface ListViewProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  getDayData: (date: Date) => DayData | undefined;
}

export function ListView({ currentMonth, selectedDate, onDateSelect, getDayData }: ListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([]);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  // Generate date groups
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const next7Days = new Date(today);
    next7Days.setDate(next7Days.getDate() + 7);

    const next30Days = new Date(today);
    next30Days.setDate(next30Days.getDate() + 30);

    const groups: DateGroup[] = [
      { 
        title: 'Today', 
        startDate: today,
        endDate: tomorrow,
        dates: [today]
      },
      {
        title: 'Tomorrow',
        startDate: tomorrow,
        endDate: new Date(tomorrow.getTime() + 86400000),
        dates: [tomorrow]
      },
      {
        title: 'Next 7 Days',
        startDate: new Date(tomorrow.getTime() + 86400000),
        endDate: next7Days,
        dates: Array.from({ length: 5 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() + i + 2);
          return date;
        })
      },
      {
        title: 'Next 30 Days',
        startDate: next7Days,
        endDate: next30Days,
        dates: Array.from({ length: 23 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() + i + 7);
          return date;
        })
      }
    ];

    setDateGroups(groups);
  }, [currentMonth]);

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

  const handleDateClick = (date: Date) => {
    const dateString = date.toISOString();
    setExpandedDate(expandedDate === dateString ? null : dateString);
    onDateSelect(date);
  };

  const renderDateGroup = (group: DateGroup) => {
    return (
      <div key={group.title} className="mb-8 last:mb-0">
        {/* Group Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#8000FF]" />
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white text-xl">{group.title}</h3>
              <p className="text-white/60 text-sm">
                {group.dates.length} {group.dates.length === 1 ? 'day' : 'days'} with events
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#8000FF]/10">
              <Trophy className="w-4 h-4 text-[#8000FF]" />
              <span className="text-[#8000FF] text-sm">
                {group.dates.reduce((acc, date) => {
                  const data = getDayData(date);
                  return acc + (data?.sports || 0);
                }, 0)} Sports
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
              <Clock className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-sm">
                {group.dates.reduce((acc, date) => {
                  const data = getDayData(date);
                  return acc + (data?.matches || 0);
                }, 0)} Matches
              </span>
            </div>
          </div>
        </div>

        {/* Dates in Group */}
        <div className="space-y-3">
          {group.dates.map((date) => {
            const dayData = getDayData(date);
            if (!dayData) return null;

            const isExpanded = expandedDate === date.toISOString();
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={date.toISOString()}
                className={`bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                  border border-[#8000FF]/20 rounded-xl overflow-hidden transition-all duration-300
                  ${isExpanded ? 'shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]' : ''}`}
              >
                {/* Date Header */}
                <button
                  onClick={() => handleDateClick(date)}
                  className="w-full p-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    {/* Date Info */}
                    <div className="w-14 h-14 rounded-xl bg-[#8000FF]/10 flex flex-col items-center 
                      justify-center group-hover:scale-110 transition-transform">
                      <span className="text-[#8000FF] text-sm font-medium">
                        {date.toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-white font-urbanist font-bold text-xl">
                        {date.getDate()}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-urbanist font-bold text-white group-hover:text-[#8000FF] 
                          transition-colors">
                          {date.toLocaleDateString('default', { weekday: 'long' })}
                        </span>
                        {isToday && (
                          <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/20
                            text-emerald-500 text-xs font-medium flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Now
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-4 h-4" />
                          <span>{dayData.sports} Sports</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{dayData.matches} Matches</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center
                    group-hover:bg-[#8000FF]/20 transition-colors">
                    <ChevronRight className={`w-5 h-5 text-[#8000FF] transition-transform duration-300
                      ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                    {/* Sports List */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {sportsData.map((sport, index) => (
                        <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10
                          hover:border-[#8000FF]/20 transition-all group/sport">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                              group-hover/sport:scale-110 transition-transform text-xl">
                              {sport.icon}
                            </div>
                            <div>
                              <div className="font-urbanist font-bold text-white text-sm mb-1">
                                {sport.name}
                              </div>
                              <div className="flex items-center gap-2 text-white/60 text-xs">
                                <Clock className="w-3 h-3" />
                                <span>{sport.matches} matches</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Featured Match */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#8000FF]/10 to-[#8000FF]/5 
                      border border-[#8000FF]/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-[#8000FF]" />
                        <span className="text-[#8000FF] text-sm font-medium">Featured Match</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-urbanist font-bold text-white">TOR vs MTL</span>
                        <div className="px-3 py-1 rounded-lg bg-[#8000FF]/20 text-[#8000FF] text-sm font-medium">
                          +150
                        </div>
                      </div>
                      <button className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold 
                        rounded-lg hover:bg-[#6700CC] transition-all duration-300 flex items-center 
                        justify-center gap-2 group/btn">
                        <span>View Match Details</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Enhanced Search Bar */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
            <Search className="w-5 h-5 text-[#8000FF]" />
          </div>
          <div>
            <h3 className="font-urbanist font-bold text-white text-xl">Search Events</h3>
            <p className="text-white/60 text-sm">Find matches across all sports and leagues</p>
          </div>
        </div>

        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors
            ${isSearching ? 'text-[#8000FF]' : 'text-white/40'}`} />
          <input
            type="text"
            placeholder="Search by team, league, or sport..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[52px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
              text-white placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
              focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Date Groups */}
      <div className="space-y-8">
        {dateGroups.map(renderDateGroup)}
      </div>
    </div>
  );
}