import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const OnboardingController = ({ children, currentStep = 1, totalSteps = 2, onComplete }) => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Check if onboarding is already completed
    const onboardingCompleted = localStorage.getItem('carevis-onboarding-completed');
    if (onboardingCompleted === 'true') {
      navigate('/home-dashboard');
    }
  }, [navigate]);

  const handleComplete = () => {
    localStorage.setItem('carevis-onboarding-completed', 'true');
    setIsCompleted(true);
    if (onComplete) {
      onComplete();
    }
    navigate('/home-dashboard');
  };

  const handleSkip = () => {
    handleComplete();
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-gentle">
            <Icon name="Heart" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">CareVis</h1>
            <p className="text-sm text-muted-foreground">Wellness Platform</p>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip Setup
        </Button>
      </header>

      {/* Progress Bar */}
      <div className="px-6 lg:px-8 mb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 lg:px-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Step Indicators */}
      <footer className="p-6 lg:p-8">
        <div className="flex items-center justify-center space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index + 1 <= currentStep
                  ? 'bg-primary' :'bg-muted'
              }`}
            />
          ))}
        </div>
      </footer>

      {/* Completion Handler */}
      {currentStep === totalSteps && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleComplete}
            className="shadow-gentle-lg"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Complete Setup
          </Button>
        </div>
      )}
    </div>
  );
};

export default OnboardingController;