import React, { useRef, useState } from 'react';
import { X, Info, Trophy, ArrowRight, ArrowUp, Printer } from 'lucide-react';
import { handicapRows } from './asiantable/data';
import { AsianHandicapProps } from './asiantable/types';

const Tooltip = ({ text }: { text: string }) => (
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 
    bg-[#120D1D] border border-[#8000FF]/20 rounded-lg whitespace-nowrap text-xs text-white/80
    opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
    {text}
  </div>
);

export function AsianHandicap({ isOpen, onClose }: AsianHandicapProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setShowBackToTop(target.scrollTop > 200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#06060C]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-[1000px] max-h-[90vh] bg-gradient-to-br from-[#1A1527]/95 to-[#120D1D]/95 
        rounded-2xl border border-[#8000FF]/20 shadow-lg overflow-hidden flex flex-col">
        
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#8000FF]/10 bg-[#120D1D]/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] p-[1px]">
              <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#8000FF]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-urbanist font-bold text-white mb-1">Asian Handicap Guide</h2>
              <p className="text-white/60">Understanding handicap betting outcomes and scenarios</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10
                flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-white/60" />
              <span className="text-sm text-white/60">Print</span>
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10
                flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-4 bg-[#8000FF]/10 border-b border-[#8000FF]/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#8000FF] shrink-0 mt-0.5" />
            <p className="text-white/80 text-sm leading-relaxed">
              This guide shows all possible outcomes for Asian Handicap bets. The table displays results for both negative (-) and positive (+) handicaps, 
              helping you understand how different match outcomes affect your bets.
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div 
          className="flex-1 overflow-auto"
          ref={tableRef}
          onScroll={handleScroll}
        >
          <div className="p-6">
            <table className="w-full border border-[#8000FF]/20 rounded-xl overflow-hidden">
              {/* Table Header */}
              <thead className="sticky top-0 bg-[#120D1D] z-10">
                <tr>
                  <th colSpan={3} className="h-[60px] align-middle border-b border-[#8000FF]/20">
                    <div className="flex items-center gap-2 justify-center">
                      <ArrowRight className="w-4 h-4 text-[#8000FF] -rotate-180" />
                      <span className="text-sm font-urbanist font-bold text-white/80">Team A (Favorite)</span>
                    </div>
                  </th>
                  <th colSpan={3} className="h-[60px] align-middle border-b border-[#8000FF]/20">
                    <div className="flex items-center gap-2 justify-center">
                      <span className="text-sm font-urbanist font-bold text-white/80">Team B (Underdog)</span>
                      <ArrowRight className="w-4 h-4 text-[#8000FF]" />
                    </div>
                  </th>
                </tr>
                <tr className="border-b border-[#8000FF]/20">
                  <th className="sticky left-0 bg-[#120D1D] px-4 py-3 text-center text-xs font-urbanist 
                    font-bold text-white/60 w-[80px] bg-[#8000FF]/5 group cursor-help border-r border-[#8000FF]/20">
                    Handicap (-)
                    <Tooltip text="Negative handicap means the team must win by more than this margin" />
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-urbanist font-bold text-white/60 w-[140px] border-r border-[#8000FF]/20">
                    Match Outcome
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-urbanist font-bold text-white/60 w-[140px]
                    bg-[#8000FF]/5 border-r border-[#8000FF]/20">
                    Bet Result
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-urbanist font-bold text-white/60 w-[80px]
                    bg-emerald-500/5 group cursor-help border-r border-[#8000FF]/20">
                    Handicap (+)
                    <Tooltip text="Positive handicap means the team can lose by less than this margin" />
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-urbanist font-bold text-white/60 w-[140px] border-r border-[#8000FF]/20">
                    Match Outcome
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-urbanist font-bold text-white/60 w-[140px]
                    bg-emerald-500/5">
                    Bet Result
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[#8000FF]/20">
                {handicapRows.map((row, index) => 
                  row.outcomes ? (
                    row.outcomes.map((outcome, outcomeIndex) => (
                      <tr 
                        key={`${index}-${outcomeIndex}`}
                        className={`hover:bg-white/[0.02] transition-colors relative
                          ${outcomeIndex === 0 ? 'border-t border-t-[#8000FF]/20' : ''}`}
                      >
                        {/* Handicap (-) */}
                        {outcomeIndex === 0 && (
                          <td rowSpan={row.outcomes?.length} className="px-4 py-3 text-center border-r border-[#8000FF]/20">
                            <span className="text-white/80 text-xs">{row.negative}</span>
                          </td>
                        )}

                        {/* Team A Outcome */}
                        <td className="px-4 py-3 text-center border-r border-[#8000FF]/20">
                          <span className="text-white/80 text-xs">{outcome.teamA}</span>
                        </td>

                        {/* Team A Result */}
                        <td className="px-4 py-3 border-r border-[#8000FF]/20">
                          <div className="flex items-center justify-center">
                            <div className={`w-[100px] py-1 rounded-lg text-center ${
                              outcome.resultA === 'Won' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                              outcome.resultA === 'Lost' ? 'bg-red-500/10 border border-red-500/20' :
                              outcome.resultA === 'Half Win' ? 'bg-orange-500/10 border border-orange-500/20' :
                              outcome.resultA === 'Half Lose' ? 'bg-orange-500/10 border border-orange-500/20' :
                              'bg-yellow-500/10 border border-yellow-500/20'
                            }`}>
                              <span className={`text-xs ${
                                outcome.resultA === 'Won' ? 'text-emerald-500' :
                                outcome.resultA === 'Lost' ? 'text-red-500' :
                                outcome.resultA === 'Half Win' ? 'text-orange-500' :
                                outcome.resultA === 'Half Lose' ? 'text-orange-500' :
                                'text-yellow-500'
                              }`}>
                                {outcome.resultA}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Handicap (+) */}
                        {outcomeIndex === 0 && (
                          <td rowSpan={row.outcomes?.length} className="px-4 py-3 text-center border-r border-[#8000FF]/20">
                            <span className="text-white/80 text-xs">{row.positive}</span>
                          </td>
                        )}

                        {/* Team B Outcome */}
                        <td className="px-4 py-3 text-center border-r border-[#8000FF]/20">
                          <span className="text-white/80 text-xs">{outcome.teamB}</span>
                        </td>

                        {/* Team B Result */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center">
                            <div className={`w-[100px] py-1 rounded-lg text-center ${
                              outcome.resultB === 'Won' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                              outcome.resultB === 'Lost' ? 'bg-red-500/10 border border-red-500/20' :
                              outcome.resultB === 'Half Win' ? 'bg-orange-500/10 border border-orange-500/20' :
                              outcome.resultB === 'Half Lose' ? 'bg-orange-500/10 border border-orange-500/20' :
                              'bg-yellow-500/10 border border-yellow-500/20'
                            }`}>
                              <span className={`text-xs ${
                                outcome.resultB === 'Won' ? 'text-emerald-500' :
                                outcome.resultB === 'Lost' ? 'text-red-500' :
                                outcome.resultB === 'Half Win' ? 'text-orange-500' :
                                outcome.resultB === 'Half Lose' ? 'text-orange-500' :
                                'text-yellow-500'
                              }`}>
                                {outcome.resultB}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={index}>
                      <td colSpan={6} className="px-4 py-3 text-center text-white/40 text-xs">
                        No outcomes available
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="px-6 py-4 border-t border-[#8000FF]/20 bg-[#120D1D]/50">
          <div className="flex items-center gap-8 justify-center">
            {/* Bet Result Colors */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                <span className="text-xs text-white/60">Win</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <span className="text-xs text-white/60">Loss</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <span className="text-xs text-white/60">Refund</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500/40" />
                <span className="text-xs text-white/60">Half Win / Lose</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/10" />

            {/* Team Colors */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#8000FF]/20" />
                <span className="text-xs text-white/60">Team A (Favorite)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500/20" />
                <span className="text-xs text-white/60">Team B (Underdog)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => tableRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#8000FF] 
            flex items-center justify-center shadow-lg hover:bg-[#6700CC] 
            transition-all duration-300 group ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}