import React from 'react';
import { User, Star } from 'lucide-react';
import { Article } from '../../proinsights/data/articles';

interface ArticleAuthorProps {
  article: Article;
}

export function ArticleAuthor({ article }: ArticleAuthorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#8000FF]/20
        hover:border-[#8000FF] transition-all group cursor-pointer">
        <div className="w-full h-full bg-[#8000FF]/20 flex items-center justify-center
          group-hover:bg-[#8000FF]/30 transition-colors">
          <User className="w-6 h-6 text-[#8000FF]" />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-white font-medium hover:text-[#8000FF] cursor-pointer
            transition-colors">
            {article.author}
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8000FF]/10">
            <Star className="w-3 h-3 text-[#8000FF]" />
            <span className="text-[#8000FF] text-xs font-medium">Pro Writer</span>
          </div>
        </div>
        <span className="text-white/40 text-sm">Sports Analyst</span>
      </div>
    </div>
  );
}