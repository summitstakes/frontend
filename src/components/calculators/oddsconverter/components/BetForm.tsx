import React from 'react';
import { FormData, OddsFormat, ResultsData, ValidationErrors } from '../types';

interface BetFormProps {
  formData: FormData;
  oddsFormats: OddsFormat[];
  errors: ValidationErrors;
  results: ResultsData | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function BetForm({ 
  formData, 
  oddsFormats,
  errors,
  onInputChange 
}: BetFormProps) {
  return (
    <div className="space-y-6">
      {/* Format Selection */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white/60">Input Format</label>
        <select
          name="selectedFormat"
          value={formData.selectedFormat}
          onChange={onInputChange}
          className="w-full h-[42px] bg-white/5 border border-white/10 rounded-lg px-4
            text-white focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 
            focus:ring-[#8000FF]/40 transition-all appearance-none"
        >
          {oddsFormats.map(format => (
            <option key={format.id} value={format.id} className="bg-[#120D1D]">
              {format.name}
            </option>
          ))}
        </select>
      </div>

      {/* Odds Input */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white/60">Odds</label>
        <div className="relative">
          <input
            type="text"
            name="odds"
            value={formData.odds}
            onChange={onInputChange}
            placeholder={oddsFormats.find(f => f.id === formData.selectedFormat)?.example}
            className={`w-full h-[42px] bg-white/5 border rounded-lg px-4
              text-white placeholder:text-white/20 focus:outline-none focus:ring-1
              transition-all ${errors.odds
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
              }`}
          />
          {errors.odds && (
            <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
              {errors.odds}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}