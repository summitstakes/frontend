interface League {
  name: string;
}

export interface Sport {
  name: string;
  icon: string;
  activeGames: number;
  totalBets: string;
  topLeagues: string[];
  trendingOdds: string;
  trendingMatch: string;
}

export const sportsData: Sport[] = [
  {
    name: 'Ice Hockey',
    icon: '🏒',
    activeGames: 12,
    totalBets: '2.5K',
    topLeagues: ['NHL', 'KHL', 'SHL'],
    trendingOdds: '+150',
    trendingMatch: 'TOR vs MTL'
  },
  {
    name: 'Basketball',
    icon: '🏀',
    activeGames: 28,
    totalBets: '5.2K',
    topLeagues: ['NBA', 'EuroLeague', 'NCAA'],
    trendingOdds: '-110',
    trendingMatch: 'LAL vs GSW'
  },
  {
    name: 'Soccer',
    icon: '⚽',
    activeGames: 45,
    totalBets: '8.7K',
    topLeagues: ['EPL', 'LaLiga', 'UCL'],
    trendingOdds: '+180',
    trendingMatch: 'MCI vs ARS'
  },
  {
    name: 'American Football',
    icon: '🏈',
    activeGames: 16,
    totalBets: '4.1K',
    topLeagues: ['NFL', 'NCAAF', 'CFL'],
    trendingOdds: '-120',
    trendingMatch: 'KC vs SF'
  },
  {
    name: 'Baseball',
    icon: '⚾',
    activeGames: 22,
    totalBets: '3.8K',
    topLeagues: ['MLB', 'NPB', 'KBO'],
    trendingOdds: '+130',
    trendingMatch: 'NYY vs BOS'
  },
  {
    name: 'Tennis',
    icon: '🎾',
    activeGames: 34,
    totalBets: '2.9K',
    topLeagues: ['ATP', 'WTA', 'ITF'],
    trendingOdds: '-140',
    trendingMatch: 'Djokovic vs Alcaraz'
  }
];