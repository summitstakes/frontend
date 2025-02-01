import React from 'react';
import { ChevronDown, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { QuestionListProps } from './types';

export function QuestionList({ 
  category, 
  expandedQuestions, 
  onQuestionToggle,
  helpfulQuestions,
  unhelpfulQuestions,
  onHelpfulClick
}: QuestionListProps) {
  if (!category) return null;

  // Create pairs of questions
  const questionPairs = [];
  for (let i = 0; i < category.questions.length; i += 2) {
    questionPairs.push(category.questions.slice(i, i + 2));
  }

  return (
    <div className="space-y-6">
      {questionPairs.map((pair, pairIndex) => (
        <div key={pairIndex} className="grid grid-cols-2 gap-6">
          {pair.map((item, index) => {
            const isExpanded = expandedQuestions.includes(item.question);
            const isHelpful = helpfulQuestions.has(item.question);
            const isUnhelpful = unhelpfulQuestions.has(item.question);

            return (
              <div
                key={index}
                className="rounded-xl bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                  border border-[#8000FF]/20 hover:border-[#8000FF]/40 transition-all duration-300
                  overflow-hidden h-fit group relative"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

                {/* Question Button */}
                <button
                  onClick={() => onQuestionToggle(item.question)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 relative"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                      group-hover:bg-[#8000FF]/20 transition-colors shrink-0">
                      <Star className="w-4 h-4 text-[#8000FF]" />
                    </div>
                    <span className="font-urbanist font-bold text-white text-sm truncate">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#8000FF] transition-transform duration-300 shrink-0
                    ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Answer Panel */}
                {isExpanded && (
                  <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-white/60 leading-relaxed text-sm">{item.answer}</p>
                    </div>

                    {/* Feedback Section */}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => onHelpfulClick(item.question, true)}
                        className={`h-8 px-3 rounded-lg flex items-center gap-1.5 transition-all
                          ${isHelpful 
                            ? 'bg-emerald-500/20 text-emerald-500' 
                            : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs">Helpful</span>
                      </button>
                      <button
                        onClick={() => onHelpfulClick(item.question, false)}
                        className={`h-8 px-3 rounded-lg flex items-center gap-1.5 transition-all
                          ${isUnhelpful 
                            ? 'bg-red-500/20 text-red-500' 
                            : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-xs">Not helpful</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {/* Add empty div if we have an odd number of questions */}
          {pair.length === 1 && <div />}
        </div>
      ))}
    </div>
  );
}