import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [activeAction, setActiveAction] = useState(null);

  const quickActions = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      subtitle: '2-5 minutes',
      description: 'Calm your mind with guided breathing',
      icon: 'Wind',
      color: 'from-primary to-primary/80',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      action: () => console.log('Starting breathing exercise')
    },
    {
      id: 'stretch',
      title: 'Quick Stretch',
      subtitle: '3 minutes',
      description: 'Release tension instantly',
      icon: 'Zap',
      color: 'from-accent to-accent/80',
      bgColor: 'bg-accent/10',
      textColor: 'text-accent-foreground',
      action: () => console.log('Starting quick stretch')
    },
    {
      id: 'posture',
      title: 'Posture Check',
      subtitle: '1 minute',
      description: 'Align your spine properly',
      icon: 'User',
      color: 'from-success to-success/80',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      action: () => console.log('Starting posture check')
    },
    {
      id: 'eyes',
      title: 'Eye Rest',
      subtitle: '2 minutes',
      description: 'Reduce digital eye strain',
      icon: 'Eye',
      color: 'from-warning to-warning/80',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      action: () => console.log('Starting eye rest')
    }
  ];

  const handleActionClick = (action) => {
    setActiveAction(action?.id);
    action?.action();
    
    // Reset active state after animation
    setTimeout(() => setActiveAction(null), 200);
  };

  return (
    <div className="bg-card rounded-3xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Quick Relief</h3>
          <p className="text-sm text-muted-foreground">Instant wellness actions</p>
        </div>
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
          <Icon name="Zap" size={20} color="var(--color-accent)" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className={`group relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-gentle-md ${
              activeAction === action?.id ? 'scale-95' : ''
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action?.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${action?.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={action?.icon} size={24} color={`var(--color-${action?.id === 'stretch' ? 'accent-foreground' : action?.id === 'breathing' ? 'primary' : action?.id === 'posture' ? 'success' : 'warning'})`} />
                </div>
                <div className="w-6 h-6 bg-muted/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon name="ArrowRight" size={14} color="var(--color-muted-foreground)" />
                </div>
              </div>
              
              <h4 className="text-base font-semibold text-foreground mb-1">{action?.title}</h4>
              <p className="text-xs font-medium text-muted-foreground mb-2">{action?.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{action?.description}</p>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ color: `var(--color-${action?.id === 'stretch' ? 'accent' : action?.id === 'breathing' ? 'primary' : action?.id === 'posture' ? 'success' : 'warning'})` }} />
          </div>
        ))}
      </div>
      {/* Emergency Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h5 className="text-sm font-medium text-muted-foreground mb-4">Need Immediate Help?</h5>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => console.log('Starting stress relief')}
            className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/5"
            iconName="Heart"
            iconPosition="left"
          >
            Stress Relief
          </Button>
          <Button
            variant="outline"
            onClick={() => console.log('Starting anxiety help')}
            className="flex-1 border-warning/20 text-warning hover:bg-warning/5"
            iconName="Shield"
            iconPosition="left"
          >
            Anxiety Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;