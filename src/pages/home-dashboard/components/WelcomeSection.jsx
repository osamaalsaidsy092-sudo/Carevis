import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ userName = "Alex", currentDate }) => {
  const dailyQuotes = [
    "Every small step towards wellness is a victory worth celebrating.",
    "Your body is your temple. Keep it pure and clean for the soul to reside in.",
    "Wellness is not a destination, it's a way of life.",
    "Take care of your body. It\'s the only place you have to live.",
    "A healthy outside starts from the inside.",
    "Progress, not perfection, is the goal.",
    "Your wellness journey is unique to you. Embrace it.",
    "Small daily improvements lead to stunning results over time."
  ];

  const todayQuote = dailyQuotes?.[Math.floor(Math.random() * dailyQuotes?.length)];

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 rounded-3xl p-6 lg:p-8 shadow-gentle">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
            Good {new Date()?.getHours() < 12 ? 'Morning' : new Date()?.getHours() < 17 ? 'Afternoon' : 'Evening'}, {userName}!
          </h1>
          <p className="text-muted-foreground font-medium">
            {currentDate}
          </p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-gentle breathing-animation">
          <Icon name="Sun" size={24} color="white" />
        </div>
      </div>
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Icon name="Quote" size={16} color="var(--color-success)" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Daily Inspiration</p>
            <p className="text-foreground leading-relaxed">{todayQuote}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;