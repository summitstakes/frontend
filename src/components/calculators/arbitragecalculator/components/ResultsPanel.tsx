import React from 'react';
import { TrendingUp, AlertTriangle, ChevronRight, Trophy, Target, Loader2 } from 'lucide-react';
import { ResultsData, Currency } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface ResultsPanelProps {
  results: ResultsData | null;
  currency: Currency;
  isCalculating: boolean;
}

export function ResultsPanel({ results, currency, isCalculating }: ResultsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#8000FF]" />
          </div>
          <h3 className="font-urbanist font-bold text-white text-lg">Results</h3>
        </div>

        {isCalculating ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#8000FF] animate-spin mx-auto mb-4" />
              <p className="text-white/60">Calculating results...</p>
            </div>
          </div>
        ) : !results ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-white/60">Enter odds and stake to see results</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Total Investment */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Total Investment</span>
                <span className="text-xl font-urbanist font-bold text-white">
                  {formatCurrency(results.totalInvestment, currency.symbol)}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full transition-all"
                  style={{ width: `${Math.min((results.totalInvestment / 2000) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Profit Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60 text-sm block mb-1">Total Profit</span>
                <span className={`text-lg font-urbanist font-bold ${
                  results.totalProfit > 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {formatCurrency(results.totalProfit, currency.symbol)}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60 text-sm block mb-1">ROI</span>
                <span className={`text-lg font-urbanist font-bold ${
                  results.roi > 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {formatPercentage(results.roi)}
                </span>
              </div>
            </div>

            {/* Arbitrage Status */}
            {results.hasArbitrage ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="text-emerald-500 font-urbanist font-bold mb-1">Arbitrage Opportunity Found!</h4>
                    <p className="text-emerald-500/80 text-sm">
                      Place your bets quickly as odds may change. Use the calculated stakes for guaranteed profit.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <h4 className="text-red-500 font-urbanist font-bold mb-1">No Arbitrage Found</h4>
                    <p className="text-red-500/80 text-sm">
                      The current odds do not present an arbitrage opportunity. Try adjusting the odds or stakes.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
            'Look for odds with minimal margin between bookmakers',
            'Consider transaction fees when calculating profit',
            'Act quickly as odds can change rapidly',
            'Verify odds and stakes before placing bets',
            'Monitor your bankroll and risk management'
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