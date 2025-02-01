import React, { useState, useEffect } from 'react';
import { LiveScores } from '../LiveScores';
import { TypeWriter } from '../TypeWriter';
import { Globe2, ArrowRight, Users, ExternalLink, ArrowUpRight, Clock, Calendar, Trophy, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../../lib/contentful';
import type { Article } from '../../types/contentful';

const sportsbooks = [
  'Bet365',
  'Sports Interaction',
  'Bodog',
  'BetWay',
  'PowerPlay',
  'BetRivers',
  'NorthStar Bets',
  'Proline Plus'
];

interface HeroSectionProps {
  onLocationModalOpen: () => void;
}

export function HeroSection({ onLocationModalOpen }: HeroSectionProps) {
  const navigate = useNavigate();
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch latest articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getArticles();
        // Get latest 2 articles
        const latest = articles
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 2);
        setLatestArticles(latest);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="absolute top-[70px] left-0 right-0 w-full h-[800px] z-10">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(https://i.imgur.com/upTkbbH.jpg)`
          }}
        >
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#06060C]/60 via-[#06060C]/50 to-[#06060C]/70" />
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-20">
        {/* Live Scores Section */}
        <div className="h-[120px] w-full max-w-[1123px] mx-auto overflow-hidden">
          <LiveScores />
        </div>

        {/* Hero Content with Two Columns */}
        <div className="mt-[85px] flex justify-between items-start gap-16">
          {/* Left Column - Main Content */}
          <div className="max-w-[800px] animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-[#8000FF] text-4xl font-urbanist font-bold tracking-tight">
                Hello Canada!
              </h2>
              <button 
                onClick={onLocationModalOpen}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group hover:scale-105"
              >
                <Globe2 className="w-3.5 h-3.5 text-white/40 group-hover:text-white/60 transition-colors" />
                <span className="text-white/40 text-sm font-urbanist group-hover:text-white/60 transition-colors">Not from Canada?</span>
              </button>
            </div>
            {/* Rest of the content */}
            <div>
              <h1 className="text-white font-urbanist text-6xl font-extrabold leading-[1.1] mb-6">
                Discover The Best Odds On Your Favourite Sportsbooks
              </h1>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[3px] w-12 bg-gradient-to-r from-[#8000FF]/50 via-[#8000FF] to-[#8000FF]/50 rounded-full animate-pulse" />
                <p className="text-[#8000FF] text-4xl font-urbanist font-bold">
                  <TypeWriter 
                    words={sportsbooks}
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseTime={2000}
                  />
                </p>
              </div>
              <p className="text-white/60 text-xl font-urbanist tracking-wide mb-8">
                For Bettors, By Bettors
              </p>
              <div className="flex items-center gap-8 mb-12">
                <button className="h-[52px] bg-[#8000FF] text-white font-urbanist text-lg font-extrabold px-8 rounded-xl hover:bg-[#6700CC] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(128,0,255,0.3)]">
                  Join For Free
                </button>
                <button className="flex items-center gap-2 text-white/60 hover:text-white font-urbanist text-lg font-bold transition-all duration-300 group hover:scale-105">
                  All Tools
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              {/* Social Proof */}
              <div className="flex items-center gap-6 text-white/40">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-urbanist">10,000+ Active Members</span>
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="font-urbanist">Trusted by Professional Bettors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Latest Insights */}
          <div className="w-[400px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="backdrop-blur-md bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20 rounded-2xl overflow-hidden hover:border-[#8000FF]/30 transition-all duration-300 group">
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#8000FF]/10 bg-gradient-to-r from-[#8000FF]/[0.02] to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#8000FF]" />
                    </div>
                    <div>
                      <h3 className="font-urbanist font-bold text-white text-lg">Latest Insights</h3>
                      <p className="text-white/60 text-sm">Expert analysis & predictions</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/proinsights')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8000FF]/10 
                      hover:bg-[#8000FF]/20 transition-all duration-300 group/btn"
                  >
                    <span className="text-[#8000FF] text-sm">View All</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8000FF] group-hover/btn:translate-x-0.5 
                      group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Articles List */}
              <div className="divide-y divide-[#8000FF]/10">
                {isLoading ? (
                  // Loading skeletons
                  [...Array(2)].map((_, index) => (
                    <div key={index} className="p-6 animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-white/5 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-white/5 rounded-full w-3/4" />
                          <div className="h-4 bg-white/5 rounded-full w-1/2" />
                          <div className="h-4 bg-white/5 rounded-full w-2/3" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : latestArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => navigate(`/article/${article.slug}`)}
                    className="w-full p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors group/article"
                  >
                    {/* Article Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                      <div className="w-full h-full relative">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500
                            group-hover/article:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-2 py-0.5 rounded-full bg-[#8000FF]/10 text-[#8000FF] text-xs">
                          {article.sport}
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-white/5 text-white/60 text-xs">
                          {article.league}
                        </div>
                      </div>
                      <h4 className="font-urbanist font-bold text-white text-sm mb-2 line-clamp-2
                        group-hover/article:text-[#8000FF] transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-4 text-white/40 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-white/20 group-hover/article:text-[#8000FF] 
                      group-hover/article:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="p-4 bg-gradient-to-br from-[#8000FF]/5 to-transparent">
                <button
                  onClick={() => navigate('/proinsights')}
                  className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
                    hover:bg-[#6700CC] transition-all duration-300 flex items-center justify-center gap-2
                    hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] group/btn"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Access Pro Insights</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}