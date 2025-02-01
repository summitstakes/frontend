import React, { useState } from 'react';
import { LayoutGrid, List, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { GraphicView } from './graphicview';
import { ListViewWrapper } from './listview';

export function CalendarPage() {
  const [view, setView] = useState<'graphic' | 'list'>('graphic');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  return (
    <div className="min-h-screen bg-[#06060C] pb-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Enhanced Header Section */}
        <div className="pt-24 pb-12">
          <h2 className="text-4xl sm:text-5xl font-urbanist font-extrabold text-white mb-6 leading-tight
            animate-in slide-in-from-left duration-700 delay-100">
            <span className="text-white">Sports </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
              animate-gradient relative">
              Calendar
              <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                from-transparent via-[#8000FF] to-transparent opacity-50" />
            </span>
          </h2>
          
          <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl
            animate-in slide-in-from-left duration-700 delay-200">
            Stay ahead of the game with our comprehensive sports calendar. Track upcoming matches, 
            tournaments, and betting opportunities across all major sports and leagues worldwide.
          </p>
        </div>

        {/* Calendar Controls */}
        <div className="flex items-center justify-between mb-8">
          {/* Month Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button
                onClick={handlePrevMonth}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
                  hover:bg-white/10 transition-all cursor-pointer hover:border-[#8000FF]/40 group"
              >
                <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>
              <h2 className="text-2xl font-urbanist font-bold text-white w-[200px] text-center mx-4">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={handleNextMonth}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
                  hover:bg-white/10 transition-all cursor-pointer hover:border-[#8000FF]/40 group"
              >
                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Today Button */}
            <button
              onClick={handleTodayClick}
              className="h-10 px-4 rounded-lg bg-[#8000FF]/10 border border-[#8000FF]/20 
                hover:bg-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all flex items-center gap-2
                hover:scale-105"
            >
              <CalendarIcon className="w-4 h-4 text-[#8000FF]" />
              <span className="text-[#8000FF] font-medium">Today</span>
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={() => setView('graphic')}
              className={`h-[38px] px-4 rounded-lg flex items-center gap-2 transition-all
                ${view === 'graphic'
                  ? 'bg-[#8000FF] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm font-medium">Graphic</span>
            </button>
            <button
              onClick={() => setView('list')}
              className={`h-[38px] px-4 rounded-lg flex items-center gap-2 transition-all
                ${view === 'list'
                  ? 'bg-[#8000FF] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">List</span>
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {view === 'graphic' ? (
          <GraphicView 
            currentMonth={currentMonth} 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        ) : (
          <ListViewWrapper
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        )}
      </div>
    </div>
  );
}