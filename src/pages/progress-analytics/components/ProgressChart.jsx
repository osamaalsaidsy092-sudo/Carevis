import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('completion');

  const weeklyData = [
    { day: "Mon", completion: 85, mood: 7.2, tension: 3.1, sessions: 3 },
    { day: "Tue", completion: 92, mood: 8.1, tension: 2.8, sessions: 4 },
    { day: "Wed", completion: 78, mood: 6.8, tension: 3.5, sessions: 2 },
    { day: "Thu", completion: 95, mood: 8.5, tension: 2.2, sessions: 5 },
    { day: "Fri", completion: 88, mood: 7.8, tension: 2.9, sessions: 3 },
    { day: "Sat", completion: 100, mood: 9.0, tension: 1.8, sessions: 4 },
    { day: "Sun", completion: 82, mood: 7.5, tension: 3.0, sessions: 3 }
  ];

  const monthlyData = [
    { week: "Week 1", completion: 78, mood: 7.1, tension: 3.2, sessions: 18 },
    { week: "Week 2", completion: 85, mood: 7.8, tension: 2.8, sessions: 22 },
    { week: "Week 3", completion: 92, mood: 8.2, tension: 2.4, sessions: 26 },
    { week: "Week 4", completion: 88, mood: 8.0, tension: 2.6, sessions: 24 }
  ];

  const routineDistribution = [
    { name: "Breathing", value: 35, color: "#3398DB" },
    { name: "Stretching", value: 28, color: "#7EC8E3" },
    { name: "Posture", value: 22, color: "#A3E4D7" },
    { name: "Stress Relief", value: 15, color: "#F6E7C1" }
  ];

  const currentData = selectedPeriod === 'week' ? weeklyData : monthlyData;
  const xAxisKey = selectedPeriod === 'week' ? 'day' : 'week';

  const periods = [
    { key: 'week', label: 'This Week', icon: 'Calendar' },
    { key: 'month', label: 'This Month', icon: 'CalendarDays' }
  ];

  const metrics = [
    { key: 'completion', label: 'Completion Rate', color: '#3398DB', unit: '%' },
    { key: 'mood', label: 'Mood Score', color: '#A3E4D7', unit: '/10' },
    { key: 'tension', label: 'Tension Level', color: '#7EC8E3', unit: '/10' },
    { key: 'sessions', label: 'Sessions', color: '#F6E7C1', unit: '' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      const metric = metrics?.find(m => m?.key === selectedMetric);
      
      return (
        <div className="bg-card border border-border rounded-xl p-3 shadow-gentle-lg">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium" style={{ color: metric?.color }}>
              {data?.value}{metric?.unit}
            </span> {metric?.label}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Progress Overview</h3>
          <p className="text-sm text-muted-foreground">Track your wellness journey over time</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Period Selection */}
          <div className="flex bg-muted rounded-xl p-1">
            {periods?.map((period) => (
              <Button
                key={period?.key}
                variant={selectedPeriod === period?.key ? "default" : "ghost"}
                onClick={() => setSelectedPeriod(period?.key)}
                className="px-3 py-2 text-sm rounded-lg"
              >
                <Icon name={period?.icon} size={16} className="mr-2" />
                {period?.label}
              </Button>
            ))}
          </div>
          
          {/* Metric Selection */}
          <div className="flex bg-muted rounded-xl p-1 overflow-x-auto">
            {metrics?.map((metric) => (
              <Button
                key={metric?.key}
                variant={selectedMetric === metric?.key ? "default" : "ghost"}
                onClick={() => setSelectedMetric(metric?.key)}
                className="px-3 py-2 text-sm rounded-lg whitespace-nowrap"
              >
                <div 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: metric?.color }}
                />
                {metric?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Chart */}
        <div className="lg:col-span-2">
          <div className="h-80" aria-label={`${metrics?.find(m => m?.key === selectedMetric)?.label} Chart`}>
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'completion' ? (
                <AreaChart data={currentData}>
                  <defs>
                    <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3398DB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3398DB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey={xAxisKey} 
                    stroke="#6B7280" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#6B7280" 
                    fontSize={12}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="#3398DB"
                    strokeWidth={3}
                    fill="url(#completionGradient)"
                  />
                </AreaChart>
              ) : (
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey={xAxisKey} 
                    stroke="#6B7280" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#6B7280" 
                    fontSize={12}
                    tickLine={false}
                    domain={selectedMetric === 'mood' || selectedMetric === 'tension' ? [0, 10] : ['dataMin', 'dataMax']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke={metrics?.find(m => m?.key === selectedMetric)?.color}
                    strokeWidth={3}
                    dot={{ fill: metrics?.find(m => m?.key === selectedMetric)?.color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: metrics?.find(m => m?.key === selectedMetric)?.color, strokeWidth: 2 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Routine Distribution */}
        <div className="bg-muted/50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-foreground mb-4">Routine Distribution</h4>
          <div className="h-48" aria-label="Routine Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={routineDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {routineDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  labelStyle={{ color: '#2F3E46' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="space-y-2 mt-4">
            {routineDistribution?.map((item) => (
              <div key={item?.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-muted-foreground">{item?.name}</span>
                </div>
                <span className="font-medium text-foreground">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-semibold text-primary mb-1">92%</div>
          <div className="text-xs text-muted-foreground">Avg Completion</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-accent mb-1">8.1</div>
          <div className="text-xs text-muted-foreground">Avg Mood</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-secondary mb-1">2.4</div>
          <div className="text-xs text-muted-foreground">Avg Tension</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-success mb-1">24</div>
          <div className="text-xs text-muted-foreground">Total Sessions</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;