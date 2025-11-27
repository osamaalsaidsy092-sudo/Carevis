import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TensionMonitor = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [tensionLevels, setTensionLevels] = useState({
    neck: 3,
    shoulders: 4,
    upperBack: 2,
    lowerBack: 3,
    hips: 1
  });

  const bodyAreas = [
    {
      id: 'neck',
      name: 'Neck',
      icon: 'User',
      position: { top: '15%', left: '50%' },
      description: 'Cervical spine and neck muscles'
    },
    {
      id: 'shoulders',
      name: 'Shoulders',
      icon: 'Minus',
      position: { top: '25%', left: '30%' },
      description: 'Shoulder blades and deltoids'
    },
    {
      id: 'upperBack',
      name: 'Upper Back',
      icon: 'Square',
      position: { top: '35%', left: '50%' },
      description: 'Thoracic spine and rhomboids'
    },
    {
      id: 'lowerBack',
      name: 'Lower Back',
      icon: 'Rectangle',
      position: { top: '55%', left: '50%' },
      description: 'Lumbar spine and erector spinae'
    },
    {
      id: 'hips',
      name: 'Hips',
      icon: 'Circle',
      position: { top: '70%', left: '50%' },
      description: 'Hip flexors and glutes'
    }
  ];

  const getTensionColor = (level) => {
    switch (level) {
      case 0: return { bg: 'bg-muted', text: 'text-muted-foreground', label: 'No tension' };
      case 1: return { bg: 'bg-success/20', text: 'text-success', label: 'Minimal' };
      case 2: return { bg: 'bg-primary/20', text: 'text-primary', label: 'Light' };
      case 3: return { bg: 'bg-warning/20', text: 'text-warning', label: 'Moderate' };
      case 4: return { bg: 'bg-destructive/20', text: 'text-destructive', label: 'High' };
      case 5: return { bg: 'bg-destructive/40', text: 'text-destructive', label: 'Severe' };
      default: return { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Unknown' };
    }
  };

  const handleAreaClick = (areaId) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
  };

  const handleTensionChange = (areaId, newLevel) => {
    setTensionLevels(prev => ({
      ...prev,
      [areaId]: newLevel
    }));
  };

  const getRecommendedAction = (level) => {
    if (level >= 4) return { action: 'Immediate relief needed', icon: 'AlertTriangle', color: 'text-destructive' };
    if (level >= 3) return { action: 'Stretch recommended', icon: 'Zap', color: 'text-warning' };
    if (level >= 2) return { action: 'Light movement', icon: 'RotateCcw', color: 'text-primary' };
    if (level >= 1) return { action: 'Maintain awareness', icon: 'Eye', color: 'text-success' };
    return { action: 'Feeling good', icon: 'Check', color: 'text-success' };
  };

  const averageTension = Object.values(tensionLevels)?.reduce((sum, level) => sum + level, 0) / Object.values(tensionLevels)?.length;
  const highTensionAreas = Object.entries(tensionLevels)?.filter(([_, level]) => level >= 3);

  return (
    <div className="bg-card rounded-3xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Tension Monitor</h3>
          <p className="text-sm text-muted-foreground">Track your body's tension levels</p>
        </div>
        <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
          <Icon name="Activity" size={20} color="var(--color-warning)" />
        </div>
      </div>
      {/* Overall Status */}
      <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Tension</span>
          <span className={`text-sm font-medium ${getTensionColor(Math.round(averageTension))?.text}`}>
            {getTensionColor(Math.round(averageTension))?.label}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              averageTension <= 1 ? 'bg-success' :
              averageTension <= 2 ? 'bg-primary' :
              averageTension <= 3 ? 'bg-warning' : 'bg-destructive'
            }`}
            style={{ width: `${(averageTension / 5) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {highTensionAreas?.length > 0 
            ? `${highTensionAreas?.length} area${highTensionAreas?.length > 1 ? 's' : ''} need attention`
            : 'All areas feeling good'
          }
        </p>
      </div>
      {/* Body Map */}
      <div className="relative bg-gradient-to-b from-muted/20 to-muted/10 rounded-2xl p-6 mb-6 min-h-[200px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-32">
            {/* Simple body outline */}
            <div className="absolute inset-0 border-2 border-muted rounded-full opacity-20" />
            
            {/* Body areas */}
            {bodyAreas?.map((area) => {
              const tension = tensionLevels?.[area?.id];
              const colorData = getTensionColor(tension);
              const isSelected = selectedArea === area?.id;
              
              return (
                <div
                  key={area?.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                    isSelected ? 'scale-125 z-10' : 'hover:scale-110'
                  }`}
                  style={{ top: area?.position?.top, left: area?.position?.left }}
                  onClick={() => handleAreaClick(area?.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorData?.bg} ${colorData?.text} border-2 ${
                    isSelected ? 'border-current' : 'border-transparent'
                  }`}>
                    <Icon name={area?.icon} size={14} />
                  </div>
                  {isSelected && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg px-3 py-2 shadow-gentle-lg z-20 whitespace-nowrap">
                      <p className="text-sm font-medium text-popover-foreground">{area?.name}</p>
                      <p className="text-xs text-muted-foreground">{area?.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Area Details */}
      {selectedArea && (
        <div className="bg-muted/30 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-medium text-foreground">
              {bodyAreas?.find(a => a?.id === selectedArea)?.name} Tension Level
            </h5>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedArea(null)}
              className="w-6 h-6"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Level:</span>
              <span className={`text-sm font-medium ${getTensionColor(tensionLevels?.[selectedArea])?.text}`}>
                {getTensionColor(tensionLevels?.[selectedArea])?.label} ({tensionLevels?.[selectedArea]}/5)
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="5"
              value={tensionLevels?.[selectedArea]}
              onChange={(e) => handleTensionChange(selectedArea, parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>None</span>
              <span>Severe</span>
            </div>

            {/* Recommended Action */}
            {tensionLevels?.[selectedArea] > 0 && (
              <div className="flex items-center space-x-2 pt-2 border-t border-border">
                <Icon 
                  name={getRecommendedAction(tensionLevels?.[selectedArea])?.icon} 
                  size={16} 
                  className={getRecommendedAction(tensionLevels?.[selectedArea])?.color}
                />
                <span className={`text-sm ${getRecommendedAction(tensionLevels?.[selectedArea])?.color}`}>
                  {getRecommendedAction(tensionLevels?.[selectedArea])?.action}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={() => console.log('Starting targeted relief')}
          className="flex-1"
          iconName="Target"
          iconPosition="left"
        >
          Targeted Relief
        </Button>
        <Button
          variant="ghost"
          onClick={() => console.log('Logging tension')}
          className="flex-1"
          iconName="Save"
          iconPosition="left"
        >
          Save Reading
        </Button>
      </div>
    </div>
  );
};

export default TensionMonitor;