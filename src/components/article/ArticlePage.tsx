import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleBySlug } from '../../lib/contentful';
import type { Article } from '../../types/contentful';
import { ArticleHeader } from './components/ArticleHeader';
import { ArticleAuthor } from './components/ArticleAuthor';
import { ArticleContent } from './components/ArticleContent';
import { ArticleSidebar } from './components/ArticleSidebar';
import { Clock, Calendar, MessageSquare, ArrowLeft, ArrowUp, Share2, Loader2 } from 'lucide-react';

export function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const articleData = await getArticleBySlug(slug);
        if (articleData) {
          setArticle(articleData);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06060C] flex items-center justify-center">
        <div className="w-16 h-16 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#8000FF] animate-spin" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#06060C] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-[#8000FF]" />
          </div>
          <h1 className="text-2xl font-urbanist font-bold text-white mb-4">Article Not Found</h1>
          <button 
            onClick={() => navigate('/proinsights')}
            className="inline-flex items-center gap-2 text-[#8000FF] hover:text-[#6700CC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Articles</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06060C] pb-24 relative overflow-hidden">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-[#8000FF] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
      </div>

      {/* Article Header */}
      <ArticleHeader article={article} />

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 relative -mt-32">
        {/* Category Tags */}
        <div className="flex items-center gap-3 mb-6">
          <div className="px-3 py-1.5 rounded-lg bg-[#8000FF]/20 backdrop-blur-sm border border-[#8000FF]/20 
            text-white text-sm font-medium">
            {article.sport}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 
            text-white text-sm">
            {article.league}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-urbanist font-extrabold text-white leading-tight mb-6">
          {article.title}
        </h1>

        {/* Author & Meta Info */}
        <div className="flex items-center gap-6 mb-8">
          <ArticleAuthor article={article} />

          <div className="w-[1px] h-8 bg-white/10" />

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{article.date}</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-[1fr_320px] gap-8">
          {/* Article Content */}
          <div className="bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20 
            rounded-2xl p-8 hover:border-[#8000FF]/40 transition-all">
            <ArticleContent article={article} />

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                {/* Back to Top Button */}
                <button 
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors
                    group px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10
                    hover:border-[#8000FF]/20"
                >
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  <span>Back to Top</span>
                </button>

                {/* Share Button */}
                <div className="relative">
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors
                      group px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10
                      hover:border-[#8000FF]/20"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Article</span>
                  </button>
                  {showShareTooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5
                      bg-[#8000FF] text-white text-sm rounded-lg whitespace-nowrap animate-in
                      fade-in slide-in-from-bottom-2">
                      Link copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <ArticleSidebar article={article} />
        </div>
      </div>
    </div>
  );
}