import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FormHeader from './components/FormHeader';
import ProgressIndicator from './components/ProgressIndicator';
import AgeInput from './components/AgeInput';
import ActivityLevelSelector from './components/ActivityLevelSelector';
import GenderSelector from './components/GenderSelector';

const PersonalInfoInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    activityLevel: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has completed goal selection - check both keys for compatibility
    const goalSelection = localStorage.getItem('carevis-goal-selection');
    const selectedGoal = localStorage.getItem('carevis-selected-goal');
    
    if (!goalSelection && !selectedGoal) {
      navigate('/welcome-onboarding');
      return;
    }

    // Load any existing personal info
    const existingInfo = localStorage.getItem('carevis-personal-info');
    if (existingInfo) {
      try {
        const parsedInfo = JSON.parse(existingInfo);
        setFormData(parsedInfo);
      } catch (error) {
        console.error('Error loading existing personal info:', error);
      }
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.age || formData?.age < 13 || formData?.age > 120) {
      newErrors.age = 'Please enter a valid age between 13 and 120';
    }

    if (!formData?.activityLevel) {
      newErrors.activityLevel = 'Please select your activity level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save personal info to localStorage
      localStorage.setItem('carevis-personal-info', JSON.stringify(formData));
      
      // Create user profile with all collected data - handle both localStorage structures
      let goalData = {};
      
      try {
        const goalSelection = localStorage.getItem('carevis-goal-selection');
        const selectedGoal = localStorage.getItem('carevis-selected-goal');
        
        if (goalSelection) {
          goalData = JSON.parse(goalSelection);
        } else if (selectedGoal) {
          const parsedGoal = JSON.parse(selectedGoal);
          goalData = {
            goals: [parsedGoal?.id],
            primaryGoal: parsedGoal?.id,
            selectedGoal: parsedGoal
          };
        }
      } catch (error) {
        console.error('Error parsing goal data:', error);
        goalData = {
          goals: ['stress-relief'],
          primaryGoal: 'stress-relief'
        };
      }
      
      const userProfile = {
        ...formData,
        goals: goalData?.goals || ['stress-relief'],
        primaryGoal: goalData?.primaryGoal || 'stress-relief',
        createdAt: new Date()?.toISOString(),
        onboardingCompleted: true
      };
      
      localStorage.setItem('carevis-user-profile', JSON.stringify(userProfile));
      localStorage.setItem('carevis-onboarding-completed', 'true');

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to home dashboard
      navigate('/home-dashboard');
    } catch (error) {
      console.error('Error saving personal info:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSkipToHome = () => {
    // Save minimal profile and proceed
    const minimalProfile = {
      age: 25,
      activityLevel: 'moderately-active',
      gender: 'prefer-not-to-say',
      goals: ['stress-relief'],
      primaryGoal: 'stress-relief',
      createdAt: new Date()?.toISOString(),
      onboardingCompleted: true
    };
    
    localStorage.setItem('carevis-user-profile', JSON.stringify(minimalProfile));
    localStorage.setItem('carevis-onboarding-completed', 'true');
    navigate('/home-dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Personal Information - CareVis</title>
        <meta name="description" content="Complete your wellness profile setup with CareVis" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
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
            onClick={handleSkipToHome}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip Setup
          </Button>
        </header>

        {/* Progress Indicator */}
        <div className="px-6 lg:px-8">
          <ProgressIndicator currentStep={2} totalSteps={3} />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-8 pb-8">
          <div className="max-w-2xl mx-auto">
            <FormHeader />

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Age Input */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-gentle border border-border">
                <AgeInput
                  value={formData?.age}
                  onChange={(value) => handleFieldChange('age', value)}
                  error={errors?.age}
                />
              </div>

              {/* Activity Level Selector */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-gentle border border-border">
                <ActivityLevelSelector
                  value={formData?.activityLevel}
                  onChange={(value) => handleFieldChange('activityLevel', value)}
                  error={errors?.activityLevel}
                />
              </div>

              {/* Gender Selector */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-gentle border border-border">
                <GenderSelector
                  value={formData?.gender}
                  onChange={(value) => handleFieldChange('gender', value)}
                />
              </div>

              {/* Submit Error */}
              {errors?.submit && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={20} color="var(--color-destructive)" />
                    <p className="text-sm text-destructive">{errors?.submit}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/welcome-onboarding')}
                  className="flex-1"
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back
                </Button>
                
                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="flex-1"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {isSubmitting ? 'Saving...' : 'Complete Setup'}
                </Button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Your information is secure and will only be used to personalize your wellness experience.
              </p>
            </div>
          </div>
        </main>

        {/* Footer Progress Dots */}
        <footer className="p-6 lg:p-8">
          <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index + 1 <= 2
                    ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default PersonalInfoInput;