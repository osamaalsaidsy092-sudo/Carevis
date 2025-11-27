import React from 'react';

const BreathingBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-muted"></div>
      
      {/* Breathing Wave Animations */}
      <div className="absolute inset-0">
        {/* Primary Wave */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full breathing-animation"></div>
        
        {/* Secondary Wave */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/8 to-primary/8 rounded-full breathing-animation"
          style={{ animationDelay: '2s' }}
        ></div>
        
        {/* Tertiary Wave */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-success/6 to-accent/6 rounded-full breathing-animation"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-card/30"></div>
    </div>
  );
};

export default BreathingBackground;