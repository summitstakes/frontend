import React, { useState, forwardRef } from 'react';
import { Settings, X, Globe2, Calculator } from 'lucide-react';
import { TabContent } from './TabContent';
import { SaveButton } from './SaveButton';

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel = forwardRef<HTMLDivElement, SettingsPanelProps>(({ onClose }, ref) => {
  const [activeTab, setActiveTab] = useState<'odds' | 'timezone'>('odds');
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div 
      ref={ref}
      className="w-[400px] h-[600px] bg-[#120D1D] border border-[#8000FF]/20 rounded-2xl overflow-hidden 
        shadow-lg animate-in slide-in-from-bottom-2 duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-[70px] border-b border-[#8000FF]/10 bg-[#1A1527]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-[#8000FF]" />
          </div>
          <div>
            <h2 className="text-white font-urbanist font-bold text-lg">Settings</h2>
            <p className="text-white/40 text-sm">Customize your experience</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white/60" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#8000FF]/10 bg-[#1A1527] px-6">
        <button
          onClick={() => setActiveTab('odds')}
          className={`h-[50px] px-4 flex items-center gap-2 relative
            ${activeTab === 'odds' ? 'text-[#8000FF]' : 'text-white/60 hover:text-white'} 
            transition-colors`}
        >
          <Calculator className="w-5 h-5" />
          <span className="text-sm font-urbanist font-bold">Odds Format</span>
          {activeTab === 'odds' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8000FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('timezone')}
          className={`h-[50px] px-4 flex items-center gap-2 relative
            ${activeTab === 'timezone' ? 'text-[#8000FF]' : 'text-white/60 hover:text-white'} 
            transition-colors`}
        >
          <Globe2 className="w-5 h-5" />
          <span className="text-sm font-urbanist font-bold">Timezone</span>
          {activeTab === 'timezone' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8000FF]" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <TabContent 
        activeTab={activeTab} 
        setHasChanges={setHasChanges}
      />

      {/* Save Button */}
      <SaveButton 
        hasChanges={hasChanges}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
      />
    </div>
  );
});

SettingsPanel.displayName = 'SettingsPanel';