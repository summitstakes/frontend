import React, { useEffect, useState } from 'react';
import { X, Check, AlertCircle, Info, Bell, Star } from 'lucide-react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Notification({ 
  message, 
  type = 'success', 
  duration = 5000, 
  onClose 
}: NotificationProps) {
  const [progress, setProgress] = useState(100);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = (remaining / duration) * 100;

      if (remaining <= 0) {
        clearInterval(timer);
        handleClose();
      } else {
        setProgress(newProgress);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'from-red-500/10 to-red-500/5',
          border: 'border-red-500/20',
          iconBg: 'bg-red-500/10',
          iconColor: 'text-red-500',
          progressBg: 'bg-red-500',
          badge: 'bg-red-500/10 text-red-500 border-red-500/20'
        };
      case 'info':
        return {
          bg: 'from-blue-500/10 to-blue-500/5',
          border: 'border-blue-500/20',
          iconBg: 'bg-blue-500/10',
          iconColor: 'text-blue-500',
          progressBg: 'bg-blue-500',
          badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
        };
      default:
        return {
          bg: 'from-emerald-500/10 to-emerald-500/5',
          border: 'border-emerald-500/20',
          iconBg: 'bg-emerald-500/10',
          iconColor: 'text-emerald-500',
          progressBg: 'bg-emerald-500',
          badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[500px] transform transition-all duration-300
      ${isClosing ? 'translate-y-[-150%] opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className={`relative bg-gradient-to-br ${styles.bg} backdrop-blur-md 
        border ${styles.border} rounded-2xl overflow-hidden shadow-lg
        hover:shadow-[0_8px_32px_-6px_rgba(16,185,129,0.2)] transition-all duration-300 group`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] rotate-[35deg] transform-gpu"
              style={{
                width: '200%',
                left: '-50%',
                top: `${i * 12}px`,
                background: `linear-gradient(90deg, transparent, ${type === 'error' ? 'rgba(239,68,68,0.05)' : type === 'info' ? 'rgba(59,130,246,0.05)' : 'rgba(16,185,129,0.05)'}, transparent)`,
                animation: 'slideUp 8s linear infinite',
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
          <div 
            className={`h-full ${styles.progressBg} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-6">
          {/* Icon and Message */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center
              group-hover:scale-110 transition-transform relative overflow-hidden`}>
              {/* Icon Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/[0.02]
                opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`relative ${styles.iconColor}`}>
                {getIcon()}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {type === 'success' && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${styles.badge} 
                  border mb-2 text-xs font-medium`}>
                  <Star className="w-3.5 h-3.5" />
                  Sign In Successful
                </div>
              )}
              <p className="text-white font-urbanist font-medium leading-relaxed pr-6">
                {message}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 
              flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
          rotate-45 transform origin-bottom-left" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
          -rotate-45 transform origin-top-right" />
      </div>
    </div>
  );
}