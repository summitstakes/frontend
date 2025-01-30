import { Region, Sportsbook } from '../types';

// Sample sportsbook data
const bet365: Sportsbook = {
  id: 'bet365',
  name: 'Bet365',
  logo: 'https://example.com/bet365-logo.png',
  description: 'One of the world\'s leading online gambling companies',
  features: ['Live Streaming', '24/7 Customer Support', 'Early Payouts'],
  rating: 4.8,
  bonus: 'Up to $200 in Bet Credits'
};

const betway: Sportsbook = {
  id: 'betway',
  name: 'Betway',
  logo: 'https://example.com/betway-logo.png',
  description: 'Premium online sports betting experience',
  features: ['Competitive Odds', 'Quick Withdrawals', 'Mobile App'],
  rating: 4.6,
  bonus: '$10 Free Bet'
};

const bodog: Sportsbook = {
  id: 'bodog',
  name: 'Bodog',
  logo: 'https://example.com/bodog-logo.png',
  description: 'Trusted Canadian sportsbook with great odds',
  features: ['Bitcoin Accepted', 'Fast Payouts', 'Live Betting'],
  rating: 4.7,
  bonus: '100% up to $400'
};

// Export regions with sportsbook data
export const regions: Region[] = [
  {
    name: 'North America',
    countries: [
      { 
        name: 'Canada',
        code: 'CA',
        provinces: [
          'Alberta',
          'British Columbia',
          'Ontario',
          'Quebec'
        ],
        sportsbooks: [bet365, betway, bodog]
      },
      { 
        name: 'USA',
        code: 'US',
        states: [
          'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
          'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
          'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
          'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
          'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
          'West Virginia', 'Wisconsin', 'Wyoming'
        ],
        sportsbooks: [bet365, betway]
      },
      { name: 'Mexico', code: 'MX', sportsbooks: [bet365] },
      { name: 'Costa Rica', code: 'CR', sportsbooks: [bet365] }
    ]
  },
  {
    name: 'Europe',
    countries: [
      { name: 'Austria', code: 'AT', sportsbooks: [bet365] },
      { name: 'Belgium', code: 'BE', sportsbooks: [bet365] },
      { name: 'Bosnia', code: 'BA', sportsbooks: [bet365] },
      { name: 'Croatia', code: 'HR', sportsbooks: [bet365] },
      { name: 'Cyprus', code: 'CY', sportsbooks: [bet365] },
      { name: 'Czech Republic', code: 'CZ', sportsbooks: [bet365] },
      { name: 'Denmark', code: 'DK', sportsbooks: [bet365] },
      { name: 'Finland', code: 'FI', sportsbooks: [bet365] },
      { name: 'France', code: 'FR', sportsbooks: [bet365] },
      { name: 'Germany', code: 'DE', sportsbooks: [bet365] },
      { name: 'Greece', code: 'GR', sportsbooks: [bet365] },
      { name: 'Iceland', code: 'IS', sportsbooks: [bet365] },
      { name: 'Ireland', code: 'IE', sportsbooks: [bet365] },
      { name: 'Italy', code: 'IT', sportsbooks: [bet365] },
      { name: 'Luxembourg', code: 'LU', sportsbooks: [bet365] },
      { name: 'Netherlands', code: 'NL', sportsbooks: [bet365] },
      { name: 'Norway', code: 'NO', sportsbooks: [bet365] },
      { name: 'Poland', code: 'PL', sportsbooks: [bet365] },
      { name: 'Portugal', code: 'PT', sportsbooks: [bet365] },
      { name: 'Romania', code: 'RO', sportsbooks: [bet365] },
      { name: 'Serbia', code: 'RS', sportsbooks: [bet365] },
      { name: 'Spain', code: 'ES', sportsbooks: [bet365] },
      { name: 'Sweden', code: 'SE', sportsbooks: [bet365] },
      { name: 'Switzerland', code: 'CH', sportsbooks: [bet365] },
      { name: 'United Kingdom', code: 'GB', sportsbooks: [bet365, betway] }
    ]
  },
  {
    name: 'Asia',
    countries: [
      { name: 'India', code: 'IN', sportsbooks: [bet365] },
      { name: 'Japan', code: 'JP', sportsbooks: [bet365] },
      { name: 'South Korea', code: 'KR', sportsbooks: [bet365] },
      { name: 'Thailand', code: 'TH', sportsbooks: [bet365] }
    ]
  },
  {
    name: 'South America',
    countries: [
      { name: 'Argentina', code: 'AR', sportsbooks: [bet365] },
      { name: 'Brazil', code: 'BR', sportsbooks: [bet365] },
      { name: 'Chile', code: 'CL', sportsbooks: [bet365] },
      { name: 'Colombia', code: 'CO', sportsbooks: [bet365] },
      { name: 'Ecuador', code: 'EC', sportsbooks: [bet365] },
      { name: 'Peru', code: 'PE', sportsbooks: [bet365] },
      { name: 'Venezuela', code: 'VE', sportsbooks: [bet365] }
    ]
  },
  {
    name: 'Africa',
    countries: [
      { name: 'Kenya', code: 'KE', sportsbooks: [bet365] },
      { name: 'Nigeria', code: 'NG', sportsbooks: [bet365] },
      { name: 'South Africa', code: 'ZA', sportsbooks: [bet365] }
    ]
  },
  {
    name: 'Oceania',
    countries: [
      { name: 'Australia', code: 'AU', sportsbooks: [bet365] },
      { name: 'New Zealand', code: 'NZ', sportsbooks: [bet365] }
    ]
  }
];