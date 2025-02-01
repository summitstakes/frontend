import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigation, Menu, Languages, Star } from 'lucide-react';
import { LocationModal } from '../../popups/locationchange/LocationModal';
import { AsianHandicap } from '../../popups/AsianHandicap';
import { supabase } from '../../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Profile, NavBarProps } from './types';
import { MenuItem } from './components/MenuItem';
import { AccountButton } from './components/AccountButton';
import { LocationBadge } from './components/LocationBadge';
import { menuItems, languages, buttonClasses } from './constants';

export function NavBar({ className = '' }: NavBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showHandicapGuide, setShowHandicapGuide] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user.id) {
        getProfile(session.user.id);
      }
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user.id) {
        await getProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLangChange = (code: string) => {
    setActiveLang(code);
    setShowLangDropdown(false);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.isTemp) {
      setShowHandicapGuide(true);
    } else if (!item.hasDropdown && item.path) {
      navigate(item.path);
    }
    setActiveDropdown(null);
  };

  const handleMenuItemHover = (itemName: string | null) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }

    if (itemName !== activeDropdown) {
      setActiveDropdown(itemName);
    }
  };

  const handleMenuItemLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleDropdownHover = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const isMenuItemActive = (item: any) => {
    if (!item.path) return false;
    if (item.path === location.pathname) return true;
    if (item.dropdownItems) {
      return item.dropdownItems.some((dropItem: any) => dropItem.path === location.pathname);
    }
    return false;
  };

  return (
    <>
      <div className={`max-w-[1440px] mx-auto px-6 ${className}`}>
        <nav className="h-[80px] bg-gradient-to-r from-[#120D1D]/95 via-[#120D1D]/98 to-[#120D1D]/95 
          backdrop-blur-md border border-white/[0.02] rounded-2xl flex items-center shadow-lg
          hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.15)] transition-all duration-500 relative"
          ref={navRef}>
          <LocationBadge 
            location="Canada"
            onClick={() => setShowLocationModal(true)}
          />

          <div className="flex items-center justify-between w-full px-8">
            <div 
              onClick={() => navigate('/')}
              className="w-[140px] h-[60px] rounded-xl flex items-center justify-center cursor-pointer shrink-0
                hover:scale-105 transition-transform duration-300 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/10 to-[#8000FF]/0
                opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <img 
                src="https://imgur.com/aJzVj8P.png" 
                alt="Custom Logo" 
                className="h-full w-auto object-contain relative z-10" 
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-3">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    item={item}
                    isActive={isMenuItemActive(item)}
                    activeDropdown={activeDropdown}
                    onHover={handleMenuItemHover}
                    onLeave={handleMenuItemLeave}
                    onClick={handleMenuItemClick}
                    onDropdownHover={handleDropdownHover}
                    onDropdownLeave={handleDropdownLeave}
                  />
                ))}
              </div>

              <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent mx-4 
                before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b 
                before:from-transparent before:via-[#8000FF]/30 before:to-transparent before:blur-sm relative" />

              <div className="flex items-center gap-4">
                <div className="w-[140px] h-[42px] relative">
                  {isAuthLoading ? (
                    <div className="absolute inset-0 bg-white/5 rounded-xl animate-pulse" />
                  ) : (
                    <>
                      <div className={`absolute inset-0 transition-all duration-300
                        ${!session ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                        <button 
                          onClick={() => navigate('/signup')}
                          className={`${buttonClasses.common} ${buttonClasses.primary}`}
                          disabled={!!session}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6700CC] opacity-0 
                            group-hover:opacity-100 transition-opacity" />
                          <span className="relative z-10">Join For Free</span>
                        </button>
                      </div>

                      <div className={`absolute inset-0 transition-all duration-300
                        ${session && profile?.plan === 'free_plan' 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                        <button 
                          onClick={() => navigate('/signup')}
                          className={`${buttonClasses.common} ${buttonClasses.primary}`}
                          disabled={!session || profile?.plan !== 'free_plan'}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6700CC] opacity-0 
                            group-hover:opacity-100 transition-opacity" />
                          <div className="relative z-10 flex items-center justify-center gap-2">
                            <Star className="w-4 h-4" />
                            <span>Upgrade</span>
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div ref={accountDropdownRef}>
                  <AccountButton
                    session={session}
                    profile={profile}
                    showDropdown={showAccountDropdown}
                    setShowDropdown={setShowAccountDropdown}
                    onSignOut={handleSignOut}
                    isLoading={isAuthLoading}
                  />
                </div>

                <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent mx-4 
                  before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b 
                  before:from-transparent before:via-[#8000FF]/30 before:to-transparent before:blur-sm relative" />

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowLocationModal(true)}
                    className="h-[42px] w-[42px] rounded-xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                      border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
                      flex items-center justify-center text-white hover:text-[#8000FF] relative group shrink-0"
                  >
                    <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 
                      transition-opacity rounded-xl" />
                    <Navigation className="w-5 h-5" />
                  </button>

                  <div className="relative shrink-0" ref={langDropdownRef}>
                    <button 
                      onClick={() => setShowLangDropdown(!showLangDropdown)}
                      className="h-[42px] min-w-[42px] px-3 rounded-xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                        border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
                        flex items-center justify-center text-white hover:text-[#8000FF] relative group"
                      aria-expanded={showLangDropdown}
                      aria-controls="language-dropdown"
                    >
                      <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 
                        transition-opacity rounded-xl" />
                      <Languages className="w-4 h-4 text-[#8000FF]" />
                      <span className="font-urbanist font-bold text-[13px] ml-1">{activeLang}</span>
                    </button>

                    {showLangDropdown && (
                      <div 
                        id="language-dropdown"
                        className="absolute top-full right-0 mt-2 w-[280px] bg-gradient-to-br from-[#1A1527]/95 
                          to-[#120D1D]/95 backdrop-blur-md border border-[#8000FF]/20 rounded-xl shadow-lg 
                          overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
                        role="menu"
                      >
                        <div className="max-h-[320px] overflow-y-auto">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => handleLangChange(lang.code)}
                              className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                                flex items-center justify-between group/item"
                              role="menuitem"
                            >
                              <span className="text-white/60 text-sm group-hover/item:text-white transition-colors">
                                {lang.name}
                              </span>
                              {activeLang === lang.code && (
                                <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-[#8000FF]" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="h-[42px] w-[42px] rounded-xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                    border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
                    flex items-center justify-center text-white hover:text-[#8000FF] relative group lg:hidden shrink-0"
                  >
                    <div className="absolute inset-0 bg-[#8000FF] opacity-0 group-hover:opacity-10 
                      transition-opacity rounded-xl" />
                    <Menu className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        currentLocation="Canada"
      />
      
      <AsianHandicap
        isOpen={showHandicapGuide}
        onClose={() => setShowHandicapGuide(false)}
      />
    </>
  );
}