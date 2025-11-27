import React from 'react';
import Icon from '../../../components/AppIcon';

const GenderSelector = ({ value, onChange }) => {
  const genderOptions = [
    {
      id: 'male',
      label: 'Male',
      icon: 'User'
    },
    {
      id: 'female',
      label: 'Female',
      icon: 'User'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Gender (Optional)</h3>
        <p className="text-sm text-muted-foreground">
          This helps us provide more personalized recommendations
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {genderOptions?.map((option) => (
          <button
            key={option?.id}
            type="button"
            onClick={() => onChange(option?.id)}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
              value === option?.id
                ? 'border-primary bg-primary/5 shadow-gentle'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-gentle'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-xl ${
                value === option?.id ? 'bg-primary' : 'bg-muted'
              } flex items-center justify-center`}>
                <Icon 
                  name={option?.icon} 
                  size={20} 
                  color={value === option?.id ? 'white' : 'var(--color-muted-foreground)'} 
                />
              </div>
              <span className={`text-sm font-medium ${
                value === option?.id ? 'text-primary' : 'text-foreground'
              }`}>
                {option?.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderSelector;