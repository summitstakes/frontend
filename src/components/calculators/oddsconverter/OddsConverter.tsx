import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCcw, Info, Book, Copy } from 'lucide-react';
import { BetForm } from './components/BetForm';
import { ResultsPanel } from './components/ResultsPanel';
import { FormData, ResultsData, ValidationErrors } from './types';
import { oddsFormats } from './data/constants';
import { convertOdds, validateOdds } from './utils/calculations';

export function OddsConverter() {
  const [formData, setFormData] = useState<FormData>({
    odds: '',
    selectedFormat: 'decimal'
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [results, setResults] = useState<ResultsData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Real-time validation
  useEffect(() => {
    const newErrors: ValidationErrors = {};
    if (formData.odds && !validateOdds(formData.odds, formData.selectedFormat)) {
      newErrors.odds = 'Invalid odds format';
    }
    setErrors(newErrors);
  }, [formData]);

  // Calculate results when form is valid
  useEffect(() => {
    if (formData.odds && Object.keys(errors).length === 0) {
      calculateResults();
    }
  }, [formData]);

  const calculateResults = () => {
    setIsCalculating(true);
    
    try {
      // Convert to decimal first
      const decimalOdds = convertOdds(formData.odds, formData.selectedFormat);
      
      // Calculate all formats
      const results: ResultsData = {
        decimal: decimalOdds.toFixed(2),
        american: decimalToAmerican(decimalOdds),
        fractional: decimalToFractional(decimalOdds),
        probability: ((1 / decimalOdds) * 100).toFixed(2),
        impliedOdds: decimalOdds.toFixed(2)
      };

      setResults(results);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const decimalToAmerican = (decimal: number): string => {
    if (decimal >= 2) {
      return `+${Math.round((decimal - 1) * 100)}`;
    } else {
      return `-${Math.round(100 / (decimal - 1))}`;
    }
  };

  const decimalToFractional = (decimal: number): string => {
    const tolerance = 1.0E-6;
    let numerator = Math.round((decimal - 1) * 100);
    let denominator = 100;
    
    // Simplify fraction
    const gcd = (a: number, b: number): number => {
      return b < tolerance ? a : gcd(b, a % b);
    };
    
    const divisor = gcd(numerator, denominator);
    numerator = Math.round(numerator / divisor);
    denominator = Math.round(denominator / divisor);
    
    return `${numerator}/${denominator}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      odds: '',
      selectedFormat: 'decimal'
    });
    setErrors({});
    setResults(null);
  };

  const handleCopyResults = async () => {
    if (!results) return;

    const resultsText = `
Odds Conversion Results:
----------------------
Input: ${formData.odds} (${formData.selectedFormat})

Decimal: ${results.decimal}
American: ${results.american}
Fractional: ${results.fractional}
Implied Probability: ${results.probability}%
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
            Odds Converter
          </h1>
          <p className="text-white/60 leading-relaxed">
            Convert betting odds between different formats and calculate implied probabilities.
          </p>
        </div>

        {/* Main Calculator Form */}
        <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
          border border-[#8000FF]/20 rounded-xl">
          {/* Form Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#8000FF]" />
              </div>
              <h3 className="font-urbanist font-bold text-white text-lg">Convert Odds</h3>
            </div>
            <div className="flex items-center gap-3">
              {/* Guide Button */}
              <button 
                onClick={() => setShowGuide(!showGuide)}
                className="h-[42px] px-3 bg-white/5 border border-white/10 rounded-lg
                  hover:bg-white/10 transition-all text-white flex items-center gap-2
                  focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 focus:ring-[#8000FF]/40"
                aria-label="Show guide"
                aria-expanded={showGuide}
              >
                <Book className="w-4 h-4 text-[#8000FF]" />
                <span className="text-sm">Guide</span>
              </button>

              {/* Reset Button */}
              <button 
                onClick={handleReset}
                className="w-8 h-[42px] rounded-lg bg-white/5 hover:bg-white/10 transition-colors
                  flex items-center justify-center group"
                aria-label="Reset calculator"
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
                    Select your input odds format from the dropdown menu.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#8000FF] text-xs">2</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    Enter the odds in your selected format.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#8000FF] text-xs">3</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    The calculator will instantly show the odds in all other formats and the implied probability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-3 bg-[#8000FF]/10 rounded-xl mb-6 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#8000FF] shrink-0 mt-0.5" />
            <p className="text-sm text-white/80">
              Convert odds between decimal, American, and fractional formats. The calculator also shows 
              the implied probability to help you better understand the odds.
            </p>
          </div>

          {/* Action Buttons */}
          {results && (
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleCopyResults}
                className="h-[42px] px-4 bg-white/5 border border-white/10 rounded-lg
                  hover:bg-white/10 transition-all text-white flex items-center gap-2
                  focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 focus:ring-[#8000FF]/40
                  relative"
                aria-label="Copy results"
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
            oddsFormats={oddsFormats}
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