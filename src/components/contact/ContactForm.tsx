import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageSquare, Send, Globe2, Languages, User, ArrowRight, Loader2, Check, AlertCircle, Search, List } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../notifications/NotificationProvider';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  country: string;
  language: string;
  message: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface ContactFormProps {
  categories: { value: string; label: string; }[];
  languages: { value: string; label: string; }[];
}

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

type DropdownType = 'country' | 'state' | 'language' | 'category' | null;

export function ContactForm({ categories }: ContactFormProps) {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    category: '',
    country: '',
    language: '',
    message: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [messageLength, setMessageLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const maxMessageLength = 500;

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
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown handler with improved focus management
  const toggleDropdown = (type: DropdownType) => {
    if (type === 'state' && statesProvinces.length === 0) {
      return; // Don't open state dropdown if no states available
    }
    
    setActiveDropdown(current => current === type ? null : type);
    
    // Reset search when closing dropdown
    if (type === 'country') {
      setCountrySearch('');
    } else if (type === 'state') {
      setStateSearch('');
    }
  };

  // Validation handler with improved error messages
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() ? undefined : `${name === 'firstName' ? 'First' : 'Last'} name is required`;
      case 'email':
        if (!value) return 'Email is required';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Please enter a valid email address';
      case 'message':
        if (!value.trim()) return 'Message is required';
        return value.length > maxMessageLength ? `Message cannot exceed ${maxMessageLength} characters` : undefined;
      default:
        return undefined;
    }
  };

  // Country selection handlers with improved state management
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
    setStatesProvinces([]); // Reset states list
    
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

  // Get selected language display text
  const getLanguageDisplayText = () => {
    if (!formData.language) return 'Select language';
    const language = languages.find(l => l.code === formData.language);
    if (!language) return 'Select language';
    return `${language.name} (${language.native_name})`;
  };

  // Handle language selection
  const handleLanguageSelect = (language: LanguageResponse) => {
    setFormData(prev => ({ ...prev, language: language.code }));
    setActiveDropdown(null);
    setLanguageSearch('');
  };

  // Fetch states/provinces with improved error handling
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

  // Fetch countries on mount with improved error handling
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

        // Group countries by region
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

  // Fetch languages on mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase
          .from('languages')
          .select('*')
          .eq('active', true)
          .order('name');

        if (error) throw error;

        // Group languages by region
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

  // Filter countries based on search with improved performance
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

  // Click outside handler for dropdowns
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
       if (activeDropdown === 'category' && 
        categoryDropdownRef.current && 
        !categoryDropdownRef.current.contains(event.target as Node)) {
      setActiveDropdown(null);
        }
  }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Form validation with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newErrors: ValidationErrors = {};
      Object.entries(formData).forEach(([name, value]) => {
        if (touchedFields.has(name)) {
          const error = validateField(name, value);
          if (error) newErrors[name] = error;
        }
      });
      setErrors(newErrors);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, touchedFields]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'message') {
      setMessageLength(value.length);
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedFields(new Set(Object.keys(formData)));

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showNotification('Message sent successfully!', 'success');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          country: '',
          language: '',
          message: ''
        });
        setTouchedFields(new Set());
        setMessageLength(0);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] backdrop-blur-md 
      border border-[#8000FF]/20 rounded-2xl p-8 h-[550px]">
      <form onSubmit={handleSubmit} className="h-full flex flex-col">
        <div className="flex-1 space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="text-sm font-medium text-white/60">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('firstName')}
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                    focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                  placeholder="John"
                />
                {errors.firstName && (
                  <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.firstName}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lastName" className="text-sm font-medium text-white/60">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('lastName')}
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                    focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
  {/* Email Field */}
  <div className="space-y-1.5">
    <label htmlFor="email" className="text-sm font-medium text-white/60">Email Address</label>
    <div className="relative">
      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={() => handleBlur('email')}
        className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
          text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
          focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
        placeholder="john@example.com"
      />
      {errors.email && (
        <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {errors.email}
        </div>
      )}
    </div>
  </div>

  {/* Category Dropdown */}
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-white/60">Category</label>
    <div className="relative" ref={categoryDropdownRef}>
      <List className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
      <button
        type="button"
        onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
        className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
          text-left focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 
          focus:ring-[#8000FF]/40 transition-all flex items-center justify-between"
      >
        <span className={formData.category ? 'text-white' : 'text-white/40'}>
          {formData.category || 'Select category'}
        </span>
        <ArrowRight className={`w-4 h-4 text-white/40 transition-transform duration-300
          ${activeDropdown === 'category' ? 'rotate-90' : ''}`} />
      </button>

      {/* Category Dropdown Menu */}
      {activeDropdown === 'category' && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#120D1D] border border-[#8000FF]/20 
          rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="max-h-[240px] overflow-y-auto">
            {[
              'Account Issues',
              'Technical Support',
              'Feedback & Requests',
              'Billing & Payments',
              'Other'
            ].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, category }));
                  setActiveDropdown(null);
                }}
                className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all
                  flex items-center justify-between"
              >
                <span className={`text-sm ${formData.category === category 
                  ? 'text-[#8000FF]' 
                  : 'text-white/60 hover:text-white'}`}>
                  {category}
                </span>
                {formData.category === category && (
                  <Check className="w-4 h-4 text-[#8000FF]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</div>

          {/* Country & Language Row */}
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
                  aria-expanded={activeDropdown !== null}
                  aria-controls={activeDropdown === 'country' ? 'country-dropdown' : 'state-dropdown'}
                >
                  <span className={formData.country ? 'text-white' : 'text-white/40'}>
                    {getCountryDisplayText()}
                  </span>
                  <ArrowRight className={`w-4 h-4 text-white/40 transition-transform duration-300
                    ${activeDropdown ? 'rotate-90' : ''}`} />
                </button>

                {/* Country Dropdown */}
                {activeDropdown === 'country' && (
                  <div 
                    id="country-dropdown"
                    className="absolute top-full left-0 right-0 mt-2 bg-[#120D1D] border border-[#8000FF]/20 
                      rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
                    role="listbox"
                  >
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
                                role="option"
                                aria-selected={formData.country === country.code}
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
                  <div 
                    id="state-dropdown"
                    className="absolute top-full left-0 right-0 mt-2 bg-[#120D1D] border border-[#8000FF]/20 
                      rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
                    ref={stateDropdownRef}
                    role="listbox"
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
                            role="option"
                            aria-selected={selectedStateOrProvince === state.name}
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
                    <div className="max-h-[240px] overflow-y-auto">
                      {isLoadingLanguages ? (
                        <div className="p-4 text-center">
                          <Loader2 className="w-5 h-5 text-[#8000FF] animate-spin mx-auto" />
                        </div>
                      ) : Object.keys(filteredGroupedLanguages).length === 0 ? (
                        <div className="p-4 text-center text-white/40 text-sm">
                          No languages found
                        </div>
                      ) : (
                        Object.entries(filteredGroupedLanguages).map(([region, languages]) => (
                          <div key={region}>
                            {/* Region Header */}
                            <div className="px-4 py-2 bg-[#8000FF]/10 border-y border-[#8000FF]/20">
                              <span className="text-[#8000FF] text-xs font-medium">{region}</span>
                            </div>

                                  {/* Languages in Region */}
{languages.map(language => (
  <button
    key={language.code}
    type="button"
    onClick={() => handleLanguageSelect(language)}
    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all
      flex items-center justify-between"
    role="option"
    aria-selected={formData.language === language.code}
  >
    <div className="flex items-center gap-2">
      <span className={`text-sm ${formData.language === language.code 
        ? 'text-[#8000FF]' 
        : 'text-white/60 hover:text-white'}`}>
        {language.name}
      </span>
      {language.native_name && (
        <span className="text-white/40 text-xs">
          ({language.native_name})
        </span>
      )}
    </div>
    <div className="flex items-center gap-2">
      {formData.language === language.code && (
        <Check className="w-4 h-4 text-[#8000FF]" />
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
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="message" className="text-sm font-medium text-white/60">Message</label>
              <span className={`text-xs ${messageLength > maxMessageLength ? 'text-red-500' : 'text-white/40'}`}>
                {messageLength}/{maxMessageLength}
              </span>
            </div>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={() => handleBlur('message')}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                  text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                  focus:ring-1 focus:ring-[#8000FF]/40 transition-all resize-none"
                placeholder="How can we help you?"
              />
              {errors.message && (
                <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting || showSuccess || Object.keys(errors).length > 0}
            className="w-full h-[48px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
              hover:bg-[#6700CC] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
              hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : showSuccess ? (
              <div className="flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2">
                <Check className="w-5 h-5" />
                <span>Message Sent!</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
                  translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Send className="w-5 h-5 group-hover:translate-x-1 -translate-y-0.5 transition-transform duration-300" />
                </div>
                <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
                  Send Message
                </span>
              </>
            )}
          </button>

          {/* Error Message */}
          {errors.submit && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-500/90">{errors.submit}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
