import React, { useRef, useEffect, useState } from 'react';
import { LocationForm } from './LocationForm';
import { RequestForm } from './RequestForm';
import { ModalView } from './types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
}

export function LocationModal({ isOpen, onClose, currentLocation }: LocationModalProps) {
  const [view, setView] = useState<ModalView>('selection');
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset view when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Wait for close animation to finish before resetting
      const timer = setTimeout(() => {
        setView('selection');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    // View will be reset by the useEffect above
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-[#06060C]/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div 
        ref={modalRef}
        className="relative w-[800px] h-[600px] bg-gradient-to-br from-[#1A1527]/95 to-[#120D1D]/95 
          rounded-2xl border border-[#8000FF]/20 shadow-lg overflow-hidden flex flex-col"
        style={{ margin: '0 auto' }}
      >
        {view === 'selection' && (
          <LocationForm 
            onClose={handleClose}
            currentLocation={currentLocation}
            setView={setView}
          />
        )}

        {(view === 'request' || view === 'request-success') && (
          <RequestForm 
            view={view}
            onClose={handleClose}
            setView={setView}
          />
        )}
      </div>
    </div>
  );
}