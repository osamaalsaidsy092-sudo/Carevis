import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThemeSection = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: 'Sun',
      preview: 'bg-gradient-to-br from-background to-card',
      colors: ['bg-primary', 'bg-accent', 'bg-success']
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes for low light',
      icon: 'Moon',
      preview: 'bg-gradient-to-br from-slate-900 to-slate-800',
      colors: ['bg-blue-400', 'bg-teal-400', 'bg-green-400']
    },
    {
      id: 'high-contrast',
      name: 'High Contrast',
      description: 'Enhanced visibility and accessibility',
      icon: 'Eye',
      preview: 'bg-gradient-to-br from-black to-gray-900',
      colors: ['bg-yellow-400', 'bg-white', 'bg-cyan-400']
    }
  ];

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    // Theme change logic would go here
    console.log('Changing theme to:', themeId);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Palette" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Theme & Appearance</h2>
      </div>
      <div className="space-y-4">
        {themes?.map((theme) => (
          <div
            key={theme?.id}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedTheme === theme?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => handleThemeChange(theme?.id)}
          >
            <div className="flex items-center space-x-4">
              {/* Theme Preview */}
              <div className={`w-16 h-12 rounded-lg ${theme?.preview} border border-border relative overflow-hidden`}>
                <div className="absolute top-1 left-1 right-1 h-2 bg-white/20 rounded-sm" />
                <div className="absolute bottom-1 left-1 flex space-x-1">
                  {theme?.colors?.map((color, index) => (
                    <div key={index} className={`w-2 h-2 rounded-full ${color}`} />
                  ))}
                </div>
              </div>

              {/* Theme Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon name={theme?.icon} size={20} className="text-foreground" />
                  <h3 className="font-medium text-foreground">{theme?.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{theme?.description}</p>
              </div>

              {/* Selection Indicator */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedTheme === theme?.id
                  ? 'border-primary bg-primary' :'border-muted'
              }`}>
                {selectedTheme === theme?.id && (
                  <Icon name="Check" size={16} color="white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Appearance Settings */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-4">Display Options</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">Reduce Motion</div>
              <div className="text-xs text-muted-foreground">Minimize animations and transitions</div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              <Icon name="ToggleLeft" size={20} />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">Large Text</div>
              <div className="text-xs text-muted-foreground">Increase font size for better readability</div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              <Icon name="ToggleLeft" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSection;