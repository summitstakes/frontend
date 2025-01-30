import React, { useState, useEffect } from 'react';

export function BackgroundEffects() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; tx: number; ty: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      tx: (Math.random() - 0.5) * 200,
      ty: (Math.random() - 0.5) * 200
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      <div className="absolute inset-0">
        <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full blur-[100px] animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-[#8000FF]/5 rounded-full blur-[80px] animate-pulse"
          style={{ animationDuration: '6s' }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#8000FF]/8 rounded-full blur-[60px] animate-pulse"
          style={{ animationDuration: '5s' }} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#8000FF]/20 rounded-full animate-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              '--tx': `${particle.tx}px`,
              '--ty': `${particle.ty}px`
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}