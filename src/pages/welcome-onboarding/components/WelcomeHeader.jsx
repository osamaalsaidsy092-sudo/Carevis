import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-12">
      {/* Logo and Branding */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-gentle-lg breathing-animation">
          <Icon name="Heart" size={32} color="white" />
        </div>
      </div>
      
      {/* Welcome Message */}
      <h1 className="text-4xl lg:text-5xl font-semibold text-foreground mb-4">
        Welcome to <span className="text-primary">CareVis</span>
      </h1>
      
      {/* App Purpose Description */}
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Your personal wellness companion for muscle tension relief, stress management, and building healthy routines. 
        Let's create a calm digital space tailored just for you.
      </p>
    </div>
  );
};

export default WelcomeHeader;