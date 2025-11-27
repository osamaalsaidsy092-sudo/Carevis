import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ContinueButton = ({ selectedGoal, disabled }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedGoal) {
      // Store selected goal in localStorage with consistent key structure
      const goalSelection = {
        goals: [selectedGoal?.id],
        primaryGoal: selectedGoal?.id,
        selectedGoal: selectedGoal,
        timestamp: new Date()?.toISOString()
      };
      
      localStorage.setItem('carevis-selected-goal', JSON.stringify(selectedGoal));
      localStorage.setItem('carevis-goal-selection', JSON.stringify(goalSelection));
      
      // Navigate to personal info input
      navigate('/personal-info-input');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleContinue}
        disabled={disabled}
        variant="default"
        size="lg"
        iconName="ArrowRight"
        iconPosition="right"
        className="px-8 py-4 text-lg font-medium shadow-gentle-lg"
      >
        Continue Your Journey
      </Button>
      
      {disabled && (
        <p className="text-sm text-muted-foreground text-center">
          Please select a wellness goal to continue
        </p>
      )}
    </div>
  );
};

export default ContinueButton;