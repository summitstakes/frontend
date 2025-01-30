import React from 'react';
import { Trophy, ChevronRight, Star, AlertCircle, ArrowRight, Target, Check } from 'lucide-react';
import { Article } from '../../proinsights/data/articles';

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="prose prose-invert prose-lg">
      {/* Lead Paragraph */}
      <p className="text-white/90 text-xl leading-relaxed mb-8 font-medium">
        {article.description}
      </p>

      {/* Key Points Summary */}
      <div className="p-6 bg-gradient-to-br from-[#8000FF]/10 to-transparent border border-[#8000FF]/20 
        rounded-xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-5 h-5 text-[#8000FF]" />
          <h3 className="font-urbanist font-bold text-white text-lg">Key Takeaways</h3>
        </div>
        <div className="space-y-3">
          {[
            'Historical head-to-head record favors the home team',
            'Key player injuries could impact betting lines',
            'Weather conditions may affect over/under totals'
          ].map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#8000FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#8000FF]" />
              </div>
              <span className="text-white/80">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <h2 className="text-white font-urbanist font-bold text-2xl mb-4">Introduction</h2>
      <p className="text-white/80 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
        aliquip ex ea commodo consequat.
      </p>

      {/* Enhanced Betting Insights Box */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20 
        rounded-xl my-8 hover:border-[#8000FF]/40 transition-all group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
              group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5 text-[#8000FF]" />
            </div>
            <h3 className="font-urbanist font-bold text-white text-lg">Pro Betting Analysis</h3>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[#8000FF]/10 border border-[#8000FF]/20">
            <span className="text-[#8000FF] text-sm font-medium">Premium Insight</span>
          </div>
        </div>
        <div className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Win Probability', value: '68%' },
              { label: 'Value Rating', value: '8.5/10' },
              { label: 'Confidence', value: 'High' }
            ].map((stat, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-sm text-white/60 mb-1">{stat.label}</div>
                <div className="text-lg font-urbanist font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Key Points */}
          <div className="space-y-3">
            {[
              'Historical head-to-head record favors the home team',
              'Key player injuries could impact betting lines',
              'Weather conditions may affect over/under totals'
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#8000FF]/10 flex items-center justify-center shrink-0 mt-0.5
                  group-hover:scale-110 transition-transform">
                  <Target className="w-4 h-4 text-[#8000FF]" />
                </div>
                <span className="text-white/80">{point}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button className="w-full h-[42px] bg-[#8000FF] text-white font-urbanist font-bold rounded-lg
            hover:bg-[#6700CC] transition-all duration-300 flex items-center justify-center gap-2 mt-4
            group/btn">
            <span>View Full Analysis</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Warning Box */}
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl my-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-red-500 font-urbanist font-bold mb-2">Important Notice</h4>
            <p className="text-red-500/90 text-sm leading-relaxed">
              All betting analysis and predictions are for informational purposes only. Please bet responsibly 
              and within your means.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-white font-urbanist font-bold text-2xl mb-4">Key Analysis</h2>
      <p className="text-white/80 leading-relaxed mb-6">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <h2 className="text-white font-urbanist font-bold text-2xl mb-4">Conclusion</h2>
      <p className="text-white/80 leading-relaxed mb-6">
        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime 
        placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
      </p>

      {/* Tags */}
      <div className="mt-8 flex flex-wrap gap-2">
        {['Betting Analysis', 'Sports Insights', 'Pro Tips', 'Strategy'].map((tag) => (
          <div key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 
            hover:bg-[#8000FF]/10 hover:border-[#8000FF]/20 transition-all cursor-pointer">
            <span className="text-white/60 text-sm hover:text-white transition-colors">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}