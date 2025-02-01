import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Users, LineChart, TrendingUp, Star, Calendar, Clock, Trophy, Target, ArrowRight, ChevronRight } from 'lucide-react';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ArticleGrid } from './components/ArticleGrid';
import { FilterBar } from './components/FilterBar';
import { Pagination } from './components/Pagination';
import { BackgroundEffects } from './components/BackgroundEffects';
import { useLocation } from 'react-router-dom';
import { getArticles } from '../../lib/contentful';
import type { Article } from '../../types/contentful';

// Number of articles to show per page
const articlesPerPage = 6;

// Debounce function
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function ProInsights() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [selectedLeague, setSelectedLeague] = useState('All Leagues');
  const [selectedDate, setSelectedDate] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const latestArticlesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Fetch articles from Contentful
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Get featured article
  const featuredArticle = articles.find(article => article.featured);
  
  // Get non-featured articles
  const nonFeaturedArticles = articles.filter(article => !article.featured);

  // Debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Reset shouldScroll when navigating to the page
  useEffect(() => {
    setShouldScroll(false);
  }, [location]);

  // Scroll to Latest Articles section only when paginating
  useEffect(() => {
    if (shouldScroll && latestArticlesRef.current) {
      latestArticlesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShouldScroll(false);
    }
  }, [currentPage, shouldScroll]);

  // Search effect
  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearching(true);
      const results = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                           article.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        return matchesSearch;
      });
      setSearchResults(results);
      setShowSearchDropdown(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowSearchDropdown(false);
      setSearchResults([]);
    }
  }, [debouncedSearchQuery, articles]);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter articles based on search, sport, and league
  const filteredArticles = nonFeaturedArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All Sports' || article.sport === selectedSport;
    const matchesLeague = selectedLeague === 'All Leagues' || article.league === selectedLeague;
    return matchesSearch && matchesSport && matchesLeague;
  });

  // Sort articles by date
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return selectedDate === 'oldest' ? dateA - dateB : dateB - dateA;
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(sortedArticles.length / articlesPerPage));
  
  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }

  const indexOfLastArticle = validCurrentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePaginate = (pageNumber: number) => {
    const validPageNumber = Math.min(Math.max(1, pageNumber), totalPages);
    setShouldScroll(true);
    setCurrentPage(validPageNumber);
  };

  // Stats animation
  const [animatedStats, setAnimatedStats] = useState({
    readers: 0,
    predictions: 0,
    successRate: 0
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targetStats = {
      readers: 50000,
      predictions: 1000000,
      successRate: 15
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetStats);
        return;
      }

      const progress = (currentStep + 1) / steps;
      setAnimatedStats({
        readers: Math.round(targetStats.readers * progress),
        predictions: Math.round(targetStats.predictions * progress),
        successRate: Math.round(targetStats.successRate * progress)
      });

      currentStep++;
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#06060C] -mt-[120px] relative">
      <BackgroundEffects />

      {/* Hero Section */}
      <div className="relative pt-[120px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8000FF]/5 via-transparent to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 pt-24 pb-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center">
            {/* Left Column - Main Content */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white mb-6 leading-tight
                animate-in slide-in-from-left duration-700">
                Professional
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
                  animate-gradient relative">
                  Betting Insights
                  <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                    from-transparent via-[#8000FF] to-transparent opacity-50" />
                </span>
              </h1>
              
              <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl
                animate-in slide-in-from-left duration-700 delay-100">
                In-depth analysis of both team trends and betting outlook is what you can come to expect in our Pro Insights 
                section. With a well rounded team of writers, you can expect only the best as you navigate the world of sports.
              </p>

              {/* Enhanced Animated Stats Row */}
              <div className="flex items-center gap-8 animate-in slide-in-from-left duration-700 delay-200">
                {[
                  { 
                    icon: <Users />, 
                    value: animatedStats.readers.toLocaleString(), 
                    label: 'Monthly Readers',
                    suffix: '+'
                  },
                  { 
                    icon: <LineChart />, 
                    value: animatedStats.predictions.toLocaleString(), 
                    label: 'Predictions Made',
                    suffix: '+'
                  },
                  { 
                    icon: <TrendingUp />, 
                    value: animatedStats.successRate, 
                    label: 'Success Rate',
                    prefix: '+',
                    suffix: '%'
                  }
                ].map((stat, index) => (
                  <div key={index} className="text-center relative group">
                    <div className="absolute inset-0 bg-[#8000FF]/5 blur-xl opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mb-3 mx-auto
                      group-hover:scale-110 transition-transform duration-500">
                      <div className="text-[#8000FF]">{stat.icon}</div>
                    </div>
                    <div className="text-xl font-urbanist font-bold text-white group-hover:text-[#8000FF] 
                      transition-colors">
                      {stat.prefix}{stat.value}{stat.suffix}
                    </div>
                    <div className="text-white/40 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Enhanced Search */}
            <div className="animate-in slide-in-from-right duration-700">
              <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                backdrop-blur-md border border-[#8000FF]/20 rounded-2xl
                hover:border-[#8000FF]/40 transition-all duration-500
                hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#8000FF]" />
                  </div>
                  <div>
                    <h3 className="font-urbanist font-bold text-white text-lg">Search Articles</h3>
                    <p className="text-white/60 text-sm">Find insights that matter to you</p>
                  </div>
                </div>

                <div className="relative" ref={searchInputRef}>
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors
                    ${isSearching ? 'text-[#8000FF]' : 'text-white/40'}`} />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full h-[52px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                      text-white placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
                      focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                  />
                  {isSearching && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Enhanced Search Dropdown */}
                  {showSearchDropdown && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#120D1D] border border-[#8000FF]/20 
                      rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="max-h-[320px] overflow-y-auto">
                        {searchResults.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => {
                              setSearchQuery(result.title);
                              setShowSearchDropdown(false);
                              setCurrentPage(1);
                            }}
                            className="w-full p-4 text-left hover:bg-white/5 transition-all flex items-start gap-3
                              border-b border-[#8000FF]/10 last:border-b-0 group"
                          >
                            {/* Result Preview Image */}
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                              <img 
                                src={result.image} 
                                alt={result.title}
                                className="w-full h-full object-cover transition-transform duration-500
                                  group-hover:scale-110"
                              />
                            </div>

                            {/* Result Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-urbanist font-bold text-white mb-1 truncate
                                group-hover:text-[#8000FF] transition-colors">
                                {result.title}
                              </h4>
                              <div className="flex items-center gap-4 text-white/40 text-xs">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{result.readTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{result.date}</span>
                                </div>
                              </div>
                            </div>

                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#8000FF] 
                              group-hover:translate-x-1 transition-all shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Popular Searches */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-[#8000FF]" />
                    <span className="text-sm text-white/40">Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['NHL Playoffs', 'March Madness', 'Premier League', 'NBA MVP'].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          setCurrentPage(1);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60
                          hover:bg-[#8000FF]/10 hover:border-[#8000FF]/20 hover:text-white 
                          transition-all duration-300 text-sm group"
                      >
                        <span className="relative">
                          {term}
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#8000FF] 
                            scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-[#8000FF]/10">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: <Trophy />, value: '24/7', label: 'Coverage' },
                      { icon: <Target />, value: '99%', label: 'Accuracy' },
                      { icon: <Clock />, value: '2-4h', label: 'Updates' }
                    ].map((stat, index) => (
                      <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10
                        group hover:bg-[#8000FF]/5 hover:border-[#8000FF]/20 transition-all duration-300">
                        <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center mb-2
                          group-hover:scale-110 transition-transform">
                          <div className="w-4 h-4 text-[#8000FF]">{stat.icon}</div>
                        </div>
                        <div className="text-sm font-urbanist font-bold text-white group-hover:text-[#8000FF] 
                          transition-colors">
                          {stat.value}
                        </div>
                        <div className="text-white/40 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-[1440px] mx-auto px-6 pb-24">
        {/* Featured Article */}
        {isLoading ? (
          <div className="mb-12 animate-pulse">
            <div className="h-[400px] bg-white/5 rounded-2xl" />
          </div>
        ) : featuredArticle ? (
          <FeaturedArticle article={featuredArticle} />
        ) : null}

        {/* Latest Articles */}
        <div ref={latestArticlesRef} className="mb-12">
          <FilterBar {...{
            selectedSport,
            setSelectedSport: (value: string) => {
              setSelectedSport(value);
              setCurrentPage(1);
            },
            selectedLeague,
            setSelectedLeague: (value: string) => {
              setSelectedLeague(value);
              setCurrentPage(1);
            },
            selectedDate,
            setSelectedDate: (value: string) => {
              setSelectedDate(value);
              setCurrentPage(1);
            },
            setCurrentPage
          }} />

          <div className="min-h-[800px]"> {/* Add minimum height to prevent layout shift */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(6)].map((_, index) => (
                  <div 
                    key={index} 
                    className="animate-pulse"
                    style={{ 
                      animation: 'fadeIn 0.8s ease-out forwards',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="h-[200px] bg-white/5 rounded-t-2xl" />
                    <div className="p-6 bg-white/5 rounded-b-2xl space-y-4">
                      <div className="h-4 bg-white/10 rounded-full w-3/4" />
                      <div className="h-4 bg-white/10 rounded-full w-1/2" />
                      <div className="h-4 bg-white/10 rounded-full w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : currentArticles.length > 0 ? (
              <div className="transition-all duration-300 ease-in-out">
                <ArticleGrid articles={currentArticles} />
              </div>
            ) : (
              <div className="text-center py-12 animate-in fade-in-50">
                <div className="w-16 h-16 rounded-full bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#8000FF]" />
                </div>
                <h3 className="text-xl font-urbanist font-bold text-white mb-2">No Articles Found</h3>
                <p className="text-white/60 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSport('All Sports');
                    setSelectedLeague('All Leagues');
                    setSelectedDate('newest');
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2 bg-[#8000FF]/10 text-[#8000FF] rounded-lg hover:bg-[#8000FF]/20 
                    transition-all duration-300 group"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Reset Filters
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && !isLoading && (
            <div className="mt-12">
              {/* Results Counter */}
              <div className="flex items-center justify-center mb-4">
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm">
                  Showing {indexOfFirstArticle + 1}-{Math.min(indexOfLastArticle, sortedArticles.length)} of {sortedArticles.length} articles
                </div>
              </div>

              <Pagination
                currentPage={validCurrentPage}
                totalPages={totalPages}
                paginate={handlePaginate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}