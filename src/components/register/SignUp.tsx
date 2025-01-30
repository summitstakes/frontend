import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanCard } from './components/PlanCard';
import { SignUpForm } from './components/SignUpForm';
import { plans } from './data/plans';
import { Wallet, CreditCard, Bitcoin, Globe2, ArrowRight, KeyRound, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function SignUp() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('pro');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const country = formData.get('country') as string;
    const language = formData.get('language') as string;

    try {
      // First, get the email template from the database
      const { data: templateData, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('language', language)
        .eq('type', 'confirmation')
        .single();

      if (templateError) {
        console.warn('Failed to fetch template, falling back to default:', templateError);
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            country,
            language,
            plan: `${selectedPlan}_plan`
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          // Use template from database if available, otherwise Supabase will use default
          ...(templateData && {
            email_template: {
              subject: templateData.subject,
              content: templateData.content
            }
          })
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      // Show confirmation screen
      setUserEmail(email);
      setShowConfirmation(true);

    } catch (err) {
      console.error('Signup error:', err);
      if (err instanceof Error) {
        if (err.message.includes('weak_password')) {
          setError('Password is too weak. Please ensure it meets all requirements.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: verificationError } = await supabase.auth.verifyOtp({
        email: userEmail,
        token: confirmationCode,
        type: 'signup'
      });

      if (verificationError) {
        throw verificationError;
      }

      // Redirect to login after successful verification
      navigate('/login');

    } catch (err) {
      console.error('Verification error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to verify code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-custom-dark flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
            blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
            blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
        </div>

        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] backdrop-blur-md 
            border border-[#8000FF]/20 rounded-2xl p-8 text-center relative">
            <div className="w-16 h-16 rounded-full bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-6">
              <KeyRound className="w-8 h-8 text-[#8000FF]" />
            </div>
            
            <h2 className="text-2xl font-urbanist font-bold text-white mb-4">Verify Your Email</h2>
            <p className="text-white/60 mb-6">
              Enter the 6-digit code sent to <span className="text-white font-medium">{userEmail}</span>
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl 
                flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-500/90">{error}</p>
              </div>
            )}

            <form onSubmit={handleVerification} className="space-y-6">
              {/* OTP Input */}
              <div className="relative">
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setConfirmationCode(value);
                  }}
                  className="w-full h-[52px] bg-white/5 border border-white/10 rounded-xl px-4
                    text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                    focus:ring-1 focus:ring-[#8000FF]/40 transition-all text-center tracking-[0.5em] font-mono"
                  placeholder="••••••"
                  required
                  maxLength={6}
                />
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading || confirmationCode.length !== 6}
                  className="w-full h-[48px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                    hover:bg-[#6700CC] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                    hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
                        translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                      <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
                        Verify Code
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmation(false);
                    setConfirmationCode('');
                    setError(null);
                  }}
                  className="w-full h-[48px] bg-white/5 text-white/60 font-urbanist font-bold rounded-xl
                    hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Signup
                </button>
              </div>

              <p className="text-sm text-white/40">
                Didn't receive the code? Check your spam folder or{' '}
                <button 
                  type="button"
                  onClick={() => {
                    setConfirmationCode('');
                    setError(null);
                    handleSubmit(new Event('submit') as any);
                  }}
                  className="text-[#8000FF] hover:text-[#6700CC] transition-colors"
                >
                  resend code
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-start">
          {/* Left Column - Plans */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white leading-tight">
                Join the Future of
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                  animate-gradient relative">
                  Smart Betting
                  <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                    from-transparent via-[#8000FF] to-transparent opacity-50" />
                </span>
              </h1>
              
              <p className="text-white/60 text-xl leading-relaxed max-w-xl">
                Get access to professional tools, real-time odds comparison, and expert insights to maximize 
                your betting success.
              </p>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-2 gap-6">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.type}
                  plan={plan}
                  selectedPlan={selectedPlan}
                  onSelect={setSelectedPlan}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="sticky top-8">
            <div className="relative">
              <SignUpForm
                selectedPlan={selectedPlan}
                isLoading={isLoading}
                error={error}
                onSubmit={handleSubmit}
              />

              {/* Payment Methods Panel */}
              <div className="absolute -right-[120px] top-1/2 -translate-y-1/2 w-[120px] h-[400px] 
                bg-gradient-to-br from-[#8000FF]/10 to-[#8000FF]/5 backdrop-blur-md 
                border-t border-r border-b border-[#8000FF]/20 rounded-r-2xl
                overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-[#8000FF]/20 bg-[#8000FF]/10">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#8000FF]" />
                    <span className="text-white font-urbanist font-bold text-sm">Payments</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col justify-between p-4">
                  {/* Local Payment Methods Section */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mb-3
                      hover:scale-110 transition-transform duration-500 group">
                      <CreditCard className="w-6 h-6 text-[#8000FF] group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="text-center">
                      <div className="text-white font-urbanist font-bold mb-1">200+</div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Local Payment Methods
                      </p>
                    </div>
                  </div>

                  {/* Decorative Divider */}
                  <div className="my-4 flex items-center gap-2">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#8000FF]/40 to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-[#8000FF]/40" />
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[#8000FF]/40 via-[#8000FF]/40 to-transparent" />
                  </div>

                  {/* Crypto Section */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mb-3
                      hover:scale-110 transition-transform duration-500 group">
                      <Bitcoin className="w-6 h-6 text-[#8000FF] group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="text-center">
                      <div className="text-white font-urbanist font-bold mb-1">Crypto</div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Payments Accepted
                      </p>
                    </div>
                  </div>
                </div>

                {/* Background Glow Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#8000FF]/10 rounded-full blur-2xl 
                    animate-pulse" style={{ animationDuration: '4s' }} />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8000FF]/10 rounded-full blur-2xl 
                    animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}