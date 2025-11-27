import React from 'react';
import Icon from '../../../components/AppIcon';

const TeamMetricsCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      primary: "bg-primary/10 text-primary border-primary/20",
      success: "bg-success/10 text-success border-success/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      accent: "bg-accent/10 text-accent border-accent/20"
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getChangeIcon = () => {
    if (changeType === 'increase') return 'TrendingUp';
    if (changeType === 'decrease') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = () => {
    if (changeType === 'increase') return 'text-success';
    if (changeType === 'decrease') return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-gentle hover:shadow-gentle-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default TeamMetricsCard;