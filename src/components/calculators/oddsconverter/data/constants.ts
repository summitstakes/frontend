import { OddsFormat } from '../types';

export const oddsFormats: OddsFormat[] = [
  { id: 'decimal', name: 'Decimal (1.50)', example: '1.50' },
  { id: 'american', name: 'American (+150)', example: '+150' },
  { id: 'fractional', name: 'Fractional (1/2)', example: '1/2' }
];