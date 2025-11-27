import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityLevelSelector = ({ value, onChange, error }) => {
  const activityLevels = [
    {
      id: 'sedentary',
      label: 'Sedentary',
      description: 'Mostly sitting, minimal exercise',
      icon: 'Armchair',
      color: 'bg-muted'
    },
    {
      id: 'lightly-active',
      label: 'Lightly Active',
      description: 'Light exercise 1-3 days/week',
      icon: 'Walk',
      color: 'bg-accent'
    },
    {
      id: 'moderately-active',
      label: 'Moderately Active',
      description: 'Moderate exercise 3-5 days/week',
      icon: 'Bike',
      color: 'bg-secondary'
    },
    {
      id: 'very-active',
      label: 'Very Active',
      description: 'Hard exercise 6-7 days/week',
      icon: 'Zap',
      color: 'bg-primary'
    },
    {
      id: 'extremely-active',
      label: 'Extremely Active',
      description: 'Very hard exercise, physical job',
      icon: 'Flame',
      color: 'bg-success'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Activity Level</h3>
        <p className="text-sm text-muted-foreground">
          This helps us recommend the right intensity for your routines
        </p>
      </div>
      <div className="grid gap-3">
        {activityLevels?.map((level) => (
          <button
            key={level?.id}
            type="button"
            onClick={() => onChange(level?.id)}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
              value === level?.id
                ? 'border-primary bg-primary/5 shadow-gentle'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-gentle'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl ${level?.color} flex items-center justify-center`}>
                <Icon 
                  name={level?.icon} 
                  size={24} 
                  color={value === level?.id ? 'var(--color-primary)' : 'white'} 
                />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${
                  value === level?.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {level?.label}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {level?.description}
                </p>
              </div>
              {value === level?.id && (
                <Icon name="Check" size={20} color="var(--color-primary)" />
              )}
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
};

export default ActivityLevelSelector;