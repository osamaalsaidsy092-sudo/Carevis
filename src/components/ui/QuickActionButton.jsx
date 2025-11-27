import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionButton = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Only show on home dashboard
  if (location?.pathname !== '/home-dashboard') {
    return null;
  }

  const quickActions = [
    {
      label: 'Breathing Exercise',
      icon: 'Wind',
      color: 'bg-primary',
      action: () => console.log('Starting breathing exercise')
    },
    {
      label: 'Quick Stretch',
      icon: 'Zap',
      color: 'bg-accent',
      action: () => console.log('Starting quick stretch')
    },
    {
      label: 'Mood Check',
      icon: 'Heart',
      color: 'bg-secondary',
      action: () => console.log('Opening mood check')
    },
    {
      label: 'Posture Break',
      icon: 'User',
      color: 'bg-success',
      action: () => console.log('Starting posture break')
    }
  ];

  const handleMainAction = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleQuickAction = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 lg:bottom-8 lg:right-8">
      {/* Quick Action Options */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-2">
          {quickActions?.map((action, index) => (
            <div
              key={action?.label}
              className="flex items-center space-x-3 slide-up-enter slide-up-enter-active"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-sm font-medium text-foreground bg-card px-3 py-2 rounded-full shadow-gentle border border-border whitespace-nowrap">
                {action?.label}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuickAction(action?.action)}
                className={`w-12 h-12 rounded-full shadow-gentle-md ${action?.color} text-white hover:scale-105 transition-all duration-200`}
              >
                <Icon name={action?.icon} size={20} color="white" />
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Main Action Button */}
      <Button
        variant="default"
        size="icon"
        onClick={handleMainAction}
        className={`w-14 h-14 rounded-full shadow-gentle-lg transition-all duration-300 ${
          isExpanded ? 'rotate-45 bg-destructive hover:bg-destructive' : 'breathing-animation'
        }`}
      >
        <Icon 
          name={isExpanded ? "Plus" : "Sparkles"} 
          size={24} 
          color="white"
        />
      </Button>
    </div>
  );
};

export default QuickActionButton;