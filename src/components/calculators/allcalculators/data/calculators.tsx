import { ArrowLeftRight, Calculator, Gift, Percent } from 'lucide-react';
import { Calculator as CalculatorType } from '../types';

export const calculators: CalculatorType[] = [
  {
    id: 'arbitrage',
    name: 'Arbitrage Calculator',
    description: 'Find and capitalize on arbitrage opportunities across different sportsbooks',
    icon: <ArrowLeftRight className="w-6 h-6" />,
    path: '/calculators/arbitrage',
    popular: true,
    stat: '50K+ Calculations',
    color: 'from-[#8000FF] to-[#A855F7]',
    features: ['Cross-book scanning', 'Auto stake calculation', 'Real-time updates']
  },
  {
    id: 'free-bet',
    name: 'Free Bet Calculator',
    description: 'Optimize your bonus bets and free credits for maximum value',
    icon: <Gift className="w-6 h-6" />,
    path: '/calculators/free-bet',
    stat: '70-80% Conversion',
    color: 'from-[#FF3366] to-[#FF6B6B]',
    features: ['Bonus optimization', 'Exchange commission', 'Profit tracking']
  },
  {
    id: 'odds-converter',
    name: 'Odds Converter',
    description: 'Convert between American, Decimal, and Fractional formats',
    icon: <Calculator className="w-6 h-6" />,
    path: '/calculators/odds-converter',
    stat: '100% Accuracy',
    color: 'from-[#00B4DB] to-[#0083B0]',
    features: ['All major formats', 'Implied probability', 'Bulk conversion']
  },
  {
    id: 'vig-calculator',
    name: 'Vig Calculator',
    description: 'Calculate true implied probability and house edge',
    icon: <Percent className="w-6 h-6" />,
    path: '/calculators/vig',
    stat: 'All Markets',
    color: 'from-[#56CCF2] to-[#2F80ED]',
    features: ['True probability', 'Market analysis', 'Fair odds value']
  }
];