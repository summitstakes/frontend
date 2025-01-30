import { OddsFormat, Currency } from '../types';

export const oddsFormats: OddsFormat[] = [
  { id: 'decimal', name: 'Decimal (1.50)', example: '1.50' },
  { id: 'american', name: 'American (+150)', example: '+150' },
  { id: 'fractional', name: 'Fractional (1/2)', example: '1/2' }
];

export const currencies: Currency[] = [
  { symbol: '$', name: 'USD' },
  { symbol: '€', name: 'EUR' },
  { symbol: '£', name: 'GBP' },
  { symbol: 'C$', name: 'CAD' },
  { symbol: 'A$', name: 'AUD' }
];