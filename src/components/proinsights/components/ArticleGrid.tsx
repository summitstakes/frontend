import React from 'react';
import { Clock, Calendar, ArrowRight, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../../../types/contentful';

interface ArticleGridProps {
  articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {articles.map((article, index) => (
        <button 
          key={article.id}
          onClick={() => navigate(`/article/${article.slug}`)}
          className="text-left w-full group relative bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
            border border-[#8000FF]/20 rounded-2xl overflow-hidden hover:border-[#8000FF]/40 
            transition-all duration-500 hover:-translate-y-2
            hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.2)]"
          style={{ 
            animation: 'fadeIn 0.8s ease-out forwards',
            animationDelay: `${index * 100}ms`
          }}
        >
          {/* Article Image Container */}
          <div className="relative w-full h-[200px] overflow-hidden shrink-0">
            {/* Image with Hover Effect */}
            <div className="absolute inset-0">
              <img 
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700
                  group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060C] via-[#06060C]/50 to-transparent" />
            
            {/* Enhanced Category Tags */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-[#8000FF]/20 backdrop-blur-sm border border-[#8000FF]/20 
                text-white text-xs font-medium group-hover:bg-[#8000FF]/30 transition-all">
                {article.sport}
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 
                text-white text-xs group-hover:bg-[#8000FF]/10 group-hover:border-[#8000FF]/20 transition-all">
                {article.league}
              </div>
            </div>

            {/* Reading Time & Date */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
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

          {/* Content Container */}
          <div className="p-6 flex flex-col flex-1">
            {/* Title with Fixed Height */}
            <div className="h-[56px] mb-3">
              <h3 className="font-urbanist font-bold text-white text-xl line-clamp-2
                group-hover:text-[#8000FF] transition-colors">
                {article.title}
              </h3>
            </div>

            {/* Description with Fixed Height */}
            <div className="h-[48px] mb-4">
              <p className="text-white/60 text-sm leading-relaxed line-clamp-2 group-hover:text-white/80
                transition-colors">
                {article.description}
              </p>
            </div>

            {/* Author & Action - Always at Bottom */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#8000FF]/20
                  group-hover:border-[#8000FF] transition-all group/avatar">
                  <div className="w-full h-full bg-[#8000FF]/10 flex items-center justify-center
                    group-hover/avatar:bg-[#8000FF]/20 transition-colors">
                    <Target className="w-4 h-4 text-[#8000FF]" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white group-hover:text-[#8000FF] 
                    transition-colors truncate">
                    {article.author}
                  </div>
                  <div className="text-white/40 text-xs">Sports Analyst</div>
                </div>
              </div>

              {/* Enhanced Action Button */}
              <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                group-hover:bg-[#8000FF] transition-all duration-500 group/btn">
                <ArrowRight className="w-4 h-4 text-[#8000FF] group-hover:text-white 
                  group-hover/btn:translate-x-0.5 transition-all" />
              </div>
            </div>
          </div>

          {/* Enhanced Hover Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent opacity-0 
            group-hover:opacity-100 transition-opacity pointer-events-none" />
        </button>
      ))}
    </div>
  );
}