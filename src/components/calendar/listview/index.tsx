import React from 'react';
import { ListView } from './ListView';
import { mockCalendarData } from '../graphicview/mockData';
import { DayData } from '../graphicview/types';

interface ListViewWrapperProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function ListViewWrapper({ currentMonth, selectedDate, onDateSelect }: ListViewWrapperProps) {
  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayData = (date: Date): DayData | undefined => {
    const key = formatDateKey(date);
    return mockCalendarData[key];
  };

  return (
    <div className="grid grid-cols-[1fr_400px] gap-8">
      <ListView
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        getDayData={getDayData}
      />
      
      {/* Events Sidebar */}
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
        </div>
        <h3 className="text-xl font-urbanist font-bold text-white mb-2">Loading Events</h3>
        <p className="text-white/60">Please wait while we fetch the events for this date</p>
      </div>
    </div>
  );
}