import React from 'react';
import { Gift, ArrowUpRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { freeTools } from '../data/tools';

export function FreeTools() {
  const navigate = useNavigate();

  return (
    <div className="pl-8 h-full">
      {/* Enhanced Header */}
      <div className="relative h-full">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-[#10B981] blur-lg opacity-50" />
            <div className="relative flex flex-col">
              <div className="px-6 py-1.5 bg-gradient-to-r from-emerald-500 to-[#10B981] rounded-full
                flex items-center gap-2 shadow-lg">
                <Gift className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold tracking-wide">FREE TOOLS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 
          border border-emerald-500/20 rounded-2xl h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Gift className="w-6 h-6 text-emerald-500" />
            <div>
              <h2 className="text-xl font-urbanist font-bold text-white">Free Tools</h2>
              <p className="text-white/60 text-sm">No account needed</p>
            </div>
          </div>

          {/* Enhanced Info Box */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-6">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-500/90 leading-relaxed">
                Access our essential tools for free - no registration required! Get started with betting 
                calculators, live data, and expert insights.
              </p>
            </div>
          </div>

          {/* Tools List */}
          <div className="space-y-4 flex-1">
            {freeTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => navigate(tool.path)}
                className="w-full group relative p-4 bg-gradient-to-br from-emerald-500/5 to-emerald-500/[0.02] 
                  border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 
                  transition-all duration-500 cursor-pointer hover:-translate-y-1
                  hover:shadow-[0_8px_32px_-6px_rgba(16,185,129,0.2)] text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {tool.icon}
                    <div>
                      <h3 className="font-urbanist font-bold text-white text-base group-hover:text-emerald-500 
                        transition-colors mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-emerald-500 group-hover:text-white 
                    group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}