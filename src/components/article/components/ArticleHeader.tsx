import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Article } from '../../proinsights/data/articles';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <div className="relative">
      {/* Decorative top gradient for smooth navbar transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#06060C] to-transparent z-10" />

      {/* Main image container with parallax effect */}
      <div className="h-[600px] relative overflow-hidden group">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-[#06060C]/30 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-700" />
        
        {/* Main image with parallax scroll */}
        <div className="absolute inset-0 scale-110 group-hover:scale-105 transition-transform duration-700">
          <img 
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center transform-gpu will-change-transform"
          />
        </div>

        {/* Photo Credit */}
        <div className="absolute bottom-8 right-8 z-30">
          <div className="px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg">
            <span className="text-white/60 text-xs">Photo By: IMAGO / Eibnar</span>
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0">
          {/* Top gradient - smoother transition from navbar */}
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#06060C] via-[#06060C]/50 to-transparent" />
          
          {/* Bottom gradient - fade to content */}
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#06060C] via-[#06060C]/80 to-transparent" />
          
          {/* Side gradients for depth */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#06060C]/50 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#06060C]/50 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-20">
          <div className="max-w-[1440px] h-full mx-auto px-8 relative">
            {/* Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="absolute top-8 left-8 h-[42px] px-4 bg-white/10 backdrop-blur-md border border-white/20 
                rounded-xl text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2
                group/btn hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Articles</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-32 
        bg-gradient-to-t from-[#06060C] to-transparent" />
    </div>
  );
}