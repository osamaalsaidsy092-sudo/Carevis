import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AccountSection from './components/AccountSection';
import ThemeSection from './components/ThemeSection';
import NotificationSection from './components/NotificationSection';
import PrivacySection from './components/PrivacySection';
import SubscriptionSection from './components/SubscriptionSection';
import AccessibilitySection from './components/AccessibilitySection';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('account');

  const settingSections = [
    { id: 'account', label: 'Account', icon: 'User', component: AccountSection },
    { id: 'theme', label: 'Theme', icon: 'Palette', component: ThemeSection },
    { id: 'notifications', label: 'Notifications', icon: 'Bell', component: NotificationSection },
    { id: 'privacy', label: 'Privacy', icon: 'Shield', component: PrivacySection },
    { id: 'subscription', label: 'Subscription', icon: 'CreditCard', component: SubscriptionSection },
    { id: 'accessibility', label: 'Accessibility', icon: 'Accessibility', component: AccessibilitySection }
  ];

  const ActiveComponent = settingSections?.find(section => section?.id === activeSection)?.component || AccountSection;

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleBackToDashboard = () => {
    navigate('/home-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header userRole="user" />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole="user"
      />
      {/* Main Content */}
      <main className={`lg:pl-${sidebarCollapsed ? '20' : '72'} transition-all duration-300 pb-20 lg:pb-8`}>
        <div className="container mx-auto px-4 py-6 lg:py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToDashboard}
                className="lg:hidden"
              >
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div>
                <h1 className="text-3xl font-semibold text-foreground">Profile Settings</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your account, preferences, and app configuration
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleBackToDashboard}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-4 shadow-gentle border border-border sticky top-24">
                <h2 className="font-medium text-foreground mb-4">Settings</h2>
                <nav className="space-y-1">
                  {settingSections?.map((section) => (
                    <Button
                      key={section?.id}
                      variant={activeSection === section?.id ? "default" : "ghost"}
                      onClick={() => handleSectionChange(section?.id)}
                      className="w-full justify-start rounded-xl"
                    >
                      <Icon name={section?.icon} size={18} className="mr-3" />
                      {section?.label}
                    </Button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm"
                      iconName="Download"
                      iconPosition="left"
                    >
                      Export Data
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm"
                      iconName="HelpCircle"
                      iconPosition="left"
                    >
                      Get Help
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm text-destructive"
                      iconName="LogOut"
                      iconPosition="left"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <ActiveComponent />
            </div>
          </div>

          {/* Mobile Section Navigation */}
          <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border">
            <div className="flex overflow-x-auto px-4 py-2 space-x-2">
              {settingSections?.map((section) => (
                <Button
                  key={section?.id}
                  variant={activeSection === section?.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleSectionChange(section?.id)}
                  className="flex-shrink-0 rounded-full"
                >
                  <Icon name={section?.icon} size={16} className="mr-2" />
                  {section?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Quick Action Button */}
      <QuickActionButton />
    </div>
  );
};

export default ProfileSettings;