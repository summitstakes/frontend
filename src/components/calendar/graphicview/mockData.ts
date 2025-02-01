import { DayData, Sport } from './types';

// Mock calendar data
export const mockCalendarData: { [key: string]: DayData } = {
  '2025-01-15': { sports: 5, matches: 23 },
  '2025-01-16': { sports: 3, matches: 15 },
  '2025-01-17': { sports: 4, matches: 18 },
  '2025-01-18': { sports: 6, matches: 28 },
  '2025-01-19': { sports: 4, matches: 20 },
};

// Mock sports data
export const sportsData: Sport[] = [
  {
    name: 'Ice Hockey',
    icon: '🏒',
    leagues: ['NHL', 'KHL', 'SHL', 'IIHF'],
    matches: 8
  },
  {
    name: 'Basketball',
    icon: '🏀',
    leagues: ['NBA', 'EuroLeague', 'NCAA', 'NBL'],
    matches: 12
  },
  {
    name: 'Soccer',
    icon: '⚽',
    leagues: ['EPL', 'LaLiga', 'Serie A', 'Bundesliga', 'Ligue 1', 'MLS'],
    matches: 15
  },
  {
    name: 'American Football',
    icon: '🏈',
    leagues: ['NFL', 'NCAA Football', 'CFL'],
    matches: 6
  },
  {
    name: 'Baseball',
    icon: '🏒',
    leagues: ['MLB', 'KBO', 'NPB'],
    matches: 11
  }
];