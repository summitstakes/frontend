import React, { useState, useRef, useEffect } from 'react';
import { Settings, MessageSquare, X } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';

export function FloatingWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const settingsPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsPanelRef.current && !settingsPanelRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChatClick = () => {
    if (window.$crisp) {
      window.$crisp.push(['do', 'chat:open']);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      {/* Floating Buttons */}
      <div className="flex items-center gap-2">
        {/* Chat Button */}
        <button 
          onClick={handleChatClick}
          className="h-[50px] w-[50px] rounded-2xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
            border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
            flex items-center justify-center text-white hover:text-[#8000FF] relative group"
        >
          <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#8000FF] rounded-full animate-pulse" />
          </div>
        </button>

        {/* Settings Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-[50px] w-[50px] rounded-2xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
            border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
            flex items-center justify-center text-white hover:text-[#8000FF] relative group"
        >
          <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
          <Settings className={`w-6 h-6 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Settings Panel */}
      {isExpanded && <SettingsPanel ref={settingsPanelRef} onClose={() => setIsExpanded(false)} />}
    </div>
  );
}