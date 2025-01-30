import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ArrowLeftRight, Calculator, Gift, Percent } from 'lucide-react';

const calculatorTabs = [
  { 
    path: '/calculators/arbitrage',
    name: 'Arbitrage',
    icon: <ArrowLeftRight className="w-4 h-4" />
  },
  { 
    path: '/calculators/free-bet',
    name: 'Free Bet',
    icon: <Gift className="w-4 h-4" />
  },
  { 
    path: '/calculators/odds-converter',
    name: 'Odds Converter',
    icon: <Calculator className="w-4 h-4" />
  },
  { 
    path: '/calculators/vig',
    name: 'Vig Calculator',
    icon: <Percent className="w-4 h-4" />
  }
];

export function CalculatorLayout() {
  return (
    <div className="min-h-screen bg-[#06060C] py-12">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Enhanced Calculator Tabs */}
        <div className="bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20 
          rounded-xl p-2 inline-flex items-center gap-2 mb-8">
          {calculatorTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => `
                h-[42px] px-4 rounded-lg flex items-center gap-2 transition-all duration-300
                ${isActive 
                  ? 'bg-[#8000FF] text-white shadow-lg' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              {tab.icon}
              <span className="font-urbanist font-bold text-sm">{tab.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Calculator Content */}
        <Outlet />
      </div>
    </div>
  );
}