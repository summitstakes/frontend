export interface Sport {
  name: string;
  icon: string;
  leagues: string[];
}

export const sportsData: Sport[] = [
  { 
    name: 'Ice Hockey',
    icon: '🏒',
    leagues: ['NHL', 'KHL', 'SHL', 'IIHF']
  },
  { 
    name: 'Basketball',
    icon: '🏀',
    leagues: ['NBA', 'NCAA', 'EuroLeague', 'NBL']
  },
  { 
    name: 'Soccer',
    icon: '⚽',
    leagues: ['EPL', 'LaLiga', 'Serie A', 'Bundesliga', 'Ligue 1', 'MLS', 'Champions League']
  },
  { 
    name: 'American Football',
    icon: '🏈',
    leagues: ['NFL', 'NCAA Football', 'CFL', 'XFL']
  },
  { 
    name: 'Baseball',
    icon: '⚾',
    leagues: ['MLB', 'NPB', 'KBO', 'CPBL']
  },
  { 
    name: 'Tennis',
    icon: '🎾',
    leagues: ['ATP', 'WTA', 'ITF', 'Grand Slams']
  },
  { 
    name: 'MMA',
    icon: '🥊',
    leagues: ['UFC', 'Bellator', 'ONE', 'PFL']
  },
  { 
    name: 'Racing',
    icon: '🏎️',
    leagues: ['F1', 'NASCAR', 'IndyCar', 'MotoGP']
  }
];