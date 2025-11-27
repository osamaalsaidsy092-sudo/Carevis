import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AccessibilitySection = () => {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium',
    language: 'en',
    screenReader: false,
    highContrast: false,
    reducedMotion: false,
    keyboardNavigation: true,
    voiceGuidance: false
  });

  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: '14px base size' },
    { value: 'medium', label: 'Medium', description: '16px base size' },
    { value: 'large', label: 'Large', description: '18px base size' },
    { value: 'extra-large', label: 'Extra Large', description: '20px base size' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English', description: 'English (US)' },
    { value: 'es', label: 'Español', description: 'Spanish' },
    { value: 'fr', label: 'Français', description: 'French' },
    { value: 'de', label: 'Deutsch', description: 'German' },
    { value: 'it', label: 'Italiano', description: 'Italian' },
    { value: 'pt', label: 'Português', description: 'Portuguese' }
  ];

  const handleSettingChange = (key, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSetting = (key) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const accessibilityFeatures = [
    {
      key: 'screenReader',
      title: 'Screen Reader Support',
      description: 'Enhanced compatibility with screen reading software',
      icon: 'Volume2'
    },
    {
      key: 'highContrast',
      title: 'High Contrast Mode',
      description: 'Increase color contrast for better visibility',
      icon: 'Eye'
    },
    {
      key: 'reducedMotion',
      title: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: 'Pause'
    },
    {
      key: 'keyboardNavigation',
      title: 'Keyboard Navigation',
      description: 'Navigate the app using only keyboard shortcuts',
      icon: 'Keyboard'
    },
    {
      key: 'voiceGuidance',
      title: 'Voice Guidance',
      description: 'Audio instructions for exercise routines',
      icon: 'Mic'
    }
  ];

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Accessibility" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Accessibility & Language</h2>
      </div>
      <div className="space-y-6">
        {/* Language & Text Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Language"
            description="Choose your preferred language"
            options={languageOptions}
            value={accessibilitySettings?.language}
            onChange={(value) => handleSettingChange('language', value)}
          />
          <Select
            label="Text Size"
            description="Adjust text size for better readability"
            options={fontSizeOptions}
            value={accessibilitySettings?.fontSize}
            onChange={(value) => handleSettingChange('fontSize', value)}
          />
        </div>

        {/* Accessibility Features */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Accessibility Features</h3>
          {accessibilityFeatures?.map((feature) => (
            <div key={feature?.key} className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground">{feature?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{feature?.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSetting(feature?.key)}
                className={accessibilitySettings?.[feature?.key] ? 'text-primary' : 'text-muted-foreground'}
              >
                <Icon name={accessibilitySettings?.[feature?.key] ? 'ToggleRight' : 'ToggleLeft'} size={24} />
              </Button>
            </div>
          ))}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Keyboard Shortcuts</h3>
            <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm text-foreground">Start Exercise</span>
              <div className="flex space-x-1">
                <kbd className="px-2 py-1 text-xs bg-background border border-border rounded">Space</kbd>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm text-foreground">Open Settings</span>
              <div className="flex space-x-1">
                <kbd className="px-2 py-1 text-xs bg-background border border-border rounded">Ctrl</kbd>
                <kbd className="px-2 py-1 text-xs bg-background border border-border rounded">,</kbd>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm text-foreground">Navigate Menu</span>
              <div className="flex space-x-1">
                <kbd className="px-2 py-1 text-xs bg-background border border-border rounded">Tab</kbd>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm text-foreground">Quick Actions</span>
              <div className="flex space-x-1">
                <kbd className="px-2 py-1 text-xs bg-background border border-border rounded">Alt</kbd>
                <kbd className="px-2 py-1 text-xs bg-background border border-border rounded">Q</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Resources */}
        <div className="pt-4 border-t border-border">
          <h3 className="font-medium text-foreground mb-4">Accessibility Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="justify-start"
              iconName="HelpCircle"
              iconPosition="left"
            >
              Accessibility Guide
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Request Support
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              iconName="FileText"
              iconPosition="left"
            >
              Accessibility Statement
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              iconName="Mail"
              iconPosition="left"
            >
              Contact Accessibility Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySection;