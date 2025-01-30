import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { ResetSentMessage } from './ResetSentMessage';
import { LoginView } from './types';
import { Target, Trophy, Zap, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../notifications/NotificationProvider';

export function LoginPage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<LoginView>('login');

  // Basic email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs before making API call
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (signInError) {
        // Handle specific error cases
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password');
        }
        if (signInError.message.includes('Email not confirmed')) {
          throw new Error('Please verify your email address before logging in');
        }
        throw signInError;
      }

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user?.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      // Construct welcome message based on profile data
      let welcomeMessage = 'Welcome back! 👋';
      if (profile?.first_name) {
        welcomeMessage = `Welcome back, ${profile.first_name}! 👋`;
      }

      // Show success notification
      showNotification(welcomeMessage, 'success');

      // Redirect to home page
      navigate('/');

    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (resetError) {
        if (resetError.message.includes('Email not found')) {
          throw new Error('No account found with this email address');
        }
        throw resetError;
      }

      setView('reset-sent');
    } catch (err) {
      console.error('Password reset error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-custom-dark relative overflow-hidden">
      <div className="fixed inset-0 w-[60%] bg-[#06060C] pointer-events-none hidden lg:block z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full 
          bg-gradient-to-br from-[#8000FF]/20 to-transparent blur-3xl animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full 
          bg-gradient-to-bl from-[#8000FF]/30 to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '6s' }} />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full 
          bg-gradient-to-tr from-[#8000FF]/10 to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '5s' }} />
      </div>

      <div className="fixed inset-0 left-[60%] right-0 bg-[#06060C] pointer-events-none hidden lg:block z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/[0.01] to-transparent" />
      </div>

      <div className="relative z-10 -mt-[120px]">
        <div className="flex h-screen pt-[100px]">
          <div className="hidden lg:flex lg:w-[60%] relative">
            <div className="relative w-full flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center">
                <div className="max-w-[600px] px-12">
                  <div className="space-y-3 mb-10">
                    <h1 className="text-4xl sm:text-5xl font-urbanist font-extrabold text-white leading-tight">
                      Your Account for
                      <br />
                      <span className="text-5xl sm:text-6xl bg-clip-text text-transparent 
                        bg-gradient-to-r from-[#8000FF] to-[#A366FF]">
                        Everything Sports Betting
                      </span>
                    </h1>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    {[
                      {
                        icon: <Target className="w-6 h-6" />,
                        title: 'Smart Odds',
                        desc: 'Real-time comparison across major sportsbooks'
                      },
                      {
                        icon: <Trophy className="w-6 h-6" />,
                        title: 'Pro Insights',
                        desc: 'Expert analysis and predictions'
                      },
                      {
                        icon: <Zap className="w-6 h-6" />,
                        title: 'Live Updates',
                        desc: 'Instant notifications on odds changes'
                      },
                      {
                        icon: <ChevronRight className="w-6 h-6" />,
                        title: 'Get Started',
                        desc: 'Join thousands of smart bettors',
                        isAction: true
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={`p-5 rounded-2xl border transition-all duration-300 group
                          ${item.isAction 
                            ? 'bg-gradient-to-br from-[#8000FF] to-[#6700CC] border-transparent cursor-pointer hover:shadow-[0_0_30px_rgba(128,0,255,0.3)]' 
                            : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.08]'
                          }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3
                          ${item.isAction 
                            ? 'bg-white/20' 
                            : 'bg-[#8000FF]/10'
                          }`}>
                          <div className={item.isAction ? 'text-white' : 'text-[#8000FF]'}>
                            {item.icon}
                          </div>
                        </div>
                        <h3 className={`font-urbanist font-bold text-lg mb-1.5
                          ${item.isAction ? 'text-white' : 'text-white/90'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm leading-relaxed
                          ${item.isAction ? 'text-white/80' : 'text-white/50'}`}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex items-center justify-center p-6">
            <div className="w-full max-w-[440px]">
              <div className="bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                backdrop-blur-md border border-[#8000FF]/20 rounded-2xl p-7 shadow-lg
                hover:border-[#8000FF]/30 transition-all duration-300">
                {view === 'login' && (
                  <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    error={error}
                    isLoading={isLoading}
                    setView={setView}
                    handleSubmit={handleSubmit}
                  />
                )}
                {view === 'forgot-password' && (
                  <ForgotPasswordForm
                    email={email}
                    setEmail={setEmail}
                    error={error}
                    isLoading={isLoading}
                    setView={setView}
                    handleForgotPassword={handleForgotPassword}
                  />
                )}
                {view === 'reset-sent' && (
                  <ResetSentMessage
                    email={email}
                    setView={setView}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}