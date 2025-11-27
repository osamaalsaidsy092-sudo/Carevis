import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailedStats = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const timeframes = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'quarter', label: '3 Months' },
    { key: 'year', label: 'This Year' }
  ];

  const statsData = {
    week: {
      totalSessions: 24,
      totalMinutes: 180,
      avgSessionLength: 7.5,
      favoriteRoutine: "Morning Stretch",
      completionRate: 92,
      moodImprovement: 15,
      tensionReduction: 22,
      streakDays: 12
    },
    month: {
      totalSessions: 94,
      totalMinutes: 705,
      avgSessionLength: 7.5,
      favoriteRoutine: "Breathing Basics",
      completionRate: 88,
      moodImprovement: 28,
      tensionReduction: 35,
      streakDays: 28
    },
    quarter: {
      totalSessions: 276,
      totalMinutes: 2070,
      avgSessionLength: 7.5,
      favoriteRoutine: "Desk Relief",
      completionRate: 85,
      moodImprovement: 42,
      tensionReduction: 48,
      streakDays: 28
    },
    year: {
      totalSessions: 1104,
      totalMinutes: 8280,
      avgSessionLength: 7.5,
      favoriteRoutine: "Breathing Basics",
      completionRate: 87,
      moodImprovement: 65,
      tensionReduction: 58,
      streakDays: 28
    }
  };

  const currentStats = statsData?.[selectedTimeframe];

  const routineBreakdown = [
    { name: "Breathing Exercises", sessions: 32, percentage: 34, color: "#3398DB" },
    { name: "Stretching Routines", sessions: 26, percentage: 28, color: "#7EC8E3" },
    { name: "Posture Correction", sessions: 21, percentage: 22, color: "#A3E4D7" },
    { name: "Stress Relief", sessions: 15, percentage: 16, color: "#F6E7C1" }
  ];

  const timeDistribution = [
    { period: "Morning (6-12)", sessions: 38, percentage: 40 },
    { period: "Afternoon (12-18)", sessions: 32, percentage: 34 },
    { period: "Evening (18-24)", sessions: 24, percentage: 26 }
  ];

  const wellnessMetrics = [
    {
      label: "Total Sessions",
      value: currentStats?.totalSessions,
      unit: "sessions",
      icon: "Play",
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+12%"
    },
    {
      label: "Total Time",
      value: Math.floor(currentStats?.totalMinutes / 60),
      unit: "hours",
      icon: "Clock",
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: "+8%"
    },
    {
      label: "Avg Session",
      value: currentStats?.avgSessionLength,
      unit: "min",
      icon: "Timer",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      trend: "+2%"
    },
    {
      label: "Completion Rate",
      value: currentStats?.completionRate,
      unit: "%",
      icon: "Target",
      color: "text-success",
      bgColor: "bg-success/10",
      trend: "+5%"
    }
  ];

  const improvementMetrics = [
    {
      label: "Mood Improvement",
      value: currentStats?.moodImprovement,
      unit: "%",
      icon: "Heart",
      description: "Average mood score increase"
    },
    {
      label: "Tension Reduction",
      value: currentStats?.tensionReduction,
      unit: "%",
      icon: "Zap",
      description: "Reported tension level decrease"
    },
    {
      label: "Longest Streak",
      value: currentStats?.streakDays,
      unit: "days",
      icon: "Flame",
      description: "Consecutive days of activity"
    }
  ];

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Selection */}
      <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Detailed Statistics</h3>
            <p className="text-sm text-muted-foreground">Comprehensive view of your wellness journey</p>
          </div>
          
          <div className="flex bg-muted rounded-xl p-1">
            {timeframes?.map((timeframe) => (
              <Button
                key={timeframe?.key}
                variant={selectedTimeframe === timeframe?.key ? "default" : "ghost"}
                onClick={() => setSelectedTimeframe(timeframe?.key)}
                className="px-3 py-2 text-sm rounded-lg"
              >
                {timeframe?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {wellnessMetrics?.map((metric, index) => (
            <div key={index} className="bg-muted/50 rounded-xl p-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${metric?.bgColor}`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline space-x-1">
                  <span className={`text-xl font-semibold ${metric?.color}`}>
                    {metric?.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{metric?.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">{metric?.label}</p>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} className="text-success" />
                  <span className="text-xs text-success font-medium">{metric?.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Routine Breakdown */}
      <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
        <h4 className="text-lg font-semibold text-foreground mb-4">Routine Breakdown</h4>
        <div className="space-y-4">
          {routineBreakdown?.map((routine, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: routine?.color }}
                />
                <span className="text-sm font-medium text-foreground">{routine?.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{routine?.sessions} sessions</span>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${routine?.percentage}%`,
                      backgroundColor: routine?.color 
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">
                  {routine?.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Time Distribution & Improvement Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Distribution */}
        <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
          <h4 className="text-lg font-semibold text-foreground mb-4">Time Distribution</h4>
          <div className="space-y-4">
            {timeDistribution?.map((time, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{time?.period}</span>
                  <span className="text-sm text-muted-foreground">{time?.sessions} sessions</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${time?.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Metrics */}
        <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
          <h4 className="text-lg font-semibold text-foreground mb-4">Health Improvements</h4>
          <div className="space-y-4">
            {improvementMetrics?.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={metric?.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{metric?.label}</div>
                    <div className="text-xs text-muted-foreground">{metric?.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">
                    {metric?.value}{metric?.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Favorite Routine Highlight */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="Star" size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">Favorite Routine</h4>
              <p className="text-sm text-muted-foreground">Your most completed routine this {selectedTimeframe}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold text-primary">{currentStats?.favoriteRoutine}</div>
            <div className="text-sm text-muted-foreground">Most practiced</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedStats;