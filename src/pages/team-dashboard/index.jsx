import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionButton from '../../components/ui/QuickActionButton';
import TeamMetricsCard from './components/TeamMetricsCard';
import ParticipationChart from './components/ParticipationChart';
import AnonymizedMemberTable from './components/AnonymizedMemberTable';
import ReportGenerator from './components/ReportGenerator';
import TeamMessaging from './components/TeamMessaging';
import DepartmentComparison from './components/DepartmentComparison';

import Button from '../../components/ui/Button';

const TeamDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [recentMessages, setRecentMessages] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Check user role - redirect if not authorized
  useEffect(() => {
    const userRole = localStorage.getItem('carevis-user-role') || 'user';
    if (userRole !== 'leader' && userRole !== 'admin') {
      navigate('/home-dashboard');
    }
  }, [navigate]);

  // Mock team metrics data
  const teamMetrics = [
    {
      title: "Active Team Members",
      value: "47",
      change: "+3",
      changeType: "increase",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Weekly Participation",
      value: "78%",
      change: "+12%",
      changeType: "increase",
      icon: "TrendingUp",
      color: "success"
    },
    {
      title: "Average Engagement",
      value: "85%",
      change: "+5%",
      changeType: "increase",
      icon: "Heart",
      color: "accent"
    },
    {
      title: "Team Wellness Score",
      value: "4.2",
      change: "+0.3",
      changeType: "increase",
      icon: "Star",
      color: "warning"
    }
  ];

  // Mock participation trend data
  const participationData = [
    { name: 'Mon', value: 72 },
    { name: 'Tue', value: 78 },
    { name: 'Wed', value: 85 },
    { name: 'Thu', value: 82 },
    { name: 'Fri', value: 88 },
    { name: 'Sat', value: 65 },
    { name: 'Sun', value: 58 }
  ];

  const engagementTrendData = [
    { name: 'Week 1', value: 75 },
    { name: 'Week 2', value: 78 },
    { name: 'Week 3', value: 82 },
    { name: 'Week 4', value: 85 }
  ];

  // Mock anonymized member data
  const anonymizedMembers = [
    {
      memberId: "TM-001",
      department: "Engineering",
      engagementScore: 92,
      streakDays: 15,
      completedSessions: 28,
      favoriteCategory: "Posture",
      lastActive: "2 hours ago"
    },
    {
      memberId: "TM-002",
      department: "Marketing",
      engagementScore: 87,
      streakDays: 12,
      completedSessions: 24,
      favoriteCategory: "Breathing",
      lastActive: "1 day ago"
    },
    {
      memberId: "TM-003",
      department: "Sales",
      engagementScore: 78,
      streakDays: 8,
      completedSessions: 19,
      favoriteCategory: "Stress Relief",
      lastActive: "3 hours ago"
    },
    {
      memberId: "TM-004",
      department: "HR",
      engagementScore: 95,
      streakDays: 22,
      completedSessions: 35,
      favoriteCategory: "Mindfulness",
      lastActive: "30 minutes ago"
    },
    {
      memberId: "TM-005",
      department: "Engineering",
      engagementScore: 83,
      streakDays: 10,
      completedSessions: 21,
      favoriteCategory: "Posture",
      lastActive: "5 hours ago"
    },
    {
      memberId: "TM-006",
      department: "Design",
      engagementScore: 89,
      streakDays: 18,
      completedSessions: 31,
      favoriteCategory: "Eye Care",
      lastActive: "1 hour ago"
    },
    {
      memberId: "TM-007",
      department: "Finance",
      engagementScore: 76,
      streakDays: 6,
      completedSessions: 16,
      favoriteCategory: "Breathing",
      lastActive: "2 days ago"
    },
    {
      memberId: "TM-008",
      department: "Operations",
      engagementScore: 91,
      streakDays: 14,
      completedSessions: 27,
      favoriteCategory: "Stress Relief",
      lastActive: "4 hours ago"
    }
  ];

  // Mock department comparison data
  const departmentData = [
    {
      name: "Engineering",
      memberCount: 15,
      avgEngagement: 88,
      participationRate: 92,
      activeSessions: 156,
      topCategory: "Posture"
    },
    {
      name: "Marketing",
      memberCount: 8,
      avgEngagement: 85,
      participationRate: 87,
      activeSessions: 98,
      topCategory: "Breathing"
    },
    {
      name: "Sales",
      memberCount: 12,
      avgEngagement: 82,
      participationRate: 78,
      activeSessions: 124,
      topCategory: "Stress Relief"
    },
    {
      name: "Design",
      memberCount: 6,
      avgEngagement: 90,
      participationRate: 95,
      activeSessions: 87,
      topCategory: "Eye Care"
    },
    {
      name: "HR",
      memberCount: 4,
      avgEngagement: 93,
      participationRate: 100,
      activeSessions: 68,
      topCategory: "Mindfulness"
    }
  ];

  const handleGenerateReport = async (reportConfig) => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      console.log('Generating report with config:', reportConfig);
      setIsGeneratingReport(false);
      
      // Simulate download
      const reportData = {
        dateRange: reportConfig?.dateRange,
        metrics: reportConfig?.metrics,
        teamSize: anonymizedMembers?.length,
        avgEngagement: 85,
        participationRate: 78
      };
      
      if (reportConfig?.format === 'csv') {
        // Simulate CSV download
        console.log('CSV report generated:', reportData);
      } else {
        // Simulate PDF download
        console.log('PDF report generated:', reportData);
      }
      
      if (reportConfig?.emailRecipients) {
        console.log('Report emailed to:', reportConfig?.emailRecipients);
      }
    }, 2000);
  };

  const handleSendMessage = (message) => {
    setRecentMessages(prev => [message, ...prev]);
    console.log('Message sent to team:', message);
  };

  const handleExportMemberData = () => {
    console.log('Exporting anonymized member data...');
    // Simulate CSV export of member data
  };

  const handleDepartmentDrillDown = (department) => {
    console.log('Drilling down into department:', department?.name);
    // Could navigate to detailed department view or show modal
  };

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="leader" />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole="leader"
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} pb-20 lg:pb-8`}>
        <div className="p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Team Wellness Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor team wellness engagement and generate insights while respecting privacy
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e?.target?.value)}
                className="px-4 py-2 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {timeRangeOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="outline"
                onClick={() => window.location?.reload()}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {teamMetrics?.map((metric, index) => (
              <TeamMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ParticipationChart
              data={participationData}
              type="bar"
              title="Daily Participation Rates"
              height={300}
            />
            <ParticipationChart
              data={engagementTrendData}
              type="line"
              title="Weekly Engagement Trends"
              height={300}
            />
          </div>

          {/* Department Comparison */}
          <div className="mb-8">
            <DepartmentComparison
              departmentData={departmentData}
              onDrillDown={handleDepartmentDrillDown}
            />
          </div>

          {/* Member Analytics Table */}
          <div className="mb-8">
            <AnonymizedMemberTable
              members={anonymizedMembers}
              onExport={handleExportMemberData}
            />
          </div>

          {/* Tools Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportGenerator
              onGenerateReport={handleGenerateReport}
              isGenerating={isGeneratingReport}
            />
            <TeamMessaging
              onSendMessage={handleSendMessage}
              recentMessages={recentMessages}
            />
          </div>
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default TeamDashboard;