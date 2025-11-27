import React from 'react';
import Icon from '../../../components/AppIcon';


const DepartmentComparison = ({ departmentData, onDrillDown }) => {
  const getPerformanceColor = (rate) => {
    if (rate >= 90) return 'text-success bg-success/10';
    if (rate >= 70) return 'text-primary bg-primary/10';
    if (rate >= 50) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };

  const getPerformanceIcon = (rate) => {
    if (rate >= 90) return 'TrendingUp';
    if (rate >= 70) return 'ArrowUp';
    if (rate >= 50) return 'Minus';
    return 'TrendingDown';
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-gentle">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Department Performance
        </h3>
        <p className="text-sm text-muted-foreground">
          Wellness engagement across different departments
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {departmentData?.map((dept) => (
          <div 
            key={dept?.name}
            className="bg-muted/20 rounded-xl p-4 hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={() => onDrillDown?.(dept)}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">{dept?.name}</h4>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPerformanceColor(dept?.participationRate)}`}>
                <Icon name={getPerformanceIcon(dept?.participationRate)} size={16} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Members</span>
                <span className="font-medium text-foreground">{dept?.memberCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Participation</span>
                <span className="font-medium text-foreground">{dept?.participationRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Engagement</span>
                <span className="font-medium text-foreground">{dept?.avgEngagement}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Top Category</span>
                <span className="text-xs font-medium text-accent bg-accent/20 px-2 py-1 rounded-full">
                  {dept?.topCategory}
                </span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Active Sessions</span>
                <span className="text-sm font-medium text-foreground">{dept?.activeSessions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentComparison;