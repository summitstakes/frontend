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
              <p className="text-white/60">Calculating vig...</p>
            </div>
          </div>
        ) : !results ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-white/60">Enter odds to see results</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Total Vig */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Total Vig</span>
                <span className="text-xl font-urbanist font-bold text-white">
                  {results.totalVig.toFixed(2)}%
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full transition-all"
                  style={{ width: `${Math.min(results.totalVig, 20)}%` }}
                />
              </div>
            </div>

            {/* Fair Value */}
            <div className="p-4 rounded-xl bg-[#8000FF]/10 border border-[#8000FF]/20">
              <div className="flex items-start gap-3">
                <Percent className="w-5 h-5 text-[#8000FF] shrink-0" />
                <div>
                  <h4 className="text-[#8000FF] font-urbanist font-bold mb-3">Fair Value</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Fair Odds Value:</span>
                      <span className="text-white font-urbanist font-bold">
                        {results.fairValue.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* True Probabilities */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-white font-urbanist font-bold mb-3">True Probabilities</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Outcome 1:</span>
                  <span className="text-white font-urbanist font-bold">
                    {(results.trueProb1 * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Outcome 2:</span>
                  <span className="text-white font-urbanist font-bold">
                    {(results.trueProb2 * 100).toFixed(2)}%
                  </span>
                </div>
                {results.trueProb3 !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Outcome 3:</span>
                    <span className="text-white font-urbanist font-bold">
                      {(results.trueProb3 * 100).toFixed(2)}%
                    </span>
                  </div>
                )}
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
            'Lower vig means better value for bettors',
            'True probabilities sum to exactly 100%',
            'Compare vig across bookmakers',
            'Higher vig often found in props/futures',
            'Look for markets with vig under 5%'
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