import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import GoalSelectionCard from './components/GoalSelectionCard';
import BreathingBackground from './components/BreathingBackground';
import ProgressIndicator from './components/ProgressIndicator';
import ContinueButton from './components/ContinueButton';

const WelcomeOnboarding = () => {
  const navigate = useNavigate();
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  // Check if user has already completed onboarding
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('carevis-onboarding-completed');
    if (onboardingCompleted === 'true') {
      navigate('/home-dashboard');
    }
  }, [navigate]);

  // Mock wellness goals data
  const wellnessGoals = [
    {
      id: "stress-relief",
      title: "Stress Relief",
      icon: "Brain",
      description: "Reduce daily stress and anxiety through guided breathing exercises and mindfulness techniques.",
      features: [
        "5-minute breathing sessions",
        "Stress level tracking",
        "Calming background sounds"
      ]
    },
    {
      id: "posture-improvement",
      title: "Posture Improvement", 
      icon: "User",
      description: "Strengthen your core and improve posture with targeted exercises designed for desk workers.",
      features: [
        "Desk-friendly stretches",
        "Posture reminders",
        "Core strengthening routines"
      ]
    },
    {
      id: "sleep-better",
      title: "Sleep Better",
      icon: "Moon",
      description: "Develop healthy sleep habits with evening routines and relaxation techniques.",
      features: [
        "Evening wind-down routines",
        "Sleep quality tracking",
        "Bedtime meditation guides"
      ]
    },
    {
      id: "muscle-tension",
      title: "Muscle Tension Relief",
      icon: "Zap",
      description: "Target specific muscle groups with therapeutic stretches and tension release exercises.",
      features: [
        "Targeted muscle stretches",
        "Pain level monitoring",
        "Progressive muscle relaxation"
      ]
    }
  ];

  const handleGoalSelection = (goalId) => {
    setSelectedGoalId(goalId);
    
    // Also save immediately to localStorage for better user experience
    const selectedGoal = wellnessGoals?.find(goal => goal?.id === goalId);
    if (selectedGoal) {
      localStorage.setItem('carevis-selected-goal', JSON.stringify(selectedGoal));
      
      const goalSelection = {
        goals: [selectedGoal?.id],
        primaryGoal: selectedGoal?.id,
        selectedGoal: selectedGoal,
        timestamp: new Date()?.toISOString()
      };
      localStorage.setItem('carevis-goal-selection', JSON.stringify(goalSelection));
    }
  };

  const selectedGoal = wellnessGoals?.find(goal => goal?.id === selectedGoalId);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Breathing Background Animation */}
      <BreathingBackground />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="flex-shrink-0 pt-12 lg:pt-16 px-6 lg:px-8">
          <WelcomeHeader />
        </div>

        {/* Goal Selection Section */}
        <div className="flex-1 px-6 lg:px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                Choose Your Wellness Focus
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select the area where you'd like to start your wellness journey. 
                You can always explore other goals later.
              </p>
            </div>

            {/* Goal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
              {wellnessGoals?.map((goal) => (
                <GoalSelectionCard
                  key={goal?.id}
                  goal={goal}
                  isSelected={selectedGoalId === goal?.id}
                  onSelect={handleGoalSelection}
                />
              ))}
            </div>

            {/* Continue Button */}
            <div className="flex justify-center mb-8">
              <ContinueButton 
                selectedGoal={selectedGoal}
                disabled={!selectedGoalId}
              />
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex-shrink-0 pb-8 px-6 lg:px-8">
          <ProgressIndicator currentStep={1} totalSteps={2} />
        </div>
      </div>
    </div>
  );
};

export default WelcomeOnboarding;