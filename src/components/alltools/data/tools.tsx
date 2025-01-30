import { ReactNode } from 'react';
import { ArrowLeftRight, Sigma, Calculator, Gift, Target, Trophy, LineChart, Clock, Star } from 'lucide-react';

export const premiumTools = [
  {
    id: 'arbitrage',
    name: 'Arbitrage Scanner',
    description: 'Real-time scanning across 20+ sportsbooks to find guaranteed profit opportunities with instant alerts and automated calculations.',
    icon: <ArrowLeftRight className="w-6 h-6" />,
    path: '/tools/arbitrage',
    popular: true,
    stat: '50K+ Scans Daily'
  },
  {
    id: 'ev',
    name: '+EV Calculator',
    description: 'Advanced algorithm that identifies +EV bets using real-time line movement, market analysis, and historical data.',
    icon: <Sigma className="w-6 h-6" />,
    stat: '95% Accuracy Rate'
  },
  {
    id: 'free-bet',
    name: 'Bonus Optimizer',
    description: 'Maximize your bonus conversions with our advanced calculator that finds the highest possible conversion rates across all markets.',
    icon: <Gift className="w-6 h-6" />,
    stat: '85% Avg. Conversion'
  },
  {
    id: 'low-hold',
    name: 'Low Hold Finder',
    description: 'Automated scanning for low-hold opportunities perfect for bonus rollovers and moving funds between sportsbooks.',
    icon: <Target className="w-6 h-6" />,
    stat: '1000+ Daily Matches'
  },
  {
    id: 'middles',
    name: 'Middles Scanner',
    description: 'Find profitable middle opportunities across all major sports with real-time odds monitoring and instant alerts.',
    icon: <ArrowLeftRight className="w-6 h-6" />,
    stat: '24/7 Live Scanning'
  }
];

export const freeTools = [
  {
    id: 'calculators',
    name: 'Betting Calculators',
    description: 'Essential calculators for odds conversion, arbitrage, and more',
    icon: <Calculator className="w-6 h-6 text-emerald-500" />,
    path: '/calculators'
  },
  {
    id: 'sports-data',
    name: 'Sports Data',
    description: 'Live scores, statistics, and historical data across all sports',
    icon: <LineChart className="w-6 h-6 text-emerald-500" />,
    path: '/sports'
  },
  {
    id: 'bet-tracker',
    name: 'Bet Tracker',
    description: 'Track your bets and analyze your betting performance',
    icon: <Clock className="w-6 h-6 text-emerald-500" />,
    path: '/bettracker'
  },
  {
    id: 'pro-insights',
    name: 'Pro Insights',
    description: 'Expert analysis and predictions from professional bettors',
    icon: <Star className="w-6 h-6 text-emerald-500" />,
    path: '/proinsights'
  }
];