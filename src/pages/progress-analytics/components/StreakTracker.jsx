import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakTracker = () => {
  const currentStreak = 12;
  const longestStreak = 28;
  const weeklyGoal = 5;
  const weeklyCompleted = 4;

  // Generate calendar data for the last 30 days
  const generateCalendarData = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date?.setDate(date?.getDate() - i);
      
      // Mock completion data - higher probability for recent days
      const completionRate = Math.random();
      const isCompleted = i < 12 ? completionRate > 0.2 : completionRate > 0.4;
      
      days?.push({
        date: date,
        day: date?.getDate(),
        isCompleted: isCompleted,
        isToday: i === 0,
        sessionsCount: isCompleted ? Math.floor(Math.random() * 4) + 1 : 0
      });
    }
    
    return days;
  };

  const calendarData = generateCalendarData();
  const completedDays = calendarData?.filter(day => day?.isCompleted)?.length;
  const completionPercentage = Math.round((completedDays / 30) * 100);

  const streakStats = [
    {
      label: "Current Streak",
      value: currentStreak,
      unit: "days",
      icon: "Flame",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      label: "Longest Streak",
      value: longestStreak,
      unit: "days",
      icon: "Trophy",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      label: "This Week",
      value: `${weeklyCompleted}/${weeklyGoal}`,
      unit: "sessions",
      icon: "Target",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      label: "30-Day Rate",
      value: completionPercentage,
      unit: "%",
      icon: "TrendingUp",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const getIntensityClass = (sessionsCount) => {
    if (sessionsCount === 0) return 'bg-muted';
    if (sessionsCount === 1) return 'bg-primary/30';
    if (sessionsCount === 2) return 'bg-primary/60';
    if (sessionsCount >= 3) return 'bg-primary';
    return 'bg-muted';
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Streak Tracking</h3>
          <p className="text-sm text-muted-foreground">Your consistency journey</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Flame" size={20} className="text-primary" />
          <span className="text-2xl font-bold text-primary">{currentStreak}</span>
          <span className="text-sm text-muted-foreground">days</span>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {streakStats?.map((stat, index) => (
          <div key={index} className="bg-muted/50 rounded-xl p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1">
                <span className={`text-xl font-semibold ${stat?.color}`}>
                  {stat?.value}
                </span>
                <span className="text-xs text-muted-foreground">{stat?.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground">{stat?.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Activity Calendar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Last 30 Days Activity</h4>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded bg-muted"></div>
              <div className="w-3 h-3 rounded bg-primary/30"></div>
              <div className="w-3 h-3 rounded bg-primary/60"></div>
              <div className="w-3 h-3 rounded bg-primary"></div>
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-10 gap-1 sm:gap-2">
          {calendarData?.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded transition-all duration-200 hover:scale-110 cursor-pointer relative group ${
                getIntensityClass(day?.sessionsCount)
              } ${day?.isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' : ''}`}
              title={`${formatDate(day?.date)}: ${day?.sessionsCount} sessions`}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded text-xs text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                <div className="font-medium">{formatDate(day?.date)}</div>
                <div className="text-muted-foreground">
                  {day?.sessionsCount} session{day?.sessionsCount !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Weekly Goal Progress */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Weekly Goal Progress</h4>
          <span className="text-sm text-muted-foreground">
            {weeklyCompleted} of {weeklyGoal} sessions
          </span>
        </div>
        
        <div className="relative">
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${Math.min((weeklyCompleted / weeklyGoal) * 100, 100)}%` }}
            >
              {weeklyCompleted >= weeklyGoal && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              )}
            </div>
          </div>
          
          {/* Goal Achievement Indicator */}
          {weeklyCompleted >= weeklyGoal && (
            <div className="flex items-center justify-center mt-3 space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Weekly goal achieved!</span>
              <Icon name="Sparkles" size={16} className="text-success" />
            </div>
          )}
        </div>
      </div>
      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={16} className="text-primary" />
          </div>
          <div>
            <h5 className="text-sm font-medium text-foreground mb-1">Keep it up!</h5>
            <p className="text-xs text-muted-foreground">
              {currentStreak >= 7 
                ? `Amazing! You're on a ${currentStreak}-day streak. Consistency is key to building lasting wellness habits.`
                : `You're building momentum with ${currentStreak} consecutive days. Just ${7 - currentStreak} more days to reach a full week!`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakTracker;