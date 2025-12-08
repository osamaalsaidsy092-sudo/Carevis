import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse, userRole = 'user' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  // Hide the sidebar on specific routes (e.g. profile page)
  const hideOnPaths = ['/profile-settings'];
  if (hideOnPaths.includes(location?.pathname)) return null;

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/home-dashboard', 
      icon: 'Home',
      description: 'Your wellness overview'
    },
    { 
      label: 'Progress', 
      path: '/progress-analytics', 
      icon: 'TrendingUp',
      description: 'Track your journey'
    },
    { 
      label: 'Community', 
      path: '/community', 
      icon: 'Users',
      description: 'Connect with others'
    },
    { 
      label: 'Profile', 
      path: '/profile-settings', 
      icon: 'User',
      description: 'Manage your account'
    },
  ];

  if (userRole === 'leader' || userRole === 'admin') {
    navigationItems?.push({ 
      label: 'Team Dashboard', 
      path: '/team-dashboard', 
      icon: 'Users2',
      description: 'Team wellness insights'
    });
  }

  const quickActions = [
    { label: 'Quick Exercise', icon: 'Play', action: 'exercise' },
    { label: 'Breathing', icon: 'Wind', action: 'breathing' },
    { label: 'Mood Check', icon: 'Heart', action: 'mood' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  const Logo = () => (
    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-8`}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-gentle bg-transparent">
        <img src="/images/LOGO.png" alt="CareVis logo" className="w-full h-full object-contain" />
      </div>
      {!isCollapsed && (
        <div>
          <h1 className="text-xl font-semibold text-foreground">CareVis</h1>
          <p className="text-xs text-muted-foreground">Wellness Platform</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'lg:w-20' : 'lg:w-72'
      }`}>
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Logo />
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="rounded-xl"
              >
                <Icon name="PanelLeftClose" size={20} />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navigationItems?.map((item) => (
              <div
                key={item?.path}
                className="relative"
                onMouseEnter={() => setHoveredItem(item?.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Button
                  variant={isActive(item?.path) ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full justify-start rounded-xl transition-all duration-200 ${
                    isCollapsed ? 'px-3' : 'px-4'
                  } py-3`}
                >
                  <Icon name={item?.icon} size={20} className={isCollapsed ? '' : 'mr-3'} />
                  {!isCollapsed && (
                    <span className="font-medium">{item?.label}</span>
                  )}
                </Button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && hoveredItem === item?.path && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-popover border border-border rounded-lg px-3 py-2 shadow-gentle-lg z-50">
                    <p className="text-sm font-medium text-popover-foreground">{item?.label}</p>
                    <p className="text-xs text-muted-foreground">{item?.description}</p>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions?.map((action) => (
                  <Button
                    key={action?.action}
                    variant="ghost"
                    onClick={() => handleQuickAction(action?.action)}
                    className="w-full justify-start px-4 py-2 rounded-xl text-sm"
                  >
                    <Icon name={action?.icon} size={16} className="mr-3" />
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Collapse Button for collapsed state */}
          {isCollapsed && (
            <div className="mt-auto pt-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="w-full rounded-xl"
              >
                <Icon name="PanelLeftOpen" size={20} />
              </Button>
            </div>
          )}
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around px-4 py-2">
          {navigationItems?.slice(0, 4)?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl min-w-0 ${
                isActive(item?.path) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'}
              />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </Button>
          ))}
          
          {/* Team tab for leaders on mobile */}
          {(userRole === 'leader' || userRole === 'admin') && (
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/team-dashboard')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl min-w-0 ${
                isActive('/team-dashboard') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon 
                name="Users2" 
                size={20} 
                color={isActive('/team-dashboard') ? 'var(--color-primary)' : 'currentColor'}
              />
              <span className="text-xs font-medium truncate">Team</span>
            </Button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;