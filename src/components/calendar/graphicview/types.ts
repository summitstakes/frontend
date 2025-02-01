import { ReactNode } from 'react';

export interface DayData {
  sports: number;
  matches: number;
}

export interface Sport {
  name: string;
  icon: string;
  leagues: string[];
  matches: number;
}

export interface CalendarDayProps {
  day: number;
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  dayData?: DayData;
  onSelect: (date: Date) => void;
}

export interface EventsSidebarProps {
  selectedDate: Date;
  dayData?: DayData;
}

export interface SportItemProps {
  sport: Sport;
  isExpanded: boolean;
  searchQuery: string;
  onSportClick: (sportName: string) => void;
  onLeagueClick: (league: string) => void;
}