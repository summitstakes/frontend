import React from 'react';
import { FormData, Currency, OddsFormat, ResultsData, ValidationErrors } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface BetFormProps {
  formData: FormData;
  currency: Currency;
  oddsFormat: OddsFormat;
  errors: ValidationErrors;
  results: ResultsData | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BetForm({ 
  formData, 
  currency, 
  oddsFormat, 
  errors,
  results,
  onInputChange 
}: BetFormProps) {
  // Calculate padding based on currency symbol length
  const getSymbolPadding = (symbol: string) => {
    const baseWidth = 8; // Base character width in pixels
    const symbolWidth = symbol.length * baseWidth;
    return `${symbolWidth + 16}px`; // Add 16px for spacing
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Bet 1 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-urbanist font-bold text-white">Bet 1</h4>
          <div className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-medium">
            Recommended
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Odds</label>
            <div className="relative">
              <input
                type="text"
                name="odds1"
                value={formData.odds1}
                onChange={onInputChange}
                placeholder={oddsFormat.example}
                className={`w-full h-[42px] bg-white/5 border rounded-lg px-4
                  text-white placeholder:text-white/20 focus:outline-none focus:ring-1
                  transition-all ${errors.odds1 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                    : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
                  }`}
              />
              {errors.odds1 && (
                <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
                  {errors.odds1}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Stake</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 select-none">
                {currency.symbol}
              </div>
              <input
                type="text"
                name="stake1"
                value={formData.stake1}
                onChange={onInputChange}
                placeholder="0.00"
                style={{ paddingLeft: getSymbolPadding(currency.symbol) }}
                className={`w-full h-[42px] bg-white/5 border rounded-lg pr-4
                  text-white placeholder:text-white/20 focus:outline-none focus:ring-1
                  transition-all ${errors.stake1
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                    : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
                  }`}
              />
              {errors.stake1 && (
                <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
                  {errors.stake1}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-white/60">Potential Return</span>
            <span className="text-white font-urbanist font-bold">
              {results ? formatCurrency(results.potentialReturn1, currency.symbol) : `${currency.symbol}0.00`}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Implied Probability</span>
            <span className="text-white font-urbanist font-bold">
              {results ? formatPercentage(results.impliedProb1) : '0.00%'}
            </span>
          </div>
        </div>
      </div>

      {/* Bet 2 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-urbanist font-bold text-white">Bet 2</h4>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Odds</label>
            <div className="relative">
              <input
                type="text"
                name="odds2"
                value={formData.odds2}
                onChange={onInputChange}
                placeholder={oddsFormat.example}
                className={`w-full h-[42px] bg-white/5 border rounded-lg px-4
                  text-white placeholder:text-white/20 focus:outline-none focus:ring-1
                  transition-all ${errors.odds2
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                    : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
                  }`}
              />
              {errors.odds2 && (
                <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
                  {errors.odds2}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Optimal Stake</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 select-none">
                {currency.symbol}
              </div>
              <input
                type="text"
                value={results ? results.optimalStake2.toFixed(2) : ''}
                readOnly
                style={{ paddingLeft: getSymbolPadding(currency.symbol) }}
                className="w-full h-[42px] bg-white/5 border border-white/10 rounded-lg pr-4
                  text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                  focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                placeholder="Calculated automatically"
              />
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-white/60">Potential Return</span>
            <span className="text-white font-urbanist font-bold">
              {results ? formatCurrency(results.potentialReturn2, currency.symbol) : `${currency.symbol}0.00`}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Implied Probability</span>
            <span className="text-white font-urbanist font-bold">
              {results ? formatPercentage(results.impliedProb2) : '0.00%'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}