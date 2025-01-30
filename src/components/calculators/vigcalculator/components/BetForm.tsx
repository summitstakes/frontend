import React from 'react';
import { FormData, OddsFormat, ResultsData, ValidationErrors } from '../types';

interface BetFormProps {
  formData: FormData;
  oddsFormat: OddsFormat;
  errors: ValidationErrors;
  results: ResultsData | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BetForm({ 
  formData, 
  oddsFormat, 
  errors,
  onInputChange 
}: BetFormProps) {
  return (
    <div className="space-y-6">
      {/* Market Type Toggle */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white/60">Market Type</label>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="isThreeWay"
                checked={formData.isThreeWay}
                onChange={onInputChange}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-white/5 border border-white/10 rounded-full 
                peer-checked:bg-[#8000FF]/20 peer-checked:border-[#8000FF] transition-all" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full transition-all
                peer-checked:bg-[#8000FF] peer-checked:translate-x-4" />
            </div>
            <span className="text-white/60 group-hover:text-white/80 transition-colors">
              3-Way Market
            </span>
          </label>
          <span className="text-white/40 text-sm">
            (e.g., Soccer Match Result)
          </span>
        </div>
      </div>

      {/* Odds Inputs */}
      <div className="space-y-4">
        {/* First Outcome */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/60">
            {formData.isThreeWay ? 'Home Win Odds' : 'Outcome 1 Odds'}
          </label>
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

        {/* Second Outcome */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/60">
            {formData.isThreeWay ? 'Draw Odds' : 'Outcome 2 Odds'}
          </label>
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

        {/* Third Outcome (for 3-way markets) */}
        {formData.isThreeWay && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Away Win Odds</label>
            <div className="relative">
              <input
                type="text"
                name="odds3"
                value={formData.odds3}
                onChange={onInputChange}
                placeholder={oddsFormat.example}
                className={`w-full h-[42px] bg-white/5 border rounded-lg px-4
                  text-white placeholder:text-white/20 focus:outline-none focus:ring-1
                  transition-all ${errors.odds3
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                    : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
                  }`}
              />
              {errors.odds3 && (
                <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
                  {errors.odds3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}