import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressOverview = () => {
  const navigate = useNavigate();

  const progressData = {
    currentStreak: 7,
    longestStreak: 21,
    weeklyGoal: 5,
    completedThisWeek: 4,
    totalSessions: 156,
    minutesThisWeek: 42,
    weeklyTarget: 60
  };

  const recentAchievements = [
    {
      id: 1,
      title: "Week Warrior",
      description: "Completed 5 sessions this week",
      icon: "Trophy",
      color: "text-warning bg-warning/10",
      earnedDate: "2 days ago",
      isNew: true
    },
    {
      id: 2,
      title: "Consistency Champion",
      description: "7-day streak achieved",
      icon: "Target",
      color: "text-success bg-success/10",
      earnedDate: "Today",
      isNew: true
    },
    {
      id: 3,
      title: "Mood Master",
      description: "Tracked mood for 30 days",
      icon: "Heart",
      color: "text-primary bg-primary/10",
      earnedDate: "1 week ago",
      isNew: false
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: true, sessions: 2 },
    { day: 'Tue', completed: true, sessions: 1 },
    { day: 'Wed', completed: false, sessions: 0 },
    { day: 'Thu', completed: true, sessions: 1 },
    { day: 'Fri', completed: true, sessions: 2 },
    { day: 'Sat', completed: false, sessions: 0 },
    { day: 'Sun', completed: false, sessions: 0 }
  ];

  const handleViewAnalytics = () => {
    navigate('/progress-analytics');
  };

  const streakPercentage = (progressData?.currentStreak / progressData?.longestStreak) * 100;
  const weeklyPercentage = (progressData?.completedThisWeek / progressData?.weeklyGoal) * 100;
  const minutesPercentage = (progressData?.minutesThisWeek / progressData?.weeklyTarget) * 100;

  return (
    <div className="bg-card rounded-3xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Your Progress</h3>
          <p className="text-sm text-muted-foreground">Keep up the great work!</p>
        </div>
        <Button
          variant="ghost"
          onClick={handleViewAnalytics}
          className="text-primary hover:text-primary/80"
        >
          <Icon name="BarChart3" size={20} className="mr-2" />
          View All
        </Button>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Current Streak */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Flame" size={16} color="var(--color-primary)" />
            </div>
            <span className="text-xs text-primary font-medium">
              {streakPercentage?.toFixed(0)}%
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">{progressData?.currentStreak}</p>
          <p className="text-xs text-muted-foreground">Day streak</p>
        </div>

        {/* Weekly Progress */}
        <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-4 border border-success/10">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={16} color="var(--color-success)" />
            </div>
            <span className="text-xs text-success font-medium">
              {weeklyPercentage?.toFixed(0)}%
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">
            {progressData?.completedThisWeek}/{progressData?.weeklyGoal}
          </p>
          <p className="text-xs text-muted-foreground">This week</p>
        </div>

        {/* Minutes This Week */}
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-4 border border-accent/10 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={16} color="var(--color-accent)" />
            </div>
            <span className="text-xs text-accent-foreground font-medium">
              {minutesPercentage?.toFixed(0)}%
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">{progressData?.minutesThisWeek}m</p>
          <p className="text-xs text-muted-foreground">Weekly minutes</p>
        </div>
      </div>
      {/* Weekly Calendar */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-muted-foreground mb-3">This Week's Activity</h5>
        <div className="flex justify-between space-x-2">
          {weeklyProgress?.map((day, index) => (
            <div key={day?.day} className="flex-1 text-center">
              <p className="text-xs text-muted-foreground mb-2">{day?.day}</p>
              <div className={`w-full h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                day?.completed 
                  ? 'bg-success text-white' 
                  : index === new Date()?.getDay() - 1 
                    ? 'bg-primary/20 text-primary border-2 border-primary/30' :'bg-muted text-muted-foreground'
              }`}>
                {day?.completed ? (
                  <Icon name="Check" size={16} />
                ) : index === new Date()?.getDay() - 1 ? (
                  <Icon name="Circle" size={12} />
                ) : (
                  <span className="text-xs">{day?.sessions}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-sm font-medium text-muted-foreground">Recent Achievements</h5>
          <span className="text-xs text-primary font-medium">{recentAchievements?.filter(a => a?.isNew)?.length} new</span>
        </div>
        
        <div className="space-y-3">
          {recentAchievements?.slice(0, 2)?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${achievement?.color}`}>
                <Icon name={achievement?.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h6 className="text-sm font-medium text-foreground">{achievement?.title}</h6>
                  {achievement?.isNew && (
                    <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">New</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{achievement?.description}</p>
              </div>
              <span className="text-xs text-muted-foreground">{achievement?.earnedDate}</span>
            </div>
          ))}
        </div>

        {recentAchievements?.length > 2 && (
          <Button
            variant="ghost"
            onClick={handleViewAnalytics}
            className="w-full mt-3 text-muted-foreground hover:text-foreground"
          >
            View {recentAchievements?.length - 2} more achievements
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProgressOverview;