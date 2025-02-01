import React, { useState } from 'react';
import { Share, Bookmark, Heart } from 'lucide-react';

interface ArticleActionsProps {
  likeCount: number;
  hasLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
}

export function ArticleActions({ 
  likeCount, 
  hasLiked, 
  isBookmarked, 
  onLike, 
  onBookmark, 
  onShare 
}: ArticleActionsProps) {
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleShare = async () => {
    onShare();
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Share Button */}
      <div className="relative">
        <button 
          onClick={handleShare}
          className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10
            flex items-center justify-center text-white/60 hover:text-white transition-all
            group"
        >
          <Share className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        {showShareTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5
            bg-[#8000FF] text-white text-sm rounded-lg whitespace-nowrap animate-in
            fade-in slide-in-from-bottom-2">
            Link copied!
          </div>
        )}
      </div>

      {/* Bookmark Button */}
      <button 
        onClick={onBookmark}
        className={`w-10 h-10 rounded-lg border flex items-center justify-center
          transition-all group ${isBookmarked 
            ? 'bg-[#8000FF]/20 border-[#8000FF] text-[#8000FF]' 
            : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/60 hover:text-white'
          }`}
      >
        <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Like Button */}
      <button 
        onClick={onLike}
        className={`h-10 rounded-lg border flex items-center gap-2 px-4
          transition-all group ${hasLiked
            ? 'bg-[#8000FF]/20 border-[#8000FF] text-[#8000FF]'
            : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/60 hover:text-white'
          }`}
      >
        <Heart className={`w-5 h-5 ${hasLiked ? 'fill-[#8000FF]' : ''} 
          group-hover:scale-110 transition-all`} />
        <span className="text-sm font-medium">{likeCount}</span>
      </button>
    </div>
  );
}