import React, { useState } from 'react';
import { Globe2, X, Mail, Building2, ArrowRight, ArrowLeft, Send, MapPin, Target, Info, AlertCircle, Loader2 } from 'lucide-react';
import { ModalView } from './types';

interface RequestFormProps {
  view: ModalView;
  onClose: () => void;
  setView: (view: ModalView) => void;
}

export function RequestForm({ view, onClose, setView }: RequestFormProps) {
  const [requestFormData, setRequestFormData] = useState({
    country: '',
    region: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequestFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validate inputs
    if (!requestFormData.country.trim()) {
      setError('Country name is required');
      setIsSubmitting(false);
      return;
    }

    if (!requestFormData.email.trim()) {
      setError('Email address is required');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestFormData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setView('request-success');
    } catch (error) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (view === 'request-success') {
    return (
      <>
        {/* Success Header */}
        <div className="flex flex-col p-6 border-b border-[#8000FF]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                  p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                  <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                    <Globe2 className="w-6 h-6 text-[#8000FF]" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-emerald-500 
                  flex items-center justify-center animate-bounce">
                  <Target className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-urbanist font-bold text-white">Request Submitted</h2>
                <p className="text-sm text-white/60">Thank you for your request</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        {/* Success Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 rounded-full bg-[#8000FF]/10 flex items-center justify-center mb-6">
            <Send className="w-10 h-10 text-[#8000FF]" />
          </div>
          <h3 className="text-2xl font-urbanist font-bold text-white mb-4">Request Received!</h3>
          <p className="text-white/60 text-center max-w-md mb-8">
            We'll notify you at <span className="text-white font-medium">{requestFormData.email}</span> once your location is available on our platform.
          </p>
          <button
            onClick={onClose}
            className="h-[42px] bg-[#8000FF] text-white font-urbanist font-bold px-10 rounded-xl
              hover:bg-[#6700CC] transition-all duration-300 flex items-center justify-center gap-2
              hover:shadow-[0_0_20px_rgba(128,0,255,0.3)]"
          >
            Close Window
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col p-6 border-b border-[#8000FF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                  <Globe2 className="w-6 h-6 text-[#8000FF]" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-[#8000FF] 
                flex items-center justify-center">
                <Target className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-urbanist font-bold text-white">Request Location</h2>
              <p className="text-sm text-white/60">Help us expand our coverage</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Section - Info Panel */}
        <div className="w-[360px] border-r border-[#8000FF]/10 p-6">
          <div className="mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mb-3">
              <Globe2 className="w-5 h-5 text-[#8000FF]" />
            </div>
            <h2 className="text-xl font-urbanist font-bold text-white mb-2">Request Location</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Help us expand our coverage to your region and get notified when it becomes available.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#8000FF]" />
                </div>
                <span className="font-urbanist font-bold text-white text-sm">Location Coverage</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                We're continuously expanding our services to new regions to provide the best betting experience worldwide.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#8000FF]" />
                </div>
                <span className="font-urbanist font-bold text-white text-sm">Stay Updated</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                You'll receive an email notification as soon as your requested location becomes available.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 p-6">
          <h3 className="text-lg font-urbanist font-bold text-white mb-5">Location Details</h3>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl 
              flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-500/90">{error}</p>
            </div>
          )}

          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/60 ml-1">Country</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 
                  group-focus-within:text-[#8000FF] transition-colors" />
                <input
                  type="text"
                  name="country"
                  value={requestFormData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                    focus:ring-1 focus:ring-[#8000FF]/40 transition-all text-sm"
                  placeholder="Enter country name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/60 ml-1">Region/State (Optional)</label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 
                  group-focus-within:text-[#8000FF] transition-colors" />
                <input
                  type="text"
                  name="region"
                  value={requestFormData.region}
                  onChange={handleInputChange}
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                    focus:ring-1 focus:ring-[#8000FF]/40 transition-all text-sm"
                  placeholder="Enter region or state"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/60 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 
                  group-focus-within:text-[#8000FF] transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={requestFormData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                    focus:ring-1 focus:ring-[#8000FF]/40 transition-all text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <p className="text-xs text-white/40 mt-1 ml-1">
                We'll notify you when your location becomes available
              </p>
            </div>

            <div className="pt-3 space-y-2.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                  hover:bg-[#6700CC] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
                      translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
                      Submit Request
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setView('selection')}
                className="w-full h-[42px] bg-white/5 text-white/60 font-urbanist font-bold rounded-xl
                  hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Selection
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}