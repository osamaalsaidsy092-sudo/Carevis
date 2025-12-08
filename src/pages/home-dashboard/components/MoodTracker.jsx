import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MoodTracker = ({ onMoodChange }) => {
  const [currentMood, setCurrentMood] = useState(7);
  const [isTracking, setIsTracking] = useState(false);

  const moodLevels = [
    { value: 1, label: "Very Low", color: "#EF4444", emoji: "🫨" },
    { value: 2, label: "Low", color: "#F97316", emoji: "😔" },
    { value: 3, label: "Below Average", color: "#ea9308ff", emoji: "😐" },
    { value: 4, label: "Fair", color: "#ccba16ff", emoji: "🙂" },
    { value: 5, label: "Good", color: "#22C55E", emoji: "😊" },
    { value: 6, label: "Very Good", color: "#10B981", emoji: "😄" },
    { value: 7, label: "Great", color: "#06B6D4", emoji: "😁" },
    { value: 8, label: "Excellent", color: "#3B82F6", emoji: "🤩" },
    { value: 9, label: "Amazing", color: "#8B5CF6", emoji: "😍" },
    { value: 10, label: "Perfect", color: "#A855F7", emoji: "😎" }
  ];

  const getCurrentMoodData = () => {
    return moodLevels?.find(mood => mood?.value === currentMood) || moodLevels?.[6];
  };

  const handleMoodChange = (newMood) => {
    setCurrentMood(newMood);
    setIsTracking(true);
    if (onMoodChange) {
      onMoodChange(newMood);
    }
    
    // Reset tracking state after animation
    setTimeout(() => setIsTracking(false), 300);
  };

  const currentMoodData = getCurrentMoodData();
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (currentMood / 10) * circumference;

  return (
    <div className="bg-card rounded-3xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">How are you feeling?</h3>
          <p className="text-sm text-muted-foreground">Track your daily mood</p>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon name="Heart" size={20} color="var(--color-primary)" />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6">
        {/* Circular Mood Indicator */}
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-muted)"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={currentMoodData?.color}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`completion-ring ${isTracking ? 'animate-pulse' : ''}`}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl mb-1">{currentMoodData?.emoji}</span>
            <span className="text-2xl font-bold text-foreground">{currentMood}</span>
          </div>
        </div>

        {/* Mood Label */}
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{currentMoodData?.label}</p>
          <p className="text-sm text-muted-foreground">Current mood level</p>
        </div>

        {/* Mood Slider */}
        <div className="w-full">
          <input
            type="range"
            min="1"
            max="10"
            value={currentMood}
            onChange={(e) => handleMoodChange(parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #EF4444 0%, #F97316 20%, #EAB308 40%, #22C55E 60%, #06B6D4 80%, #A855F7 100%)`
            }}
          />
          <div className="flex justify-between mt-2 px-1">
            <span className="text-xs text-muted-foreground">1</span>
            <span className="text-xs text-muted-foreground">5</span>
            <span className="text-xs text-muted-foreground">10</span>
          </div>
        </div>

        {/* Quick Mood Actions */}
        <div className="flex space-x-2 w-full">
          <button
            onClick={() => handleMoodChange(Math.max(1, currentMood - 1))}
            className="flex-1 py-2 px-4 bg-muted hover:bg-muted/80 rounded-xl transition-colors duration-200 text-sm font-medium text-muted-foreground"
          >
            Lower
          </button>
          <button
            onClick={() => handleMoodChange(Math.min(10, currentMood + 1))}
            className="flex-1 py-2 px-4 bg-primary hover:bg-primary/90 rounded-xl transition-colors duration-200 text-sm font-medium text-white"
          >
            Higher
          </button>
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${currentMoodData?.color};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${currentMoodData?.color};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default MoodTracker;