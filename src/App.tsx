import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/home/HomePage';
import { FloatingWidget } from './components/floatingwidget/FloatingWidget';
import { LoginPage } from './components/login/LoginPage';
import { SignUp } from './components/register/SignUp';
import { FAQ } from './components/faq';
import { Footer } from './components/nav&footer/Footer';
import { NavBar } from './components/nav&footer/nav/NavBar';
import { AllCalculators } from './components/calculators/allcalculators/AllCalculators';
import { CalculatorLayout } from './components/calculators/allcalculators/CalculatorLayout';
import { ArbitrageCalculator } from './components/calculators/arbitragecalculator/ArbitrageCalculator';
import { FreeBetConverter } from './components/calculators/freebetconverter/FreeBetConverter';
import { OddsConverter } from './components/calculators/oddsconverter/OddsConverter';
import { VigCalculator } from './components/calculators/vigcalculator/VigCalculator';
import { RegionPopup } from './components/popups/RegionPopup';
import { LocationModal } from './components/popups/locationchange/LocationModal';
import { ContactPage } from './components/contact/ContactPage';
import { ProInsights } from './components/proinsights/ProInsights';
import { ArticlePage } from './components/article/ArticlePage';
import { AllSportsPage } from './components/allsports/AllSportsPage';
import { CalendarPage } from './components/calendar/CalendarPage';
import { AllTools } from './components/alltools/AllTools';
import { Sportsbooks } from './components/sportsbooks/Sportsbooks';
import { BetTrackerPage } from './components/bettracker/BetTrackerPage';
import { AccountLayout } from './components/account/AccountLayout';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import { NotificationProvider } from './components/notifications/NotificationProvider';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [showRegionPopup, setShowRegionPopup] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    // Clean up subscription
    return () => subscription.unsubscribe();
  }, []);

  const handleRegionContinue = (province: string) => {
    setShowRegionPopup(false);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-[#06060C] flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      );
    }

    if (!session) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  };

  return (
    <NotificationProvider>
      <Router>
        <ScrollToTop />
        <div className={`min-h-screen bg-custom-dark flex flex-col ${showRegionPopup || showLocationModal ? 'blur-[2px] brightness-50 pointer-events-none' : ''}`}>
          {/* NavBar */}
          <div className="pt-[40px] relative z-30">
            <NavBar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contactus" element={<ContactPage />} />
              <Route path="/proinsights" element={<ProInsights />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/calculators" element={<AllCalculators />} />
              <Route path="/calculators" element={<CalculatorLayout />}>
                <Route path="arbitrage" element={<ArbitrageCalculator />} />
                <Route path="free-bet" element={<FreeBetConverter />} />
                <Route path="odds-converter" element={<OddsConverter />} />
                <Route path="vig" element={<VigCalculator />} />
              </Route>
              <Route path="/sports" element={<AllSportsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/tools" element={<AllTools />} />
              <Route path="/sportsbooks" element={<Sportsbooks />} />
              <Route path="/bettracker" element={
                <ProtectedRoute>
                  <BetTrackerPage />
                </ProtectedRoute>
              } />
              <Route path="/account/*" element={
                <ProtectedRoute>
                  <AccountLayout />
                </ProtectedRoute>
              } />
            </Routes>
            <FloatingWidget />
          </div>

          {/* Footer */}
          <Footer />
        </div>

        {/* Region Selection Popup */}
        {showRegionPopup && (
          <RegionPopup
            onContinue={handleRegionContinue}
            onChangeLocation={() => {
              setShowLocationModal(true);
              setShowRegionPopup(false);
            }}
          />
        )}

        {/* Location Modal */}
        <LocationModal
          isOpen={showLocationModal}
          onClose={() => {
            setShowLocationModal(false);
            setShowRegionPopup(true);
          }}
          currentLocation="Canada"
        />
      </Router>
    </NotificationProvider>
  );
}