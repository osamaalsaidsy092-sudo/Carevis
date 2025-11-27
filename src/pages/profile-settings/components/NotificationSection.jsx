import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const NotificationSection = () => {
  const [notifications, setNotifications] = useState({
    stretchReminders: true,
    achievementAlerts: true,
    communityUpdates: false,
    weeklyReports: true,
    teamUpdates: true
  });

  const [reminderTime, setReminderTime] = useState('60');
  const [quietHours, setQuietHours] = useState({ start: '22:00', end: '08:00' });

  const reminderIntervals = [
    { value: '30', label: 'Every 30 minutes' },
    { value: '60', label: 'Every hour' },
    { value: '90', label: 'Every 90 minutes' },
    { value: '120', label: 'Every 2 hours' },
    { value: 'custom', label: 'Custom schedule' }
  ];

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const notificationTypes = [
    {
      key: 'stretchReminders',
      title: 'Stretch Reminders',
      description: 'Get notified when it\'s time for your next stretch break',
      icon: 'Clock'
    },
    {
      key: 'achievementAlerts',
      title: 'Achievement Alerts',
      description: 'Celebrate when you earn new badges and reach milestones',
      icon: 'Award'
    },
    {
      key: 'communityUpdates',
      title: 'Community Updates',
      description: 'Stay updated on new posts and discussions in the community',
      icon: 'Users'
    },
    {
      key: 'weeklyReports',
      title: 'Weekly Progress Reports',
      description: 'Receive summaries of your wellness journey every week',
      icon: 'BarChart3'
    },
    {
      key: 'teamUpdates',
      title: 'Team Wellness Updates',
      description: 'Get notified about team challenges and group activities',
      icon: 'Users2'
    }
  ];

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Bell" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Notification Settings</h2>
      </div>
      <div className="space-y-6">
        {/* Notification Types */}
        <div className="space-y-4">
          {notificationTypes?.map((type) => (
            <div key={type?.key} className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={type?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{type?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{type?.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleNotification(type?.key)}
                className={notifications?.[type?.key] ? 'text-primary' : 'text-muted-foreground'}
              >
                <Icon name={notifications?.[type?.key] ? 'ToggleRight' : 'ToggleLeft'} size={24} />
              </Button>
            </div>
          ))}
        </div>

        {/* Reminder Schedule */}
        {notifications?.stretchReminders && (
          <div className="pt-4 border-t border-border">
            <h3 className="font-medium text-foreground mb-4">Reminder Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Reminder Frequency"
                options={reminderIntervals}
                value={reminderTime}
                onChange={setReminderTime}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Active Hours</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={quietHours?.start}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, start: e?.target?.value }))}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="time"
                    value={quietHours?.end}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, end: e?.target?.value }))}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Methods */}
        <div className="pt-4 border-t border-border">
          <h3 className="font-medium text-foreground mb-4">Delivery Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <Icon name="Monitor" size={20} className="text-primary" />
              <div>
                <div className="font-medium text-sm text-foreground">Browser</div>
                <div className="text-xs text-muted-foreground">In-app notifications</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <Icon name="Mail" size={20} className="text-muted-foreground" />
              <div>
                <div className="font-medium text-sm text-muted-foreground">Email</div>
                <div className="text-xs text-muted-foreground">Coming soon</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <Icon name="Smartphone" size={20} className="text-muted-foreground" />
              <div>
                <div className="font-medium text-sm text-muted-foreground">Mobile</div>
                <div className="text-xs text-muted-foreground">Coming soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;