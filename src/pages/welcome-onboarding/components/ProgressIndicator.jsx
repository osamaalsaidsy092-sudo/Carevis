import React from 'react';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 2 }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Step Information */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Step Dots */}
      <div className="flex items-center justify-center space-x-3 mt-6">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index + 1 <= currentStep
                ? 'bg-primary scale-110' :'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;