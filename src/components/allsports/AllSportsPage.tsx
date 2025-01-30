import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FeaturesList } from './components/FeaturesList';
import { SearchBar } from './components/SearchBar';
import { SportsGrid } from './components/SportsGrid';
import { sports } from './data/sports';

export function AllSportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Search effect
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

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
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Header Section */}
        <Header />

        {/* Split Screen Layout */}
        <div className="grid grid-cols-[1fr_3fr] gap-8 pb-24">
          {/* Left Column - Stats & Features */}
          <FeaturesList />

          {/* Right Column - Sports Grid */}
          <div>
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSearching={isSearching}
            />
            <SportsGrid 
              sports={sports}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}