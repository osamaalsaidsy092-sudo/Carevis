import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportGenerator = ({ onGenerateReport, isGenerating }) => {
  const [reportConfig, setReportConfig] = useState({
    dateRange: '30d',
    metrics: ['engagement', 'participation', 'wellness'],
    format: 'pdf',
    emailRecipients: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const metricOptions = [
    { id: 'engagement', label: 'Engagement Scores', description: 'Individual and team engagement metrics' },
    { id: 'participation', label: 'Participation Rates', description: 'Activity participation across departments' },
    { id: 'wellness', label: 'Wellness Trends', description: 'Overall wellness and health indicators' },
    { id: 'streaks', label: 'Streaks & Consistency', description: 'User consistency and habit formation' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { value: 'csv', label: 'CSV Data', icon: 'Database' }
  ];

  const handleMetricToggle = (metricId) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: prev?.metrics?.includes(metricId)
        ? prev?.metrics?.filter(m => m !== metricId)
        : [...prev?.metrics, metricId]
    }));
  };

  const handleGenerate = () => {
    if (reportConfig?.metrics?.length === 0) {
      alert('Please select at least one metric to include in the report.');
      return;
    }
    onGenerateReport?.(reportConfig);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-gentle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Generate Report</h3>
            <p className="text-sm text-muted-foreground">Create comprehensive wellness reports</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Date Range */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Time Period
          </label>
          <select
            value={reportConfig?.dateRange}
            onChange={(e) => setReportConfig(prev => ({ ...prev, dateRange: e?.target?.value }))}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {dateRangeOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Metrics Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Include Metrics
          </label>
          <div className="space-y-2">
            {metricOptions?.map(metric => (
              <label key={metric?.id} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reportConfig?.metrics?.includes(metric?.id)}
                  onChange={() => handleMetricToggle(metric?.id)}
                  className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{metric?.label}</p>
                  <p className="text-xs text-muted-foreground">{metric?.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Format Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            {formatOptions?.map(format => (
              <button
                key={format?.value}
                onClick={() => setReportConfig(prev => ({ ...prev, format: format?.value }))}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  reportConfig?.format === format?.value
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-foreground hover:bg-muted/20'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={format?.icon} size={16} />
                  <span className="text-sm font-medium">{format?.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showAdvanced ? 'ChevronDown' : 'ChevronRight'} size={16} />
            <span>Advanced Options</span>
          </button>
          
          {showAdvanced && (
            <div className="mt-3 p-4 bg-muted/20 rounded-xl">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email Recipients (optional)
              </label>
              <input
                type="email"
                placeholder="Enter email addresses separated by commas"
                value={reportConfig?.emailRecipients}
                onChange={(e) => setReportConfig(prev => ({ ...prev, emailRecipients: e?.target?.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Report will be automatically sent to these recipients
              </p>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || reportConfig?.metrics?.length === 0}
          className="w-full"
          iconName={isGenerating ? "Loader2" : "Download"}
          iconPosition="left"
        >
          {isGenerating ? 'Generating Report...' : 'Generate Report'}
        </Button>
      </div>
    </div>
  );
};

export default ReportGenerator;