import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'user' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Progress', path: '/progress-analytics', icon: 'TrendingUp' },
    { label: 'Community', path: '/community', icon: 'Users' },
    { label: 'Profile', path: '/profile-settings', icon: 'User' },
  ];

  if (userRole === 'leader' || userRole === 'admin') {
    navigationItems?.push({ label: 'Team', path: '/team-dashboard', icon: 'Users2' });
  }

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Contact Us', path: '/contact-us', icon: 'Mail' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-lg overflow-hidden bg-transparent flex items-center justify-center">
        <img src="/images/LOGO.png" alt="CareVis logo" className="w-full h-full object-contain" />
      </div>
      <span className="text-xl font-semibold text-foreground">CareVis</span>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <Button
                key={item?.path}
                variant={isActive(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                className="px-4 py-2 rounded-full transition-all duration-200"
              >
                <Icon name={item?.icon} size={18} className="mr-2" />
                {item?.label}
              </Button>
            ))}
            
            {/* Team Dashboard for Leaders */}
            {(userRole === 'leader' || userRole === 'admin') && (
              <Button
                variant={isActive('/team-dashboard') ? "default" : "ghost"}
                onClick={() => handleNavigation('/team-dashboard')}
                className="px-4 py-2 rounded-full transition-all duration-200"
              >
                <Icon name="Users2" size={18} className="mr-2" />
                Team
              </Button>
            )}

            {/* More Menu */}
            <div className="relative group">
              <Button variant="ghost" className="px-4 py-2 rounded-full">
                <Icon name="MoreHorizontal" size={18} className="mr-2" />
                More
              </Button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-2xl shadow-gentle-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {secondaryItems?.map((item) => (
                    <Button
                      key={item?.path}
                      variant="ghost"
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full justify-start px-3 py-2 rounded-xl"
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActive(item?.path) ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  className="w-full justify-start px-4 py-3 rounded-xl"
                >
                  <Icon name={item?.icon} size={20} className="mr-3" />
                  {item?.label}
                </Button>
              ))}
              
              <div className="border-t border-border pt-2 mt-4">
                {secondaryItems?.map((item) => (
                  <Button
                    key={item?.path}
                    variant="ghost"
                    onClick={() => handleNavigation(item?.path)}
                    className="w-full justify-start px-4 py-3 rounded-xl"
                  >
                    <Icon name={item?.icon} size={20} className="mr-3" />
                    {item?.label}
                  </Button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;