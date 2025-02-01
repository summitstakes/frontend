import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { SplitSection } from './sections/SplitSection';
import { CTABanner } from './components/CTABanner';
import { UpcomingFeaturesBanner } from './components/UpcomingFeaturesBanner';

export function BetTrackerPage() {
  return (
    <div className="min-h-screen bg-[#06060C] -mt-[120px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        <HeroSection />
        <FeaturesSection />
      </div>

      {/* CTA Banner */}
      <div className="mb-12">
        <CTABanner />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        <SplitSection />
      </div>

      {/* Upcoming Features Banner */}
      <div className="mt-24">
        <UpcomingFeaturesBanner />
      </div>
    </div>
  );
}