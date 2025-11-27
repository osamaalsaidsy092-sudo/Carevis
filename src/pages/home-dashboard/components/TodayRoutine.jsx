import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TodayRoutine = () => {
  const navigate = useNavigate();

  const todayRoutines = [
  {
    id: 1,
    title: "Morning Neck & Shoulder Relief",
    description: "Gentle stretches to release tension from overnight sleep and prepare for the day ahead.",
    duration: "8 minutes",
    difficulty: "Beginner",
    category: "Neck & Shoulders",
    thumbnail: "https://images.unsplash.com/photo-1661181358305-c53572a4a103",
    thumbnailAlt: "Woman in white top doing neck stretches in bright modern room with plants",
    completedToday: false,
    focusAreas: ["Neck", "Shoulders", "Upper Back"],
    benefits: ["Reduces stiffness", "Improves posture", "Increases mobility"]
  },
  {
    id: 2,
    title: "Desk Worker\'s Posture Reset",
    description: "Combat the effects of prolonged sitting with targeted exercises for better alignment.",
    duration: "12 minutes",
    difficulty: "Intermediate",
    category: "Posture",
    thumbnail: "https://images.unsplash.com/photo-1584240156991-12c6da9dd094",
    thumbnailAlt: "Professional woman in business attire doing stretching exercises at modern office desk",
    completedToday: false,
    focusAreas: ["Spine", "Hip Flexors", "Chest"],
    benefits: ["Corrects posture", "Relieves back pain", "Boosts energy"]
  }];


  const [selectedRoutine] = todayRoutines;

  const handleStartRoutine = (routineId) => {
    console.log(`Starting routine: ${routineId}`);
    // Navigate to routine player
  };

  const handleViewAllRoutines = () => {
    console.log('Viewing all routines');
    // Navigate to routines list
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':return 'text-success bg-success/10';
      case 'intermediate':return 'text-warning bg-warning/10';
      case 'advanced':return 'text-destructive bg-destructive/10';
      default:return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-3xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Today's Routine</h3>
          <p className="text-sm text-muted-foreground">Recommended for you</p>
        </div>
        <Button
          variant="ghost"
          onClick={handleViewAllRoutines}
          className="text-primary hover:text-primary/80">

          <Icon name="Grid3X3" size={20} className="mr-2" />
          View All
        </Button>
      </div>
      {/* Featured Routine Card */}
      <div className="bg-gradient-to-br from-primary/5 via-accent/3 to-success/5 rounded-2xl p-4 mb-4 border border-primary/10">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Thumbnail */}
          <div className="relative w-full lg:w-32 h-32 lg:h-24 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={selectedRoutine?.thumbnail}
              alt={selectedRoutine?.thumbnailAlt}
              className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-2 right-2">
              <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Icon name="Play" size={16} color="var(--color-primary)" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedRoutine?.difficulty)}`}>
                {selectedRoutine?.difficulty}
              </span>
              <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                {selectedRoutine?.category}
              </span>
            </div>
            
            <h4 className="text-lg font-semibold text-foreground mb-2">{selectedRoutine?.title}</h4>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{selectedRoutine?.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{selectedRoutine?.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Target" size={14} />
                <span>{selectedRoutine?.focusAreas?.length} areas</span>
              </div>
            </div>

            {/* Focus Areas */}
            <div className="flex flex-wrap gap-1 mb-4">
              {selectedRoutine?.focusAreas?.map((area, index) =>
              <span key={index} className="px-2 py-1 bg-accent/20 text-accent-foreground rounded-lg text-xs">
                  {area}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={() => handleStartRoutine(selectedRoutine?.id)}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            iconName="Play"
            iconPosition="left">

            Start Routine
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-initial"
            iconName="Bookmark"
            iconPosition="left">

            Save for Later
          </Button>
        </div>
      </div>
      {/* Alternative Routines */}
      <div className="space-y-3">
        <h5 className="text-sm font-medium text-muted-foreground">Alternative Options</h5>
        {todayRoutines?.slice(1)?.map((routine) =>
        <div key={routine?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200 cursor-pointer">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
              src={routine?.thumbnail}
              alt={routine?.thumbnailAlt}
              className="w-full h-full object-cover" />

            </div>
            <div className="flex-1 min-w-0">
              <h6 className="text-sm font-medium text-foreground truncate">{routine?.title}</h6>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{routine?.duration}</span>
                <span>•</span>
                <span>{routine?.difficulty}</span>
              </div>
            </div>
            <Button
            variant="ghost"
            size="icon"
            onClick={() => handleStartRoutine(routine?.id)}
            className="flex-shrink-0">

              <Icon name="Play" size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>);

};

export default TodayRoutine;