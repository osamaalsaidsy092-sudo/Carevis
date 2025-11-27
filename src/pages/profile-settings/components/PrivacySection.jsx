import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PrivacySection = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'community',
    dataSharing: 'anonymized',
    communityParticipation: 'active',
    analyticsSharing: true,
    teamDataSharing: true
  });

  const visibilityOptions = [
    { value: 'private', label: 'Private', description: 'Only visible to you' },
    { value: 'team', label: 'Team Only', description: 'Visible to your team members' },
    { value: 'community', label: 'Community', description: 'Visible to all community members' }
  ];

  const dataSharingOptions = [
    { value: 'none', label: 'No Sharing', description: 'Keep all data private' },
    { value: 'anonymized', label: 'Anonymized Only', description: 'Share anonymized insights' },
    { value: 'full', label: 'Full Sharing', description: 'Share for research and improvement' }
  ];

  const participationOptions = [
    { value: 'observer', label: 'Observer', description: 'View content but don\'t participate' },
    { value: 'limited', label: 'Limited', description: 'Participate in discussions only' },
    { value: 'active', label: 'Active', description: 'Full community participation' }
  ];

  const handleSettingChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSetting = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Shield" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Privacy & Data</h2>
      </div>
      <div className="space-y-6">
        {/* Profile Visibility */}
        <div>
          <Select
            label="Profile Visibility"
            description="Control who can see your profile information"
            options={visibilityOptions}
            value={privacySettings?.profileVisibility}
            onChange={(value) => handleSettingChange('profileVisibility', value)}
          />
        </div>

        {/* Data Sharing Preferences */}
        <div>
          <Select
            label="Data Sharing"
            description="Choose how your wellness data is used for insights"
            options={dataSharingOptions}
            value={privacySettings?.dataSharing}
            onChange={(value) => handleSettingChange('dataSharing', value)}
          />
        </div>

        {/* Community Participation */}
        <div>
          <Select
            label="Community Participation"
            description="Set your level of engagement in community features"
            options={participationOptions}
            value={privacySettings?.communityParticipation}
            onChange={(value) => handleSettingChange('communityParticipation', value)}
          />
        </div>

        {/* Additional Privacy Controls */}
        <div className="pt-4 border-t border-border">
          <h3 className="font-medium text-foreground mb-4">Additional Controls</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div className="flex items-start space-x-3">
                <Icon name="BarChart3" size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">Analytics Sharing</h4>
                  <p className="text-sm text-muted-foreground">Help improve the app with anonymized usage data</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSetting('analyticsSharing')}
                className={privacySettings?.analyticsSharing ? 'text-primary' : 'text-muted-foreground'}
              >
                <Icon name={privacySettings?.analyticsSharing ? 'ToggleRight' : 'ToggleLeft'} size={24} />
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div className="flex items-start space-x-3">
                <Icon name="Users2" size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">Team Data Sharing</h4>
                  <p className="text-sm text-muted-foreground">Allow team leaders to see anonymized wellness insights</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSetting('teamDataSharing')}
                className={privacySettings?.teamDataSharing ? 'text-primary' : 'text-muted-foreground'}
              >
                <Icon name={privacySettings?.teamDataSharing ? 'ToggleRight' : 'ToggleLeft'} size={24} />
              </Button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="pt-4 border-t border-border">
          <h3 className="font-medium text-foreground mb-4">Data Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="justify-start"
              iconName="Download"
              iconPosition="left"
            >
              Export My Data
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              iconName="FileText"
              iconPosition="left"
            >
              Privacy Policy
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Account
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              iconName="HelpCircle"
              iconPosition="left"
            >
              Privacy Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;