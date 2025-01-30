import { BookOpen, Trophy, HelpCircle, MessageSquare, Calculator, Sigma, ArrowLeftRight } from 'lucide-react';
import { MenuItem, Language } from './types';

export const menuItems: MenuItem[] = [
  { 
    name: 'Tools', 
    hasDropdown: true,
    path: '/tools',
    dropdownItems: [
      { name: 'Arbitrage', icon: <ArrowLeftRight className="w-5 h-5 text-[#8000FF]" /> },
      { name: 'EV', icon: <Sigma className="w-5 h-5 text-[#8000FF]" /> },
      { name: 'Calculators', icon: <Calculator className="w-5 h-5 text-[#8000FF]" />, path: '/calculators' },
      { name: 'All Tools', icon: '🛠️', path: '/tools' }
    ]
  },
  { 
    name: 'Sports', 
    hasDropdown: true,
    path: '/sports',
    dropdownItems: [
      { name: 'Ice Hockey', icon: '🏒', path: '/sports' },
      { name: 'American Football', icon: '🏈', path: '/sports' },
      { name: 'Basketball', icon: '🏀', path: '/sports' },
      { name: 'Calendar', icon: '📅', path: '/calendar' },
      { name: 'All Sports', icon: '🎯', path: '/sports' }
    ]
  },
  { name: 'Bet Tracker', hasDropdown: false, path: '/bettracker' },
  { name: 'Pro Insights', hasDropdown: false, path: '/proinsights' },
  { 
    name: 'Resources', 
    hasDropdown: true,
    dropdownItems: [
      { name: 'Betting101', icon: <BookOpen className="w-5 h-5 text-[#8000FF]" /> },
      { name: 'Asian Handicap Guide', icon: <Trophy className="w-5 h-5 text-[#8000FF]" />, isTemp: true },
      { name: 'Sportsbook Coverage', icon: <Trophy className="w-5 h-5 text-[#8000FF]" />, path: '/sportsbooks' },
      { name: 'FAQ', icon: <HelpCircle className="w-5 h-5 text-[#8000FF]" />, path: '/faq' },
      { name: 'Contact Us', icon: <MessageSquare className="w-5 h-5 text-[#8000FF]" />, path: '/contactus' }
    ]
  }
];

export const languages: Language[] = [
  { code: 'EN', name: 'English', region: 'Popular' },
  { code: 'FR', name: 'Français', region: 'Popular' },
  { code: 'ES', name: 'Español', region: 'Popular' },
  { code: 'DE', name: 'Deutsch', region: 'Europe' },
  { code: 'IT', name: 'Italiano', region: 'Europe' },
  { code: 'PT', name: 'Português', region: 'Europe' },
  { code: 'NL', name: 'Nederlands', region: 'Europe' },
  { code: 'RU', name: 'Русский', region: 'Europe' },
  { code: 'ZH', name: '中文', region: 'Asia' },
  { code: 'JA', name: '日本語', region: 'Asia' },
  { code: 'KO', name: '한국어', region: 'Asia' },
  { code: 'HI', name: 'हिन्दी', region: 'Asia' }
];

export const buttonClasses = {
  common: `
    h-[42px] w-[140px] font-urbanist text-[15px] font-bold rounded-xl
    transition-all duration-300 flex items-center justify-center gap-2
    shrink-0 relative overflow-hidden
  `,
  primary: `
    bg-[#8000FF] text-white hover:bg-[#6700CC]
    hover:shadow-[0_0_20px_rgba(128,0,255,0.3)]
  `,
  secondary: `
    bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02]
    border border-[#8000FF]/20 hover:border-[#8000FF]/40
    text-white hover:text-[#8000FF]
  `
};