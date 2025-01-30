import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCcw, Info, Book, Copy, Percent } from 'lucide-react';
import { BetForm } from './components/BetForm';
import { ResultsPanel } from './components/ResultsPanel';
import { FormData, ResultsData, ValidationErrors } from './types';
import { oddsFormats } from './data/constants';
import { calculateVig, convertOdds, validateOdds } from './utils/calculations';

export function VigCalculator() {
  const [oddsFormat, setOddsFormat] = useState(oddsFormats[0]);
  const [showOddsFormatDropdown, setShowOddsFormatDropdown] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    odds1: '',
    odds2: '',
    odds3: '', // For 3-way markets
    isThreeWay: false
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [results, setResults] = useState<ResultsData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Real-time validation
  useEffect(() => {
    const newErrors: ValidationErrors = {};
    if (formData.odds1 && !validateOdds(formData.odds1, oddsFormat.id)) {
      newErrors.odds1 = 'Invalid odds format';
    }
    if (formData.odds2 && !validateOdds(formData.odds2, oddsFormat.id)) {
      newErrors.odds2 = 'Invalid odds format';
    }
    if (formData.isThreeWay && formData.odds3 && !validateOdds(formData.odds3, oddsFormat.id)) {
      newErrors.odds3 = 'Invalid odds format';
    }
    setErrors(newErrors);
  }, [formData, oddsFormat]);

  // Calculate results when form is valid
  useEffect(() => {
    if (formData.odds1 && formData.odds2 && (!formData.isThreeWay || formData.odds3) && 
        Object.keys(errors).length === 0) {
      calculateResults();
    }
  }, [formData]);

  const calculateResults = () => {
    setIsCalculating(true);
    
    try {
      const odds1 = convertOdds(formData.odds1, oddsFormat.id);
      const odds2 = convertOdds(formData.odds2, oddsFormat.id);
      const odds3 = formData.isThreeWay ? convertOdds(formData.odds3, oddsFormat.id) : null;

      const results = calculateVig(odds1, odds2, odds3);
      setResults(results);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ 
        ...prev, 
        [name]: checked,
        // Reset third odds when switching between 2-way and 3-way
        odds3: checked ? prev.odds3 : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFormData({
      odds1: '',
      odds2: '',
      odds3: '',
      isThreeWay: false
    });
    setErrors({});
    setResults(null);
  };

  const handleCopyResults = async () => {
    if (!results) return;

    const resultsText = `
Vig Calculator Results:
---------------------
Market: ${formData.isThreeWay ? '3-Way' : '2-Way'}

Odds:
${formData.odds1} (${(results.trueProb1 * 100).toFixed(2)}% true probability)
${formData.odds2} (${(results.trueProb2 * 100).toFixed(2)}% true probability)
${formData.isThreeWay ? `${formData.odds3} (${(results.trueProb3! * 100).toFixed(2)}% true probability)` : ''}

Total Vig: ${results.totalVig.toFixed(2)}%
Fair Odds Value: ${results.fairValue.toFixed(2)}%
    `.trim();

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy results:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      {/* Calculator Form */}
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-urbanist font-bold text-white mb-4">
            Vig Calculator
          </h1>
          <p className="text-white/60 leading-relaxed">
            Calculate the bookmaker's margin (vigorish/juice) and true implied probabilities from betting odds.
          </p>
        </div>

        {/* Main Calculator Form */}
        <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
          border border-[#8000FF]/20 rounded-xl">
          {/* Form Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                <Percent className="w-5 h-5 text-[#8000FF]" />
              </div>
              <h3 className="font-urbanist font-bold text-white text-lg">Calculate Vig</h3>
            </div>
            <div className="flex items-center gap-3">
              {/* Odds Format Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowOddsFormatDropdown(!showOddsFormatDropdown)}
                  className="h-[42px] px-3 bg-white/5 border border-white/10 rounded-lg
                    hover:bg-white/10 transition-all text-white flex items-center gap-2
                    focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 focus:ring-[#8000FF]/40"
                >
                  <Calculator className="w-4 h-4 text-[#8000FF]" />
                  <span className="text-sm whitespace-nowrap">{oddsFormat.name.split(' ')[0]}</span>
                </button>

                {showOddsFormatDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-[200px] bg-[#120D1D] border border-[#8000FF]/20 
                    rounded-xl shadow-lg overflow-hidden z-50">
                    {oddsFormats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => {
                          setOddsFormat(format);
                          setShowOddsFormatDropdown(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-white/5 transition-all"
                      >
                        <div className="text-white text-sm mb-0.5">{format.name}</div>
                        <div className="text-white/40 text-xs">Example: {format.example}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Guide Button */}
              <button 
                onClick={() => setShowGuide(!showGuide)}
                className="h-[42px] px-3 bg-white/5 border border-white/10 rounded-lg
                  hover:bg-white/10 transition-all text-white flex items-center gap-2
                  focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 focus:ring-[#8000FF]/40"
              >
                <Book className="w-4 h-4 text-[#8000FF]" />
                <span className="text-sm">Guide</span>
              </button>

              {/* Reset Button */}
              <button 
                onClick={handleReset}
                className="w-8 h-[42px] rounded-lg bg-white/5 hover:bg-white/10 transition-colors
                  flex items-center justify-center group"
              >
                <RefreshCcw className="w-4 h-4 text-white/40 group-hover:text-white/60" />
              </button>
            </div>
          </div>

          {/* Guide Panel */}
          {showGuide && (
            <div className="mb-6 p-4 bg-[#8000FF]/10 rounded-xl border border-[#8000FF]/20">
              <div className="flex items-center gap-3 mb-3">
                <Book className="w-5 h-5 text-[#8000FF]" />
                <h4 className="text-white font-urbanist font-bold">How to Use</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#8000FF] text-xs">1</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    Select whether you're calculating vig for a 2-way or 3-way market.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#8000FF] text-xs">2</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    Enter the odds for each possible outcome in your chosen format.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#8000FF] text-xs">3</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    The calculator will show the total vig, true probabilities, and fair odds value.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-3 bg-[#8000FF]/10 rounded-xl mb-6 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#8000FF] shrink-0 mt-0.5" />
            <p className="text-sm text-white/80">
              The vig (vigorish) or juice is the bookmaker's commission built into the odds. This calculator helps you 
              understand the true probabilities and fair value of betting markets.
            </p>
          </div>

          {/* Action Buttons */}
          {results && (
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleCopyResults}
                className="h-[42px] px-4 bg-white/5 border border-white/10 rounded-lg
                  hover:bg-white/10 transition-all text-white flex items-center gap-2
                  focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 focus:ring-[#8000FF]/40"
              >
                <Copy className="w-4 h-4 text-[#8000FF]" />
                <span className="text-sm">
                  {copiedToClipboard ? 'Copied!' : 'Copy Results'}
                </span>
              </button>
            </div>
          )}

          <BetForm
            formData={formData}
            oddsFormat={oddsFormat}
            errors={errors}
            onInputChange={handleInputChange}
            results={results}
          />
        </div>
      </div>

      {/* Results Panel */}
      <ResultsPanel
        results={results}
        isCalculating={isCalculating}
      />
    </div>
  );
}