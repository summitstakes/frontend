import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { CategoryListProps } from './types';

export function CategoryList({ categories, activeCategory, onCategorySelect }: CategoryListProps) {
  return (
    <div>
      {/* Category Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-[#8000FF]" />
          </div>
          <div>
            <h3 className="font-urbanist font-bold text-white text-lg">Categories</h3>
            <p className="text-white/60 text-sm">Select a topic below</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-[#8000FF]/10 rounded-xl">
          <p className="text-sm text-white/80 leading-relaxed">
            Browse through our categories to find answers to your questions. Each section contains detailed information about specific topics.
          </p>
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-3">
        {categories.map(category => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full p-4 rounded-xl text-left
                group relative overflow-hidden transform transition-all duration-500 ease-out
                ${isActive
                  ? 'bg-gradient-to-br from-[#8000FF] to-[#6700CC] text-white shadow-lg translate-x-2'
                  : 'bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border border-[#8000FF]/20 hover:border-[#8000FF]/40'
                }`}
            >
              {/* Background Effects */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[#8000FF]/5 to-transparent 
                transition-opacity duration-500
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              
              {/* Content Container */}
              <div className="relative flex items-center gap-3">
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                  transition-all duration-500 ease-out
                  ${isActive 
                    ? 'bg-white/20 scale-110' 
                    : 'bg-[#8000FF]/10 group-hover:scale-110'
                  }`}
                >
                  <Icon className={`w-6 h-6 transition-all duration-500 ease-out
                    ${isActive 
                      ? 'text-white rotate-12' 
                      : 'text-[#8000FF] group-hover:rotate-12'
                    }`} />
                </div>

                {/* Text Content */}
                <div className="min-w-0 transition-transform duration-500 ease-out
                  group-hover:translate-x-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-urbanist font-bold truncate transition-colors duration-500
                      ${isActive 
                        ? 'text-white' 
                        : 'text-white/60 group-hover:text-white'
                      }`}>
                      {category.name}
                    </span>
                    <div className={`px-2 py-0.5 rounded-full text-xs transition-all duration-500
                      ${isActive
                        ? 'bg-white/20 text-white translate-x-1'
                        : 'bg-[#8000FF]/10 text-[#8000FF] group-hover:translate-x-1'
                      }`}>
                      {category.questions.length} Q's
                    </div>
                  </div>
                  <p className={`text-sm truncate transition-colors duration-500
                    ${isActive 
                      ? 'text-white/80' 
                      : 'text-white/40 group-hover:text-white/60'
                    }`}>
                    {category.description}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                  transition-all duration-500 ease-out ml-auto
                  ${isActive
                    ? 'bg-white/20 translate-x-1'
                    : 'bg-[#8000FF]/10 group-hover:bg-[#8000FF]/20 group-hover:translate-x-1'
                  }`}>
                  <ChevronRight className={`w-5 h-5 transition-all duration-500
                    ${isActive
                      ? 'text-white translate-x-0.5'
                      : 'text-[#8000FF] group-hover:translate-x-0.5'
                    }`} />
                </div>
              </div>

              {/* Active State Particles */}
              {isActive && (
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}