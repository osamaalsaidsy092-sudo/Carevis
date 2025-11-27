import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionButton from '../../components/ui/QuickActionButton';
import WelcomeSection from './components/WelcomeSection';
import MoodTracker from './components/MoodTracker';
import TodayRoutine from './components/TodayRoutine';
import QuickActions from './components/QuickActions';
import ProgressOverview from './components/ProgressOverview';
import TensionMonitor from './components/TensionMonitor';

const HomeDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [currentMood, setCurrentMood] = useState(7);

  useEffect(() => {
    // Check if onboarding is completed
    const onboardingCompleted = localStorage.getItem('carevis-onboarding-completed');
    if (!onboardingCompleted) {
      navigate('/welcome-onboarding');
      return;
    }

    // Get user role from localStorage or API
    const savedRole = localStorage.getItem('carevis-user-role') || 'user';
    setUserRole(savedRole);

    // Get saved sidebar state
    const savedSidebarState = localStorage.getItem('carevis-sidebar-collapsed');
    if (savedSidebarState) {
      setSidebarCollapsed(JSON.parse(savedSidebarState));
    }
  }, [navigate]);

  const handleSidebarToggle = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('carevis-sidebar-collapsed', JSON.stringify(newState));
  };

  const handleMoodChange = (newMood) => {
    setCurrentMood(newMood);
    // Save mood to localStorage or send to API
    localStorage.setItem('carevis-current-mood', newMood?.toString());
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today?.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Mobile */}
      <div className="lg:hidden">
        <Header userRole={userRole} />
      </div>

      {/* Sidebar - Desktop */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        userRole={userRole}
      />

      {/* Main Content */}
      <main className={`lg:transition-all lg:duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
      } pb-20 lg:pb-8`}>
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <WelcomeSection 
              userName="Alex"
              currentDate={getCurrentDate()}
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              {/* Mood Tracker & Quick Actions Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MoodTracker onMoodChange={handleMoodChange} />
                <QuickActions />
              </div>

              {/* Today's Routine */}
              <TodayRoutine />

              {/* Tension Monitor - Mobile/Tablet */}
              <div className="lg:hidden">
                <TensionMonitor />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
              {/* Progress Overview */}
              <ProgressOverview />

              {/* Tension Monitor - Desktop */}
              <div className="hidden lg:block">
                <TensionMonitor />
              </div>
            </div>
          </div>

          {/* Additional Insights Section */}
          <div className="mt-8 lg:mt-12">
            <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-success/10 rounded-3xl p-6 lg:p-8 border border-accent/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Your Wellness Journey
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Based on your current mood level of {currentMood}/10 and recent activity, 
                    you're making excellent progress. Consider adding a breathing exercise 
                    to your routine for enhanced relaxation.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                  <button
                    onClick={() => navigate('/progress-analytics')}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200"
                  >
                    View Analytics
                  </button>
                  <button
                    onClick={() => console.log('Starting personalized routine')}
                    className="px-6 py-3 bg-card text-foreground border border-border rounded-xl font-medium hover:bg-muted/50 transition-colors duration-200"
                  >
                    Get Recommendations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Action Button */}
      <QuickActionButton />
    </div>
  );
};

export default HomeDashboard;