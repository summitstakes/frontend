import React, { useState } from 'react';
import { ArrowRight, Settings } from 'lucide-react';

interface SaveButtonProps {
  hasChanges: boolean;
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
}

export function SaveButton({ hasChanges, showSuccess, setShowSuccess }: SaveButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="h-[60px] px-4 border-t border-[#8000FF]/10 flex items-center justify-between bg-[#1A1527]">
      {showSuccess ? (
        <div className="flex items-center gap-2 text-emerald-500 w-full justify-center">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings saved!</span>
        </div>
      ) : (
        <button
          onClick={handleSave}
          disabled={!hasChanges || isSubmitting}
          className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
            hover:bg-[#6700CC] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
            hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Settings className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
                translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
                Save Changes
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}