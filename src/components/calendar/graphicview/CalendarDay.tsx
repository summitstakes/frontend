import React from 'react';
import { Trophy, ChevronRight, Clock } from 'lucide-react';
import { CalendarDayProps } from './types';

export function CalendarDay({ 
  day, 
  date, 
  isToday, 
  isSelected, 
  dayData, 
  onSelect 
}: CalendarDayProps) {
  // Check if it's a weekend
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  
  // Check if it's the first day of the month
  const isFirstDay = date.getDate() === 1;

  return (
    <div className="relative">
      {/* Today Indicator - Moved outside button */}
      {isToday && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 
          bg-emerald-500 rounded-full text-xs text-white font-medium shadow-lg
          flex items-center gap-1.5 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>Today</span>
        </div>
      )}

      {/* First Day of Month Badge - Moved outside button */}
      {isFirstDay && !isToday && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 
          bg-[#8000FF] rounded-full text-xs text-white font-medium shadow-lg z-20">
          {date.toLocaleString('default', { month: 'short' })}
        </div>
      )}

      <button
        onClick={() => onSelect(date)}
        className={`h-[120px] p-4 rounded-xl border transition-all relative group overflow-hidden w-full
          ${isSelected
            ? 'bg-gradient-to-br from-[#8000FF]/30 to-[#8000FF]/10 border-[#8000FF] shadow-[0_0_20px_rgba(128,0,255,0.2)]'
            : isToday
              ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-emerald-500'
              : isWeekend
                ? 'bg-gradient-to-br from-white/8 to-[#8000FF]/[0.02] border-[#8000FF]/20 hover:border-[#8000FF]/40'
                : 'bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border-[#8000FF]/20 hover:border-[#8000FF]/40'
          }`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8000FF]/20 
            to-transparent blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#8000FF]/20 
            to-transparent blur-2xl" />
        </div>

        {/* Content Container */}
        <div className="relative z-[1] h-full flex flex-col">
          {/* Top Row - Day Number and Indicators */}
          <div className="flex items-center justify-between mb-4">
            <div className={`text-lg font-urbanist font-bold ${
              isToday 
                ? 'text-emerald-500'
                : isSelected 
                  ? 'text-[#8000FF]' 
                  : isWeekend
                    ? 'text-white/80'
                    : 'text-white'
            }`}>
              {day}
            </div>

            {/* Arrow Indicator - Show always except when selected */}
            {!isSelected && (
              <div className={`w-6 h-6 rounded-full
                ${isToday
                  ? 'bg-emerald-500/20'
                  : 'bg-[#8000FF]/20'
                } flex items-center justify-center
                group-hover:scale-110 transition-transform duration-300`}>
                <ChevronRight className={`w-4 h-4 ${
                  isToday
                    ? 'text-emerald-500'
                    : 'text-[#8000FF]'
                }`} />
              </div>
            )}
          </div>

          {/* Event Stats */}
          {dayData ? (
            <div className="flex flex-col justify-between flex-1">
              {/* Sports Count */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className={`w-4 h-4 ${isToday ? 'text-emerald-500' : 'text-[#8000FF]'}`} />
                  <span className="text-sm text-white/80">Sports</span>
                </div>
                <span className={`text-sm font-medium ${
                  isToday ? 'text-emerald-500' : 'text-[#8000FF]'
                }`}>
                  {dayData.sports}
                </span>
              </div>

              {/* Games Count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${isToday ? 'text-emerald-500' : 'text-[#8000FF]'}`} />
                  <span className="text-sm text-white/80">Games</span>
                </div>
                <span className={`text-sm font-medium ${
                  isToday ? 'text-emerald-500' : 'text-[#8000FF]'
                }`}>
                  {dayData.matches}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <span className="text-sm text-white/40">No events</span>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

        {/* Today's Pulsing Ring */}
        {isToday && (
          <div className="absolute inset-0 rounded-xl border-2 border-emerald-500 
            animate-pulse opacity-30" />
        )}
      </button>
    </div>
  );
}