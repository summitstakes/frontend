import React from 'react';
import { CalendarGrid } from './CalendarGrid';
import { EventsSidebar } from './EventsSidebar';
import { mockCalendarData } from './mockData';
import { DayData } from './types';

interface GraphicViewProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function GraphicView({ currentMonth, selectedDate, onDateSelect }: GraphicViewProps) {
  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayData = (date: Date): DayData | undefined => {
    const key = formatDateKey(date);
    return mockCalendarData[key];
  };

  return (
    <div className="grid grid-cols-[1fr_400px] gap-8">
      {/* Calendar Grid */}
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />

      {/* Events Sidebar */}
      <EventsSidebar
        selectedDate={selectedDate}
        dayData={getDayData(selectedDate)}
      />
    </div>
  );
}