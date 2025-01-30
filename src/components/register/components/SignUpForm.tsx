import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, User, Star, Crown, Check, Search, Globe2, Building2, Languages, Shield, X } from 'lucide-react';
import { SignUpFormProps } from '../types';
import { supabase } from '../../../lib/supabase';

type CountryResponse = {
  id: string;
  name: string;
  code: string;
  region_id: string;
  region: {
    name: string;
  };
};

type LanguageResponse = {
  id: string;
  code: string;
  name: string;
  native_name: string;
  region: string;
  active: boolean;
};

type StateProvinceResponse = {
  id: string;
  name: string;
  code: string | null;
  type: 'state' | 'province';
};

type DropdownType = 'country' | 'state' | 'language' | null;

export function SignUpForm({ selectedPlan, isLoading, error, onSubmit }: SignUpFormProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    language: '',
    password: '',
    confirmPassword: '',
    acceptPolicy: false
  });

  // Location selection state
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [groupedCountries, setGroupedCountries] = useState<Record<string, CountryResponse[]>>({});
  const [selectedStateOrProvince, setSelectedStateOrProvince] = useState<string | null>(null);
  const [stateSearch, setStateSearch] = useState('');
  const [statesProvinces, setStatesProvinces] = useState<StateProvinceResponse[]>([]);
  const [isLoadingStatesProvinces, setIsLoadingStatesProvinces] = useState(false);
  const [languages, setLanguages] = useState<LanguageResponse[]>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(true);
  const [languageSearch, setLanguageSearch] = useState('');
  const [groupedLanguages, setGroupedLanguages] = useState<Record<string, LanguageResponse[]>>({});

  // Refs for click outside handling
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const stateDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown handler
  const toggleDropdown = (type: DropdownType) => {
    if (type === 'state' && statesProvinces.length === 0) {
      return;
    }
    
    setActiveDropdown(current => current === type ? null : type);
    
    // Reset search when closing dropdown
    if (type === 'country') {
      setCountrySearch('');
    } else if (type === 'state') {
      setStateSearch('');
    } else if (type === 'language') {
      setLanguageSearch('');
    }
  };

  // Country selection handlers
  const getSelectedCountryData = () => {
    if (!formData.country) return null;
    return countries.find(c => c.code === formData.country);
  };

  const hasStatesOrProvinces = (country: CountryResponse) => {
    return ['CA', 'US'].includes(country.code);
  };

  const handleCountrySelect = (country: CountryResponse) => {
    setFormData(prev => ({ ...prev, country: country.code }));
    setSelectedStateOrProvince(null);
    setStatesProvinces([]);
    
    if (hasStatesOrProvinces(country)) {
      toggleDropdown('state');
    } else {
      setActiveDropdown(null);
    }
  };

  const handleStateSelect = (state: StateProvinceResponse) => {
    setSelectedStateOrProvince(state.name);
    setActiveDropdown(null);
  };

  const getCountryDisplayText = () => {
    const country = getSelectedCountryData();
    if (!country) return 'Select country';
    if (selectedStateOrProvince) {
      const stateProvince = statesProvinces.find(sp => sp.name === selectedStateOrProvince);
      return `${country.name} (${stateProvince?.code || selectedStateOrProvince})`;
    }
    return country.name;
  };

  // Language selection handlers
  const getLanguageDisplayText = () => {
    if (!formData.language) return 'Select language';
    const language = languages.find(l => l.code === formData.language);
    if (!language) return 'Select language';
    return `${language.name} (${language.native_name})`;
  };

  const handleLanguageSelect = (language: LanguageResponse) => {
    setFormData(prev => ({ ...prev, language: language.code }));
    setActiveDropdown(null);
    setLanguageSearch('');
  };

  // Fetch states/provinces
  useEffect(() => {
    const fetchStatesProvinces = async () => {
      if (!formData.country) {
        setStatesProvinces([]);
        return;
      }

      setIsLoadingStatesProvinces(true);
      try {
        const { data: countryData } = await supabase
          .from('countries')
          .select('id')
          .eq('code', formData.country)
          .single();

        if (countryData) {
          const { data, error } = await supabase
            .from('states_provinces')
            .select('id, name, code, type')
            .eq('country_id', countryData.id);

          if (error) throw error;
          setStatesProvinces(data || []);
          
          if (data?.length > 0) {
            setActiveDropdown('state');
          }
        }
      } catch (error) {
        console.error('Error fetching states/provinces:', error);
        setStatesProvinces([]);
      } finally {
        setIsLoadingStatesProvinces(false);
      }
    };

    fetchStatesProvinces();
  }, [formData.country]);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data, error } = await supabase
          .from('countries')
          .select(`
            id,
            name,
            code,
            region_id,
            region:regions(name)
          `)
          .order('name');

        if (error) throw error;

        const grouped = (data as CountryResponse[]).reduce((acc, country) => {
          const regionName = country.region.name;
          if (!acc[regionName]) {
            acc[regionName] = [];
          }
          acc[regionName].push(country);
          return acc;
        }, {} as Record<string, CountryResponse[]>);

        setGroupedCountries(grouped);
        setCountries(data as CountryResponse[]);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Fetch languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase
          .from('languages')
          .select('*')
          .eq('active', true)
          .order('name');

        if (error) throw error;

        const grouped = (data as LanguageResponse[]).reduce((acc, language) => {
          if (!acc[language.region]) {
            acc[language.region] = [];
          }
          acc[language.region].push(language);
          return acc;
        }, {} as Record<string, LanguageResponse[]>);

        setGroupedLanguages(grouped);
        setLanguages(data as LanguageResponse[]);
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setIsLoadingLanguages(false);
      }
    };

    fetchLanguages();
  }, []);

  // Filter countries based on search
  const filteredGroupedCountries = countrySearch
    ? Object.entries(groupedCountries).reduce((acc, [region, countries]) => {
        const filtered = countries.filter(country => 
          country.name.toLowerCase().includes(countrySearch.toLowerCase().trim())
        );
        if (filtered.length > 0) {
          acc[region] = filtered;
        }
        return acc;
      }, {} as Record<string, CountryResponse[]>)
    : groupedCountries;

  // Filter states/provinces based on search
  const getFilteredStatesOrProvinces = () => {
    if (!stateSearch) return statesProvinces;
    const normalizedSearch = stateSearch.toLowerCase().trim();
    return statesProvinces.filter(item => 
      item.name.toLowerCase().includes(normalizedSearch)
    );
  };

  // Filter languages based on search
  const filteredGroupedLanguages = languageSearch
    ? Object.entries(groupedLanguages).reduce((acc, [region, languages]) => {
        const filtered = languages.filter(language => 
          language.name.toLowerCase().includes(languageSearch.toLowerCase().trim()) ||
          language.native_name.toLowerCase().includes(languageSearch.toLowerCase().trim())
        );
        if (filtered.length > 0) {
          acc[region] = filtered;
        }
        return acc;
      }, {} as Record<string, LanguageResponse[]>)
    : groupedLanguages;

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activeDropdown === 'country' && 
          countryDropdownRef.current && 
          !countryDropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setCountrySearch('');
      }
      if (activeDropdown === 'state' && 
          stateDropdownRef.current && 
          !stateDropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setStateSearch('');
      }
      if (activeDropdown === 'language' && 
          languageDropdownRef.current && 
          !languageDropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setLanguageSearch('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] backdrop-blur-md 
      border border-[#8000FF]/20 rounded-2xl p-6">
      <h2 className="text-2xl font-urbanist font-bold text-white mb-6">Create Account</h2>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl 
          flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-500/90">{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Plan Confirmation */}
        <div className="p-4 bg-[#8000FF]/10 rounded-xl border border-[#8000FF]/20 mb-6 relative">
          {/* Selected Plan Badge */}
          <div className="absolute -top-2.5 -right-2.5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] blur-md opacity-50" />
              <div className="relative flex flex-col">
                <div className="px-2.5 py-1 bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full
                  flex items-center gap-1.5 shadow-lg">
                  <span className="text-white text-xs font-bold tracking-wide">Selected Plan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#8000FF]/20 flex items-center justify-center">
              {selectedPlan === 'pro' ? (
                <Star className="w-5 h-5 text-[#8000FF]" />
              ) : (
                <Crown className="w-5 h-5 text-[#8000FF]" />
              )}
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white">
                {selectedPlan === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </h3>
              <p className="text-white/60 text-sm">
                {selectedPlan === 'pro' ? '$50/month' : '$0/month'}
              </p>
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            {selectedPlan === 'pro' 
              ? "You're signing up for our Pro plan with full access to all premium features. You can cancel or change your plan anytime."
              : "You're signing up for our Free plan. You can upgrade to Pro anytime to unlock all premium features."}
          </p>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">First Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                  text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                  focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                placeholder="John"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Last Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                  text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                  focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/60">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Country & Language */}
        <div className="grid grid-cols-2 gap-4">
          {/* Country Select */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Country</label>
            <div className="relative" ref={countryDropdownRef}>
              <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <button
                type="button"
                onClick={() => toggleDropdown(statesProvinces.length > 0 && !selectedStateOrProvince ? 'state' : 'country')}
                className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                  text-left focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 
                  focus:ring-[#8000FF]/40 transition-all flex items-center justify-between"
              >
                <span className={formData.country ? 'text-white' : 'text-white/40'}>
                  {getCountryDisplayText()}
                </span>
                <ArrowRight className={`w-4 h-4 text-white/40 transition-transform duration-300
                  ${activeDropdown ? 'rotate-90' : ''}`} />
              </button>

              {/* Country Dropdown */}
              {activeDropdown === 'country' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#120D1D] border border-[#8000FF]/20 
                  rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {/* Search Input */}
                  <div className="p-3 border-b border-[#8000FF]/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full h-[36px] bg-white/5 border border-white/10 rounded-lg pl-10 pr-4
                          text-white/60 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                          focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Countries List */}
                  <div className="max-h-[240px] overflow-y-auto">
                    {isLoadingCountries ? (
                      <div className="p-4 text-center">
                        <Loader2 className="w-5 h-5 text-[#8000FF] animate-spin mx-auto" />
                      </div>
                    ) : Object.keys(filteredGroupedCountries).length === 0 ? (
                      <div className="p-4 text-center text-white/40 text-sm">
                        No countries found
                      </div>
                    ) : (
                      Object.entries(filteredGroupedCountries).map(([region, countries]) => (
                        <div key={region}>
                          {/* Region Header */}
                          <div className="px-4 py-2 bg-[#8000FF]/10 border-y border-[#8000FF]/20">
                            <span className="text-[#8000FF] text-xs font-medium">{region}</span>
                          </div>

                          {/* Countries in Region */}
                          {countries.map(country => (
                            <button
                              key={country.id}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                                flex items-center justify-between"
                            >
                              <span className={`text-sm ${formData.country === country.code 
                                ? 'text-[#8000FF]' 
                                : 'text-white/60 hover:text-white'}`}>
                                {country.name}
                              </span>
                              <div className="flex items-center gap-2">
                                {formData.country === country.code && !selectedStateOrProvince && (
                                  <Check className="w-4 h-4 text-[#8000FF]" />
                                )}
                                {hasStatesOrProvinces(country) && (
                                  <ArrowRight className="w-4 h-4 text-white/40" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* State/Province Dropdown */}
              {activeDropdown === 'state' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#120D1D] border border-[#8000FF]/20 
                  rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
                  ref={stateDropdownRef}
                >
                  {/* Search Input */}
                  <div className="p-3 border-b border-[#8000FF]/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search states/provinces..."
                        value={stateSearch}
                        onChange={(e) => setStateSearch(e.target.value)}
                        className="w-full h-[36px] bg-white/5 border border-white/10 rounded-lg pl-10 pr-4
                          text-white/60 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                          focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* States/Provinces List */}
                  <div className="max-h-[240px] overflow-y-auto">
                    {isLoadingStatesProvinces ? (
                      <div className="p-4 text-center">
                        <Loader2 className="w-5 h-5 text-[#8000FF] animate-spin mx-auto" />
                      </div>
                    ) : getFilteredStatesOrProvinces().length === 0 ? (
                      <div className="p-4 text-center text-white/40 text-sm">
                        No states/provinces found
                      </div>
                    ) : (
                      getFilteredStatesOrProvinces().map(state => (
                        <button
                          key={state.id}
                          type="button"
                          onClick={() => handleStateSelect(state)}
                          className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                            flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${selectedStateOrProvince === state.name 
                              ? 'text-[#8000FF]' 
                              : 'text-white/60 hover:text-white'}`}>
                              {state.name}
                            </span>
                            {state.code && (
                              <span className="text-white/40 text-xs">
                                ({state.code})
                              </span>
                            )}
                          </div>
                          {selectedStateOrProvince === state.name && (
                            <Check className="w-4 h-4 text-[#8000FF]" />
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Language Select */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Language</label>
            <div className="relative" ref={languageDropdownRef}>
              <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'language' ? null : 'language')}
                className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                  text-left focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 
                  focus:ring-[#8000FF]/40 transition-all flex items-center justify-between"
              >
                <span className={formData.language ? 'text-white' : 'text-white/40'}>
                  {getLanguageDisplayText()}
                </span>
                <ArrowRight className={`w-4 h-4 text-white/40 transition-transform duration-300
                  ${activeDropdown === 'language' ? 'rotate-90' : ''}`} />
              </button>

              {/* Language Dropdown */}
              {activeDropdown === 'language' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#120D1D] border border-[#8000FF]/20 
                  rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {/* Search Input */}
                  <div className="p-3 border-b border-[#8000FF]/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search languages..."
                        value={languageSearch}
                        onChange={(e) => setLanguageSearch(e.target.value)}
                        className="w-full h-[36px] bg-white/5 border border-white/10 rounded-lg pl-10 pr-4
                          text-white/60 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                          focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Languages List */}
                  <div className="max-h-[200px] overflow-y-auto">
                    {isLoadingLanguages ? (
                      <div className="p-4 text-center">
                        <Loader2 className="w-5 h-5 text-[#8000FF] animate-spin mx-auto" />
                      </div>
                    ) : Object.entries(groupedLanguages).map(([region, languages]) => (
                      <div key={region}>
                        <div className="px-4 py-2 bg-[#8000FF]/10 border-y border-[#8000FF]/20">
                          <span className="text-[#8000FF] text-xs font-medium">{region}</span>
                        </div>
                        {languages.map(language => (
                          <button
                            key={language.code}
                            onClick={() => handleLanguageSelect(language)}
                            className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                              flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${formData.language === language.code 
                                ? 'text-[#8000FF]' 
                                : 'text-white/60'}`}>
                                {language.name}
                              </span>
                              <span className="text-white/40 text-xs">
                                ({language.native_name})
                              </span>
                            </div>
                            {formData.language === language.code && (
                              <Check className="w-4 h-4 text-[#8000FF]" />
                            )}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password Fields */}
<div className="grid grid-cols-2 gap-4">
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-white/60">Password</label>
    <div className="relative group">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
        className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-12
          text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
          focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
        placeholder="••••••••"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 
          hover:text-white/60 transition-colors"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>

      {/* Password Requirements Popup */}
      <div className="absolute top-full left-0 mt-2 w-[280px] bg-[#120D1D] border border-[#8000FF]/20 
        rounded-xl shadow-lg overflow-hidden z-50 opacity-0 translate-y-2 invisible
        group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:visible
        transition-all duration-300">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-[#8000FF]" />
            <span className="text-white text-sm font-medium">Password Requirements</span>
          </div>
          <div className="space-y-2">
            {[
              { 
                label: 'At least 8 characters',
                valid: formData.password.length >= 8
              },
              {
                label: 'One uppercase letter',
                valid: /[A-Z]/.test(formData.password)
              },
              {
                label: 'One lowercase letter',
                valid: /[a-z]/.test(formData.password)
              },
              {
                label: 'One number',
                valid: /\d/.test(formData.password)
              },
              {
                label: 'One special character',
                valid: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
              }
            ].map((requirement, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center
                  ${requirement.valid 
                    ? 'bg-emerald-500/20 text-emerald-500' 
                    : 'bg-white/5 text-white/40'}`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className={`text-sm ${requirement.valid 
                  ? 'text-emerald-500' 
                  : 'text-white/60'}`}>
                  {requirement.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="space-y-1.5">
    <label className="text-sm font-medium text-white/60">Confirm Password</label>
    <div className="relative group">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
      <input
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        onBlur={() => {
          // Clear confirm password field if it's empty
          if (!formData.confirmPassword) {
            setFormData(prev => ({ ...prev, confirmPassword: '' }));
          }
        }}
        required
        className={`w-full h-[42px] bg-white/5 border rounded-xl pl-12 pr-12
          text-white placeholder:text-white/20 focus:outline-none focus:ring-1
          transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword
            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
            : formData.confirmPassword && formData.password === formData.confirmPassword
              ? 'border-emerald-500/50 focus:border-emerald-500/50 focus:ring-emerald-500/20'
              : 'border-white/10 focus:border-[#8000FF]/40 focus:ring-[#8000FF]/40'
          }`}
        placeholder="••••••••"
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 
          hover:text-white/60 transition-colors"
      >
        {showConfirmPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>

      {/* Password Match Indicator */}
      {formData.confirmPassword && document.activeElement === document.querySelector('input[name="confirmPassword"]') && (
        <div className="absolute top-full left-0 mt-2 w-full bg-[#120D1D] border border-[#8000FF]/20 
          rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in-50 slide-in-from-top-2">
          <div className={`p-3 flex items-center gap-2 ${
            formData.password === formData.confirmPassword
              ? 'bg-emerald-500/10 border-b border-emerald-500/20'
              : 'bg-red-500/10 border-b border-red-500/20'
          }`}>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              formData.password === formData.confirmPassword
                ? 'bg-emerald-500/20 text-emerald-500'
                : 'bg-red-500/20 text-red-500'
            }`}>
              {formData.password === formData.confirmPassword ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
            </div>
            <span className={`text-sm ${
              formData.password === formData.confirmPassword
                ? 'text-emerald-500'
                : 'text-red-500'
            }`}>
              {formData.password === formData.confirmPassword
                ? 'Passwords match'
                : 'Passwords do not match'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

        {/* Privacy Policy & Terms of Service */}
<label className="flex items-center gap-3 cursor-pointer group">
  <div className="relative">
    <input
      type="checkbox"
      name="acceptPolicy"
      checked={formData.acceptPolicy}
      onChange={handleInputChange}
      required
      className="sr-only peer"
    />
    <div className="w-5 h-5 border-2 border-white/20 rounded 
      peer-checked:border-[#8000FF] peer-checked:bg-[#8000FF] transition-all" />
    <Check className="absolute inset-0 text-white opacity-0 
      peer-checked:opacity-100 transition-opacity" />
  </div>
  <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
    I accept the{' '}
    <button type="button" className="text-[#8000FF] hover:text-[#6700CC] transition-colors">
      Privacy Policy
    </button>
    {' '}and{' '}
    <button type="button" className="text-[#8000FF] hover:text-[#6700CC] transition-colors">
      Terms of Service
    </button>
  </span>
</label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.acceptPolicy}
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
                {selectedPlan === 'pro' ? 'Next' : 'Create Account'}
              </span>
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-white/60">Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-[#8000FF] hover:text-[#6700CC] font-medium transition-colors"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}