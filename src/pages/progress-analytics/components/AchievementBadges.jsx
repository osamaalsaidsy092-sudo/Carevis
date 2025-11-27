import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementBadges = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first wellness session",
      icon: "Trophy",
      category: "milestone",
      earned: true,
      earnedDate: "2025-11-01",
      progress: 100,
      color: "bg-gradient-to-br from-primary to-accent",
      rarity: "common"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Complete 7 consecutive days of wellness activities",
      icon: "Calendar",
      category: "streak",
      earned: true,
      earnedDate: "2025-11-08",
      progress: 100,
      color: "bg-gradient-to-br from-success to-accent",
      rarity: "uncommon"
    },
    {
      id: 3,
      title: "Breathing Master",
      description: "Complete 50 breathing exercises",
      icon: "Wind",
      category: "skill",
      earned: true,
      earnedDate: "2025-11-10",
      progress: 100,
      color: "bg-gradient-to-br from-secondary to-primary",
      rarity: "rare"
    },
    {
      id: 4,
      title: "Mood Tracker",
      description: "Log your mood for 30 consecutive days",
      icon: "Heart",
      category: "consistency",
      earned: false,
      progress: 73,
      color: "bg-gradient-to-br from-warning to-accent",
      rarity: "uncommon"
    },
    {
      id: 5,
      title: "Stress Buster",
      description: "Complete 25 stress relief sessions",
      icon: "Zap",
      category: "skill",
      earned: false,
      progress: 84,
      color: "bg-gradient-to-br from-destructive to-warning",
      rarity: "rare"
    },
    {
      id: 6,
      title: "Perfect Month",
      description: "Achieve 100% completion rate for a full month",
      icon: "Star",
      category: "milestone",
      earned: false,
      progress: 45,
      color: "bg-gradient-to-br from-primary via-accent to-success",
      rarity: "legendary"
    },
    {
      id: 7,
      title: "Early Bird",
      description: "Complete morning routines for 14 days",
      icon: "Sunrise",
      category: "habit",
      earned: true,
      earnedDate: "2025-11-05",
      progress: 100,
      color: "bg-gradient-to-br from-warning to-primary",
      rarity: "common"
    },
    {
      id: 8,
      title: "Community Helper",
      description: "Help 10 community members with wellness tips",
      icon: "Users",
      category: "social",
      earned: false,
      progress: 60,
      color: "bg-gradient-to-br from-accent to-secondary",
      rarity: "uncommon"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Badges', icon: 'Award' },
    { key: 'milestone', label: 'Milestones', icon: 'Trophy' },
    { key: 'streak', label: 'Streaks', icon: 'Flame' },
    { key: 'skill', label: 'Skills', icon: 'Target' },
    { key: 'consistency', label: 'Consistency', icon: 'Calendar' },
    { key: 'habit', label: 'Habits', icon: 'Clock' },
    { key: 'social', label: 'Social', icon: 'Users' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const earnedCount = achievements?.filter(a => a?.earned)?.length;
  const totalCount = achievements?.length;

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground';
      case 'uncommon': return 'text-success';
      case 'rare': return 'text-primary';
      case 'legendary': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Achievement Badges</h3>
          <p className="text-sm text-muted-foreground">
            {earnedCount} of {totalCount} badges earned
          </p>
        </div>
        
        {/* Progress Ring */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${(earnedCount / totalCount) * 175.93} 175.93`}
              className="text-primary completion-ring"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-foreground">
              {Math.round((earnedCount / totalCount) * 100)}%
            </span>
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-2 mb-6 space-x-2">
        {categories?.map((category) => (
          <Button
            key={category?.key}
            variant={selectedCategory === category?.key ? "default" : "ghost"}
            onClick={() => setSelectedCategory(category?.key)}
            className="px-4 py-2 rounded-xl whitespace-nowrap"
          >
            <Icon name={category?.icon} size={16} className="mr-2" />
            {category?.label}
          </Button>
        ))}
      </div>
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAchievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative rounded-xl p-4 border transition-all duration-300 hover:scale-105 ${
              achievement?.earned
                ? 'bg-gradient-to-br from-card to-muted border-primary/20 shadow-gentle'
                : 'bg-muted/50 border-border'
            }`}
          >
            {/* Badge Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
              achievement?.earned ? achievement?.color : 'bg-muted'
            }`}>
              <Icon 
                name={achievement?.icon} 
                size={24} 
                color={achievement?.earned ? "white" : "var(--color-muted-foreground)"}
              />
            </div>

            {/* Badge Info */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h4 className={`font-medium text-sm ${
                  achievement?.earned ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {achievement?.title}
                </h4>
                <span className={`text-xs font-medium capitalize ${getRarityColor(achievement?.rarity)}`}>
                  {achievement?.rarity}
                </span>
              </div>
              
              <p className={`text-xs ${
                achievement?.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'
              }`}>
                {achievement?.description}
              </p>

              {/* Progress or Earned Date */}
              {achievement?.earned ? (
                <div className="flex items-center space-x-2 pt-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-xs text-success font-medium">
                    Earned {formatDate(achievement?.earnedDate)}
                  </span>
                </div>
              ) : (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium text-foreground">
                      {achievement?.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${achievement?.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Earned Indicator */}
            {achievement?.earned && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center shadow-gentle">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredAchievements?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Award" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-2">No badges in this category</h4>
          <p className="text-xs text-muted-foreground">
            Keep working on your wellness journey to unlock achievements!
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;