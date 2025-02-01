import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Star, Trophy, Target, ArrowRight, Globe2, Clock } from 'lucide-react';
import type { Article } from '../../../types/contentful';
import { getArticles } from '../../../lib/contentful';

interface ArticleSidebarProps {
  article: Article;
}

export function ArticleSidebar({ article }: ArticleSidebarProps) {
  const navigate = useNavigate();
  const [recentArticles, setRecentArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch recent articles
  React.useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const articles = await getArticles();
        // Filter out current article and get latest 3
        const recent = articles
          .filter(a => a.id !== article.id)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
        setRecentArticles(recent);
      } catch (error) {
        console.error('Error fetching recent articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentArticles();
  }, [article.id]);

  // Split leagues into array if multiple leagues are referenced
  const leagues = article.league.split(',').map(l => l.trim());

  const handleArticleClick = (articleId: number) => {
    // Scroll to top before navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Navigate after a small delay to allow smooth scroll
    setTimeout(() => {
      navigate(`/article/${articleId}`);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* League Coverage Info */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl hover:border-[#8000FF]/40 transition-all group">
        {/* Enhanced Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
              p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
              <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#8000FF]" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-[#8000FF] 
              flex items-center justify-center animate-bounce">
              <Globe2 className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-urbanist font-bold text-white text-lg">League(s) Referenced</h3>
            <p className="text-white/60 text-sm">In this article</p>
          </div>
        </div>

        {/* League Info Box */}
        <div className="p-4 bg-[#8000FF]/10 rounded-xl border border-[#8000FF]/20 mb-6">
          <p className="text-white/80 text-sm leading-relaxed">
            The following league(s) has been covered in this article. Click below to access comprehensive coverage, 
            including odds comparison, team statistics, and expert analysis.
          </p>
        </div>

        {/* League Buttons - Now supports multiple leagues */}
        <div className="space-y-3 mb-6">
          {leagues.map((league, index) => (
            <button 
              key={index}
              onClick={() => navigate(`/sports`)}
              className="w-full h-[42px] bg-[#8000FF]/10 border border-[#8000FF]/20 rounded-xl
                hover:bg-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
                flex items-center justify-center gap-2 group/btn"
            >
              <Trophy className="w-5 h-5 text-[#8000FF]" />
              <span className="text-white font-urbanist font-bold">{league}</span>
              <ArrowRight className="w-4 h-4 text-[#8000FF] group-hover/btn:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>

        {/* Enhanced Features List */}
        <div className="space-y-3">
          {[
            { 
              icon: <Trophy />, 
              text: 'Key Matchups & Live Scores',
              desc: 'Real-time match data'
            },
            { 
              icon: <Target />, 
              text: 'Player & Team Data',
              desc: 'Advanced statistics'
            },
            { 
              icon: <Star />, 
              text: 'Line Movement',
              desc: 'Track odds changes'
            },
            { 
              icon: <Clock />, 
              text: 'Best Odds',
              desc: 'Compare sportsbooks'
            }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10
              hover:bg-[#8000FF]/5 hover:border-[#8000FF]/20 transition-all group/item cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center shrink-0
                group-hover/item:scale-110 transition-transform">
                <div className="w-5 h-5 text-[#8000FF]">{item.icon}</div>
              </div>
              <div>
                <span className="text-white font-medium text-sm block group-hover/item:text-[#8000FF] 
                  transition-colors">
                  {item.text}
                </span>
                <span className="text-white/40 text-xs">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Articles */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl hover:border-[#8000FF]/40 transition-all">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
                p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
                <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#8000FF]" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-lg bg-emerald-500 
                flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white text-lg">Recent Articles</h3>
              <p className="text-white/60 text-sm">Latest insights</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-[100px] bg-white/5 rounded-xl" />
              </div>
            ))
          ) : recentArticles.length > 0 ? (
            recentArticles.map((recentArticle) => (
              <button
                key={recentArticle.id}
                onClick={() => handleArticleClick(recentArticle.id)}
                className="w-full text-left group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start gap-3">
                  {/* Article Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <div className="w-full h-full relative">
                      <img 
                        src={recentArticle.image}
                        alt={recentArticle.title}
                        className="w-full h-full object-cover transition-transform duration-500
                          group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category Tags */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-2 py-0.5 rounded-lg bg-[#8000FF]/10 text-[#8000FF] text-xs">
                        {recentArticle.sport}
                      </div>
                      <div className="px-2 py-0.5 rounded-lg bg-white/5 text-white/60 text-xs">
                        {recentArticle.league}
                      </div>
                    </div>

                    <h4 className="font-urbanist font-bold text-white text-sm mb-2 line-clamp-2
                      group-hover:text-[#8000FF] transition-colors">
                      {recentArticle.title}
                    </h4>
                    <div className="flex items-center gap-1 text-white/40 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{recentArticle.date}</span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#8000FF] 
                    group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[#8000FF]" />
              </div>
              <h4 className="text-white font-urbanist font-bold mb-2">No Recent Articles</h4>
              <p className="text-white/60">Check back soon for more content</p>
            </div>
          )}
        </div>

        {/* Enhanced View All Button */}
        <button
          onClick={() => navigate('/proinsights')}
          className="w-full h-[42px] bg-[#8000FF]/10 text-white font-urbanist font-bold rounded-lg
            hover:bg-[#8000FF]/20 transition-all duration-300 flex items-center justify-center gap-2
            mt-6 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/10 to-[#8000FF]/0
            opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">View All Articles</span>
          <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}