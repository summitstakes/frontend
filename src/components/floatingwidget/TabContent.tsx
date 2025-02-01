import React from 'react';
import { Calculator, Clock, Check } from 'lucide-react';
import { oddsFormats, timezones } from './data';

interface TabContentProps {
  activeTab: 'odds' | 'timezone';
  setHasChanges: (hasChanges: boolean) => void;
}

export function TabContent({ activeTab, setHasChanges }: TabContentProps) {
  return (
    <div className="h-[calc(600px-70px-50px-70px)] overflow-hidden">
      <div className="p-6 h-full">
        {activeTab === 'odds' && (
          <div className="flex flex-col h-full">
            <div className="p-4 bg-[#1A1527] rounded-xl mb-4">
              <div className="flex items-center gap-2 text-[#8000FF] mb-2">
                <Calculator className="w-5 h-5" />
                <span className="font-medium">Select your preferred odds format</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                All odds across the platform will be displayed in your chosen format
              </p>
            </div>
            <div className="overflow-y-auto flex-1 space-y-3 pr-2 -mr-2">
              {oddsFormats.map(format => (
                <button
                  key={format.id}
                  onClick={() => setHasChanges(true)}
                  className="w-full p-5 rounded-xl font-urbanist transition-all relative group
                    bg-[#1A1527] text-white/60 hover:bg-[#8000FF]/10 hover:text-white
                    border border-transparent hover:border-[#8000FF]/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                        group-hover:scale-110 transition-transform">
                        <Calculator className="w-5 h-5 text-[#8000FF]" />
                      </div>
                      <span className="text-lg font-bold">{format.label}</span>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-[#8000FF]/10 text-[#8000FF]">
                      {format.example}
                    </div>
                  </div>
                  <p className="text-sm opacity-60 text-left">{format.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timezone' && (
          <div className="flex flex-col h-full">
            <div className="p-4 bg-[#1A1527] rounded-xl mb-4">
              <div className="flex items-center gap-2 text-[#8000FF] mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Select your timezone</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                All times will be shown in your selected timezone
              </p>
            </div>
            <div className="overflow-y-auto flex-1 space-y-3 pr-2 -mr-2">
              {timezones.map(tz => {
                const now = new Date();
                const time = now.toLocaleTimeString('en-US', { 
                  timeZone: tz.value,
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <button
                    key={tz.id}
                    onClick={() => setHasChanges(true)}
                    className="w-full p-5 rounded-xl font-urbanist transition-all relative group
                      bg-[#1A1527] text-white/60 hover:bg-[#8000FF]/10 hover:text-white
                      border border-transparent hover:border-[#8000FF]/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                          group-hover:scale-110 transition-transform">
                          <Clock className="w-5 h-5 text-[#8000FF]" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold mb-1">{tz.label}</div>
                          <div className="text-sm opacity-60">{time}</div>
                        </div>
                      </div>
                      {tz.id === 'local' && (
                        <div className="px-3 py-1 rounded-lg bg-[#8000FF]/10 text-[#8000FF] text-sm">
                          Current
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}