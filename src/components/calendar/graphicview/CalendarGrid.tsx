import React from 'react';
import { CalendarDay } from './CalendarDay';
import { mockCalendarData } from './mockData';
import { DayData } from './types';

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function CalendarGrid({ currentMonth, selectedDate, onDateSelect }: CalendarGridProps) {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayData = (date: Date): DayData | undefined => {
    const key = formatDateKey(date);
    return mockCalendarData[key];
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className="h-[120px] bg-gradient-to-br from-white/2 to-transparent 
            border border-white/5 rounded-xl"
        />
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = today.toDateString() === date.toDateString();
      const dayData = getDayData(date);
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <CalendarDay
          key={day}
          day={day}
          date={date}
          isToday={isToday}
          isSelected={isSelected}
          dayData={dayData}
          onSelect={onDateSelect}
        />
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Weekday Headers */}
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div 
            key={day} 
            className={`h-10 flex items-center justify-center rounded-lg
              ${index === 0 || index === 6 
                ? 'bg-[#8000FF]/10 text-[#8000FF]' 
                : 'bg-white/5 text-white/60'
              }`}
          >
            <span className="text-sm font-urbanist font-bold">{day}</span>
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-4">
        {renderCalendar()}
      </div>
    </div>
  );
}