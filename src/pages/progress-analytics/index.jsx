import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ProgressChart from './components/ProgressChart';
import AchievementBadges from './components/AchievementBadges';
import StreakTracker from './components/StreakTracker';
import DetailedStats from './components/DetailedStats';
import ExportOptions from './components/ExportOptions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProgressAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'BarChart3' },
    { key: 'achievements', label: 'Achievements', icon: 'Award' },
    { key: 'streaks', label: 'Streaks', icon: 'Flame' },
    { key: 'detailed', label: 'Detailed Stats', icon: 'TrendingUp' },
    { key: 'export', label: 'Export', icon: 'Download' }
  ];

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProgressChart />;
      case 'achievements':
        return <AchievementBadges />;
      case 'streaks':
        return <StreakTracker />;
      case 'detailed':
        return <DetailedStats />;
      case 'export':
        return <ExportOptions />;
      default:
        return <ProgressChart />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Progress Analytics - CareVis</title>
        <meta name="description" content="Track your wellness journey with comprehensive analytics, achievement badges, and detailed progress reports." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header userRole="user" />

        {/* Sidebar */}
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={handleToggleSidebar}
          userRole="user"
        />

        {/* Main Content */}
        <main className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        } pb-20 lg:pb-8`}>
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">Progress Analytics</h1>
                  <p className="text-muted-foreground">Track your wellness journey and celebrate achievements</p>
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-card rounded-xl p-4 shadow-gentle border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Calendar" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-foreground">12</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-4 shadow-gentle border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Target" size={16} className="text-success" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-foreground">92%</div>
                      <div className="text-xs text-muted-foreground">Completion</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-4 shadow-gentle border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="Award" size={16} className="text-warning" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-foreground">5</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-4 shadow-gentle border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={16} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-foreground">11.7</div>
                      <div className="text-xs text-muted-foreground">Avg Hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="flex overflow-x-auto pb-2 space-x-2">
                {tabs?.map((tab) => (
                  <Button
                    key={tab?.key}
                    variant={activeTab === tab?.key ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab?.key)}
                    className="px-4 py-2 rounded-xl whitespace-nowrap"
                  >
                    <Icon name={tab?.icon} size={16} className="mr-2" />
                    {tab?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="slide-up-enter slide-up-enter-active">
              {renderTabContent()}
            </div>

            {/* Motivational Footer */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-2xl border border-primary/10">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={24} color="white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Keep Up the Great Work!</h3>
                <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                  Your consistency and dedication to wellness are paying off. Every session brings you closer to your goals and a healthier, happier you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="default" iconName="Play" iconPosition="left">
                    Start Today's Session
                  </Button>
                  <Button variant="outline" iconName="Share" iconPosition="left">
                    Share Progress
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Quick Action Button */}
        <QuickActionButton />
      </div>
    </>
  );
};

export default ProgressAnalytics;