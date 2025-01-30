import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { SportsCoverage } from './SportsCoverage';
import { BetTrackerHP } from './BetTrackerHP';
import { JoinCommunity } from './JoinCommunity';
import { LastSection } from './LastSectionHP';
import { LocationModal } from '../popups/locationchange/LocationModal';

export function HomePage() {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <div className="min-h-screen bg-custom-dark">
      <HeroSection onLocationModalOpen={() => setShowLocationModal(true)} />
      <FeaturesSection />
      <SportsCoverage />
      <BetTrackerHP />
      <JoinCommunity />
      <LastSection />

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        currentLocation="Canada"
      />
    </div>
  );
}