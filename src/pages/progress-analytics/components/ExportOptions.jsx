import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportOptions = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedDateRange, setSelectedDateRange] = useState('month');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeAchievements, setIncludeAchievements] = useState(true);
  const [includeDetailedStats, setIncludeDetailedStats] = useState(true);

  const exportFormats = [
    {
      key: 'pdf',
      label: 'PDF Report',
      description: 'Comprehensive report with charts and analytics',
      icon: 'FileText',
      color: 'text-destructive'
    },
    {
      key: 'csv',
      label: 'CSV Data',
      description: 'Raw data for spreadsheet analysis',
      icon: 'Table',
      color: 'text-success'
    },
    {
      key: 'json',
      label: 'JSON Export',
      description: 'Structured data for developers',
      icon: 'Code',
      color: 'text-primary'
    }
  ];

  const dateRanges = [
    { key: 'week', label: 'Last 7 Days' },
    { key: 'month', label: 'Last 30 Days' },
    { key: 'quarter', label: 'Last 3 Months' },
    { key: 'year', label: 'Last 12 Months' },
    { key: 'custom', label: 'Custom Range' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock download trigger
    const filename = `carevis-progress-report-${new Date()?.toISOString()?.split('T')?.[0]}.${selectedFormat}`;
    console.log(`Exporting ${filename} with format: ${selectedFormat}`);
    
    setIsExporting(false);
    
    // Show success message (in a real app, this would trigger an actual download)
    alert(`Export completed! File: ${filename}`);
  };

  const getExportSize = () => {
    const baseSize = selectedFormat === 'pdf' ? 2.5 : selectedFormat === 'csv' ? 0.3 : 0.8;
    const multiplier = selectedDateRange === 'year' ? 4 : selectedDateRange === 'quarter' ? 2 : 1;
    return (baseSize * multiplier)?.toFixed(1);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Export Progress Data</h3>
          <p className="text-sm text-muted-foreground">Download your wellness analytics and reports</p>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon name="Download" size={20} className="text-primary" />
        </div>
      </div>
      <div className="space-y-6">
        {/* Export Format Selection */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Export Format</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {exportFormats?.map((format) => (
              <div
                key={format?.key}
                onClick={() => setSelectedFormat(format?.key)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedFormat === format?.key
                    ? 'border-primary bg-primary/5' :'border-border bg-muted/50 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name={format?.icon} size={20} className={format?.color} />
                  <span className="font-medium text-foreground">{format?.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{format?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Date Range</h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
            {dateRanges?.map((range) => (
              <Button
                key={range?.key}
                variant={selectedDateRange === range?.key ? "default" : "ghost"}
                onClick={() => setSelectedDateRange(range?.key)}
                className="text-sm"
              >
                {range?.label}
              </Button>
            ))}
          </div>

          {/* Custom Date Range Inputs */}
          {selectedDateRange === 'custom' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl">
              <Input
                type="date"
                label="Start Date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e?.target?.value)}
              />
              <Input
                type="date"
                label="End Date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e?.target?.value)}
              />
            </div>
          )}
        </div>

        {/* Content Options */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Include in Export</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e?.target?.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Progress Charts & Analytics</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAchievements}
                onChange={(e) => setIncludeAchievements(e?.target?.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-warning" />
                <span className="text-sm text-foreground">Achievement Badges</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDetailedStats}
                onChange={(e) => setIncludeDetailedStats(e?.target?.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm text-foreground">Detailed Statistics</span>
              </div>
            </label>
          </div>
        </div>

        {/* Export Preview */}
        <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-medium text-foreground">Export Preview</h5>
            <span className="text-xs text-muted-foreground">Estimated size: {getExportSize()} MB</span>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={12} />
              <span>
                {selectedDateRange === 'custom' && customStartDate && customEndDate
                  ? `${customStartDate} to ${customEndDate}`
                  : dateRanges?.find(r => r?.key === selectedDateRange)?.label
                }
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="FileType" size={12} />
              <span>{exportFormats?.find(f => f?.key === selectedFormat)?.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Package" size={12} />
              <span>
                {[
                  includeCharts && 'Charts',
                  includeAchievements && 'Badges',
                  includeDetailedStats && 'Statistics'
                ]?.filter(Boolean)?.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          disabled={isExporting || (selectedDateRange === 'custom' && (!customStartDate || !customEndDate))}
          loading={isExporting}
          className="w-full"
          iconName="Download"
          iconPosition="left"
        >
          {isExporting ? 'Generating Export...' : 'Export Progress Data'}
        </Button>

        {/* Quick Share Options */}
        <div className="pt-4 border-t border-border">
          <h5 className="text-sm font-medium text-foreground mb-3">Quick Share</h5>
          <div className="flex space-x-2">
            <Button variant="ghost" className="flex-1">
              <Icon name="Mail" size={16} className="mr-2" />
              Email
            </Button>
            <Button variant="ghost" className="flex-1">
              <Icon name="Link" size={16} className="mr-2" />
              Copy Link
            </Button>
            <Button variant="ghost" className="flex-1">
              <Icon name="Share" size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;