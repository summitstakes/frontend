import React from 'react';
import { Calculator, ChevronRight, Trophy, Target, Loader2, Percent } from 'lucide-react';
import { ResultsData } from '../types';

interface ResultsPanelProps {
  results: ResultsData | null;
  isCalculating: boolean;
}

export function ResultsPanel({ results, isCalculating }: ResultsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-[#8000FF]" />
          </div>
          <h3 className="font-urbanist font-bold text-white text-lg">Results</h3>
        </div>

        {isCalculating ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#8000FF] animate-spin mx-auto mb-4" />
              <p className="text-white/60">Converting odds...</p>
            </div>
          </div>
        ) : !results ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-white/60">Enter odds to see conversions</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Implied Probability */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Implied Probability</span>
                <span className="text-xl font-urbanist font-bold text-white">
                  {results.probability}%
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full transition-all"
                  style={{ width: `${Math.min(parseFloat(results.probability), 100)}%` }}
                />
              </div>
            </div>

            {/* Odds Formats */}
            <div className="p-4 rounded-xl bg-[#8000FF]/10 border border-[#8000FF]/20">
              <div className="flex items-start gap-3">
                <Percent className="w-5 h-5 text-[#8000FF] shrink-0" />
                <div>
                  <h4 className="text-[#8000FF] font-urbanist font-bold mb-3">Converted Odds</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Decimal:</span>
                      <span className="text-white font-urbanist font-bold">
                        {results.decimal}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">American:</span>
                      <span className="text-white font-urbanist font-bold">
                        {results.american}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Fractional:</span>
                      <span className="text-white font-urbanist font-bold">
                        {results.fractional}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-[#8000FF]" />
          </div>
          <h3 className="font-urbanist font-bold text-white text-lg">Quick Tips</h3>
        </div>

        <div className="space-y-3">
          {[
            'Decimal odds of 2.00 equal +100 American odds',
            'Higher implied probability means lower potential payout',
            'American odds show profit on $100 stake',
            'Fractional odds show profit ratio to stake',
            'Decimal odds include your stake in the return'
          ].map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-lg bg-[#8000FF]/10 flex items-center justify-center shrink-0">
                <Target className="w-3 h-3 text-[#8000FF]" />
              </div>
              <span className="text-sm text-white/80">{tip}</span>
            </div>
          ))}
        </div>

        <button className="w-full h-[42px] bg-white/5 text-white/60 rounded-lg mt-4
          hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2">
          View More Tips
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}