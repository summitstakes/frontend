import React, { useState, useEffect } from 'react';
import { DollarSign, Calculator, RefreshCcw, Info, Book, Gift, Copy } from 'lucide-react';
import { BetForm } from './components/BetForm';
import { ResultsPanel } from './components/ResultsPanel';
import { FormData, ResultsData, ValidationErrors } from './types';
import { currencies, oddsFormats } from './data/constants';
import { calculateFreeBetConversion, convertOdds, validateOdds } from './utils/calculations';

export function FreeBetConverter() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [oddsFormat, setOddsFormat] = useState(oddsFormats[0]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showOddsFormatDropdown, setShowOddsFormatDropdown] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    freeBetAmount: '',
    backOdds: '',
    layOdds: '',
    commission: '2'
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [results, setResults] = useState<ResultsData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Real-time validation
  useEffect(() => {
    const validateField = (name: string, value: string) => {
      if (name === 'backOdds' || name === 'layOdds') {
        return validateOdds(value, oddsFormat.id) ? undefined : 'Invalid odds format';
      }
      if (name === 'freeBetAmount') {
        return value && isNaN(parseFloat(value)) ? 'Invalid amount' : undefined;
      }
      if (name === 'commission') {
        const commission = parseFloat(value);
        return isNaN(commission) || commission < 0 || commission > 100 ? 'Invalid commission' : undefined;
      }
      return undefined;
    };

    const newErrors: ValidationErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);
  }, [formData, oddsFormat]);

  // Calculate results when form is valid
  useEffect(() => {
    if (formData.freeBetAmount && formData.backOdds && formData.layOdds && Object.keys(errors).length === 0) {
      calculateResults();
    }
  }, [formData]);

  const calculateResults = () => {
    setIsCalculating(true);
    
    try {
      const backOdds = convertOdds(formData.backOdds, oddsFormat.id);
      const layOdds = convertOdds(formData.layOdds, oddsFormat.id);
      const freeBetAmount = parseFloat(formData.freeBetAmount) || 0;
      const commission = parseFloat(formData.commission) || 0;

      const results = calculateFreeBetConversion(backOdds, layOdds, freeBetAmount, commission);
      setResults(results);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format numeric inputs
    if (name === 'freeBetAmount' || name === 'commission') {
      const formatted = value.replace(/[^\d.]/g, '');
      if (formatted === '' || /^\d*\.?\d*$/.test(formatted)) {
        setFormData(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      freeBetAmount: '',
      backOdds: '',
      layOdds: '',
      commission: '2'
    });
    setErrors({});
    setResults(null);
  };

  const handleCopyResults = async () => {
    if (!results) return;

    const resultsText = `
Free Bet Conversion Results:
--------------------------
Free Bet Amount: ${currency.symbol}${formData.freeBetAmount}
Back Odds: ${formData.backOdds}
Lay Odds: ${formData.layOdds}
Exchange Commission: ${formData.commission}%

Conversion Rate: ${results.conversionRate.toFixed(2)}%
Converted Amount: ${currency.symbol}${results.convertedAmount.toFixed(2)}

Lay Stake: ${currency.symbol}${results.layStake.toFixed(2)}
Liability: ${currency.symbol}${results.liability.toFixed(2)}
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
            Free Bet Converter
          </h1>
          <p className="text-white/60 leading-relaxed">
            Convert your free bets into real cash by calculating the optimal lay stake for betting exchanges.
          </p>
        </div>

        {/* Main Calculator Form */}
        <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
          border border-[#8000FF]/20 rounded-xl">
          {/* Form Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#8000FF]" />
              </div>
              <h3 className="font-urbanist font-bold text-white text-lg">Free Bet Details</h3>
            </div>
            <div className="flex items-center gap-3">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="h-[42px] px-3 bg-white/5 border border-white/10 rounded-lg
                    hover:bg-white/10 transition-all text-white flex items-center gap-2
                    focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 focus:ring-[#8000FF]/40"
                  aria-label="Select currency"
                  aria-expanded={showCurrencyDropdown}
                  aria-haspopup="listbox"
                >
                  <DollarSign className="w-4 h-4 text-[#8000FF]" />
                  <span className="text-sm">{currency.symbol} {currency.name}</span>
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-[160px] bg-[#120D1D] border border-[#8000FF]/20 
                    rounded-xl shadow-lg overflow-hidden z-50"
                    role="listbox"
                  >
                    {currencies.map((curr) => (
                      <button
                        key={curr.name}
                        onClick={() => {
                          setCurrency(curr);
                          setShowCurrencyDropdown(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors
                          flex items-center gap-3"
                        role="option"
                        aria-selected={curr.name === currency.name}
                      >
                        <span className="text-[#8000FF]">{curr.symbol}</span>
                        <span className="text-white">{curr.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Odds Format Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowOddsFormatDropdown(!showOddsFormatDropdown)}
                  className="h-[42px] px-3 bg-white/5 border border-white/10 rounded-lg
                    hover:bg-white/10 transition-all text-white flex items-center gap-2
                    focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 focus:ring-[#8000FF]/40"
                  aria-label="Select odds format"
                  aria-expanded={showOddsFormatDropdown}
                  aria-haspopup="listbox"
                >
                  <Calculator className="w-4 h-4 text-[#8000FF]" />
                  <span className="text-sm whitespace-nowrap">{oddsFormat.name.split(' ')[0]}</span>
                </button>

                {showOddsFormatDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-[200px] bg-[#120D1D] border border-[#8000FF]/20 
                    rounded-xl shadow-lg overflow-hidden z-50"
                    role="listbox"
                  >
                    {oddsFormats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => {
                          setOddsFormat(format);
                          setShowOddsFormatDropdown(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-white/5 transition-all"
                        role="option"
                        aria-selected={format.id === oddsFormat.id}
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
                    Enter your free bet amount and the back odds from your chosen bookmaker.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#8000FF] text-xs">2</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    Input the lay odds available at your betting exchange and their commission rate.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#8000FF] text-xs">3</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    The calculator will show your optimal lay stake, liability, and the amount you'll convert your free bet into.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-3 bg-[#8000FF]/10 rounded-xl mb-6 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#8000FF] shrink-0 mt-0.5" />
            <p className="text-sm text-white/80">
              Convert your free bets into withdrawable cash by placing a back bet with your free bet and laying it off 
              at a betting exchange. This calculator helps you find the optimal lay stake.
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
            currency={currency}
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
        currency={currency}
        isCalculating={isCalculating}
      />
    </div>
  );
}