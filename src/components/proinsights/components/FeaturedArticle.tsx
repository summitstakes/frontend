import React from 'react';
import { Star, User, Clock, Calendar, ArrowRight, Trophy, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../../../types/contentful';

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8000FF] to-[#A855F7] 
              p-[1px] group-hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-shadow">
              <div className="w-full h-full rounded-xl bg-[#120D1D] flex items-center justify-center">
                <Star className="w-6 h-6 text-[#8000FF]" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-[#8000FF] 
              flex items-center justify-center animate-bounce">
              <Target className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="font-urbanist font-bold text-white text-2xl">Featured Insight</h2>
            <p className="text-white/60 text-sm">Our top pick for today</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => navigate(`/article/${article.slug}`)}
        className="group relative rounded-2xl overflow-hidden cursor-pointer w-full text-left
          bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20 
          hover:border-[#8000FF]/40 transition-all duration-500 
          hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]"
      >
        <div className="grid grid-cols-[1fr_400px] gap-8">
          {/* Content Section */}
          <div className="p-8">
            {/* Featured Tag */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#8000FF]/10 
                border border-[#8000FF]/20 text-[#8000FF] text-sm font-medium 
                group-hover:bg-[#8000FF]/20 transition-all">
                <Star className="w-4 h-4" />
                <span>Featured</span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-3xl font-urbanist font-bold text-white mb-4 group-hover:text-[#8000FF]
              transition-colors leading-tight">
              {article.title}
            </h3>

            <p className="text-white/60 text-lg mb-8 line-clamp-2 leading-relaxed group-hover:text-white/80
              transition-colors">
              {article.description}
            </p>

            {/* Author & Meta Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#8000FF]/20
                  group-hover:border-[#8000FF] transition-all group/avatar">
                  <div className="w-full h-full bg-[#8000FF]/20 flex items-center justify-center
                    group-hover/avatar:bg-[#8000FF]/30 transition-colors">
                    <User className="w-6 h-6 text-[#8000FF]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium group-hover:text-[#8000FF] transition-colors">
                      {article.author}
                    </span>
                    <div className="px-2 py-0.5 rounded-full bg-[#8000FF]/10 flex items-center gap-1.5">
                      <Trophy className="w-3 h-3 text-[#8000FF]" />
                      <span className="text-[#8000FF] text-xs font-medium">Pro Writer</span>
                    </div>
                  </div>
                  <span className="text-white/40 text-sm">Sports Analyst</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative h-full w-full min-h-[320px] overflow-hidden">
            <div className="absolute inset-0">
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700
                    group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#06060C]/50 to-[#06060C]" />
            </div>
            
            {/* Read More Button */}
            <div className="absolute bottom-8 right-8">
              <div className="h-[42px] bg-[#8000FF] text-white font-urbanist font-bold px-6 rounded-xl 
                flex items-center gap-3 group/btn relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6700CC] opacity-0 
                  group-hover/btn:opacity-100 transition-opacity" />
                <span className="relative z-10">Read Full Article</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Reading Time & Date */}
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-sm 
                border border-white/10 text-white text-xs">
                <Clock className="w-3.5 h-3.5 text-[#8000FF]" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-sm 
                border border-white/10 text-white text-xs">
                <Calendar className="w-3.5 h-3.5 text-[#8000FF]" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Hover Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
      </button>
    </div>
  );
}