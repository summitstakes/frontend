import React from 'react';
import { Trophy, ChevronRight, Star, AlertCircle, ArrowRight, Target, Check } from 'lucide-react';
import type { Article } from '../../../types/contentful';

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  // Function to render the article content from Contentful
  const renderContent = () => {
    if (!article.content) return null;

    // Properly handle the rich text content structure
    return (
      <div className="prose prose-invert prose-lg max-w-none
        prose-headings:font-urbanist prose-headings:font-bold prose-headings:text-white
        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
        prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-4
        prose-strong:text-white prose-strong:font-bold
        prose-em:text-white/90 prose-em:italic
        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
        prose-li:text-white/80 prose-li:mb-2
        prose-a:text-[#8000FF] prose-a:no-underline hover:prose-a:text-[#6700CC]
        prose-blockquote:border-l-4 prose-blockquote:border-[#8000FF]/40
        prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white/70
        prose-code:text-[#8000FF] prose-code:bg-[#8000FF]/10 prose-code:px-1.5 prose-code:py-0.5 
        prose-code:rounded-md prose-code:font-normal prose-code:before:content-none prose-code:after:content-none"
      >
        {article.content.content.map((block: any, index: number) => {
          switch (block.nodeType) {
            case 'paragraph':
              return (
                <p key={index} className="text-white/80 leading-relaxed mb-4">
                  {block.content?.[0]?.value || ''}
                </p>
              );
            case 'heading-2':
              return (
                <h2 key={index} className="text-2xl font-urbanist font-bold text-white mb-4 mt-8">
                  {block.content?.[0]?.value || ''}
                </h2>
              );
            case 'heading-3':
              return (
                <h3 key={index} className="text-xl font-urbanist font-bold text-white mb-3 mt-6">
                  {block.content?.[0]?.value || ''}
                </h3>
              );
            case 'unordered-list':
              return (
                <ul key={index} className="list-disc pl-6 my-4">
                  {block.content?.map((item: any, itemIndex: number) => (
                    <li key={itemIndex} className="text-white/80 mb-2">
                      {item.content?.[0]?.content?.[0]?.value || ''}
                    </li>
                  ))}
                </ul>
              );
            case 'blockquote':
              return (
                <blockquote key={index} className="border-l-4 border-[#8000FF]/40 pl-4 italic text-white/70 my-4">
                  {block.content?.[0]?.content?.[0]?.value || ''}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
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

      {/* Main Content */}
      {renderContent()}

      {/* Pro Analysis Box */}
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