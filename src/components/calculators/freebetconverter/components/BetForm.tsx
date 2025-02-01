import React from 'react';
import { FormData, Currency, OddsFormat, ResultsData, ValidationErrors } from '../types';
import { formatCurrency } from '../utils/calculations';

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
    <div className="space-y-6">
      {/* Free Bet Amount */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white/60">Free Bet Amount</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 select-none">
            {currency.symbol}
          </div>
          <input
            type="text"
            name="freeBetAmount"
            value={formData.freeBetAmount}
            onChange={onInputChange}
            placeholder="0.00"
            style={{ paddingLeft: getSymbolPadding(currency.symbol) }}
            className={`w-full h-[42px] bg-white/5 border rounded-lg pr-4
              text-white placeholder:text-white/20 focus:outline-none focus:ring-1
              transition-all ${errors.freeBetAmount
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
              }`}
          />
          {errors.freeBetAmount && (
            <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
              {errors.freeBetAmount}
            </span>
          )}
        </div>
      </div>

      {/* Back Odds */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white/60">Back Odds (Bookmaker)</label>
        <div className="relative">
          <input
            type="text"
            name="backOdds"
            value={formData.backOdds}
            onChange={onInputChange}
            placeholder={oddsFormat.example}
            className={`w-full h-[42px] bg-white/5 border rounded-lg px-4
              text-white placeholder:text-white/20 focus:outline-none focus:ring-1
              transition-all ${errors.backOdds
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
              }`}
          />
          {errors.backOdds && (
            <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
              {errors.backOdds}
            </span>
          )}
        </div>
      </div>

      {/* Lay Odds */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white/60">Lay Odds (Exchange)</label>
        <div className="relative">
          <input
            type="text"
            name="layOdds"
            value={formData.layOdds}
            onChange={onInputChange}
            placeholder={oddsFormat.example}
            className={`w-full h-[42px] bg-white/5 border rounded-lg px-4
              text-white placeholder:text-white/20 focus:outline-none focus:ring-1
              transition-all ${errors.layOdds
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
              }`}
          />
          {errors.layOdds && (
            <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
              {errors.layOdds}
            </span>
          )}
        </div>
      </div>

      {/* Exchange Commission */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white/60">Exchange Commission (%)</label>
        <div className="relative">
          <input
            type="text"
            name="commission"
            value={formData.commission}
            onChange={onInputChange}
            placeholder="2"
            className={`w-full h-[42px] bg-white/5 border rounded-lg px-4
              text-white placeholder:text-white/20 focus:outline-none focus:ring-1
              transition-all ${errors.commission
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
              }`}
          />
          {errors.commission && (
            <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
              {errors.commission}
            </span>
          )}
        </div>
      </div>

      {/* Lay Stake & Liability */}
      {results && (
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-white/60">Lay Stake</span>
              <span className="text-white font-urbanist font-bold">
                {formatCurrency(results.layStake, currency.symbol)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Liability</span>
              <span className="text-white font-urbanist font-bold">
                {formatCurrency(results.liability, currency.symbol)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-white/60">Conversion Rate</span>
              <span className="text-white font-urbanist font-bold">
                {results.conversionRate.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Converted Amount</span>
              <span className="text-white font-urbanist font-bold">
                {formatCurrency(results.convertedAmount, currency.symbol)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}