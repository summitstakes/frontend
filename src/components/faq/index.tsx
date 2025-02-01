import React, { useState, useEffect } from 'react';
import { faqData } from './data/faqData';
import { CategoryList } from './components/CategoryList';
import { QuestionList } from './components/QuestionList';
import { ContactCTA } from './components/ContactCTA';

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].id);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [helpfulQuestions, setHelpfulQuestions] = useState<Set<string>>(new Set());
  const [unhelpfulQuestions, setUnhelpfulQuestions] = useState<Set<string>>(new Set());
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleQuestion = (question: string) => {
    setExpandedQuestions(prev => 
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const handleHelpfulClick = (question: string, isHelpful: boolean) => {
    if (isHelpful) {
      setHelpfulQuestions(prev => new Set(prev).add(question));
      setUnhelpfulQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(question);
        return newSet;
      });
    } else {
      setUnhelpfulQuestions(prev => new Set(prev).add(question));
      setHelpfulQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(question);
        return newSet;
      });
    }
  };

  const handleCopyLink = async (question: string) => {
    try {
      const url = `${window.location.origin}/faq?q=${encodeURIComponent(question)}`;
      await navigator.clipboard.writeText(url);
      setCopiedQuestion(question);
      setTimeout(() => setCopiedQuestion(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060C] -mt-[120px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />

        {/* Additional gradient orbs */}
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#8000FF]/5 rounded-full 
          blur-[80px] animate-pulse mix-blend-screen" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#8000FF]/5 rounded-full 
          blur-[90px] animate-pulse mix-blend-screen" style={{ animationDuration: '7s' }} />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[#8000FF]/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `particle ${5 + Math.random() * 5}s linear infinite`,
              '--tx': `${(Math.random() - 0.5) * 200}px`,
              '--ty': `${(Math.random() - 0.5) * 200}px`,
            } as React.CSSProperties}
          />
        ))}

        {/* Diagonal lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[1px] rotate-[35deg] transform-gpu"
                style={{
                  width: '400%',
                  left: '-150%',
                  top: `${i * 18}px`,
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(128,0,255,0.03)'}, transparent)`,
                  animation: 'slideUp 8s linear infinite',
                  animationDelay: `${i * 0.6}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 pb-24 relative">
        {/* Enhanced Header Section - Aligned with Contact page */}
        <div className="pt-[160px] pb-12">
          <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white mb-6 leading-tight
            animate-in slide-in-from-left duration-700">
            Frequently Asked
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
              animate-gradient relative">
              Questions
              <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                from-transparent via-[#8000FF] to-transparent opacity-50" />
            </span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl
            animate-in slide-in-from-left duration-700 delay-200">
            In this section, we have the answers to your various questions separated by genre. Learning something new takes time; let us give you all the necessary tips to help you get started!
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="relative mb-12">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8000FF]/20 to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#8000FF]/10 border border-[#8000FF]/20 
              flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#8000FF]/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#8000FF] rounded-full" />
              </div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-[#8000FF]/40 to-transparent" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Left Column - Categories */}
          <div className="lg:sticky lg:top-8 h-fit">
            <CategoryList
              categories={faqData}
              activeCategory={activeCategory}
              onCategorySelect={setActiveCategory}
            />
          </div>

          {/* Right Column - Questions & Contact */}
          <div className="space-y-8">
            {/* Active Category Header */}
            {faqData.find(c => c.id === activeCategory) && (
              <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
                border border-[#8000FF]/20 rounded-xl animate-in fade-in-50">
                <h2 className="text-2xl font-urbanist font-bold text-white mb-3">
                  {faqData.find(c => c.id === activeCategory)?.name} Questions
                </h2>
                <p className="text-white/60">
                  {faqData.find(c => c.id === activeCategory)?.description}
                </p>
              </div>
            )}

            {/* Questions List */}
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="grid grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-[60px] bg-white/5 rounded-xl" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <QuestionList
                category={faqData.find(c => c.id === activeCategory) || null}
                expandedQuestions={expandedQuestions}
                onQuestionToggle={toggleQuestion}
                helpfulQuestions={helpfulQuestions}
                unhelpfulQuestions={unhelpfulQuestions}
                onHelpfulClick={handleHelpfulClick}
                onCopyLink={handleCopyLink}
                copiedQuestion={copiedQuestion}
              />
            )}

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        </div>
      </div>
    </div>
  );
}