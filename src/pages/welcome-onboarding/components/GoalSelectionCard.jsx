import React from 'react';
import Icon from '../../../components/AppIcon';

const GoalSelectionCard = ({ goal, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(goal?.id)}
      className={`relative p-6 lg:p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-gentle-lg'
          : 'border-border bg-card hover:border-primary/50 shadow-gentle'
      }`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={16} color="white" />
        </div>
      )}
      {/* Goal Icon */}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
        isSelected 
          ? 'bg-primary text-white' :'bg-accent/20 text-primary'
      }`}>
        <Icon name={goal?.icon} size={32} />
      </div>
      {/* Goal Content */}
      <div className="text-left">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {goal?.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {goal?.description}
        </p>
        
        {/* Preview Features */}
        <div className="space-y-2">
          {goal?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalSelectionCard;