import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('discussions');

  // Mock community data
  const discussions = [
    {
      id: 1,
      title: "Tips for maintaining good posture while working",
      author: "Sarah M.",
      replies: 12,
      likes: 23,
      category: "Ergonomics",
      timeAgo: "2 hours ago",
      excerpt: "I\'ve been struggling with back pain lately and found some great techniques..."
    },
    {
      id: 2,
      title: "Mindfulness exercises for stressful days",
      author: "Mike R.",
      replies: 8,
      likes: 15,
      category: "Wellness",
      timeAgo: "4 hours ago",
      excerpt: "Sharing my daily mindfulness routine that helps me stay calm during busy periods..."
    },
    {
      id: 3,
      title: "Team challenges and motivation",
      author: "Alex T.",
      replies: 20,
      likes: 45,
      category: "Team Building",
      timeAgo: "1 day ago",
      excerpt: "How we increased our team\'s wellness participation by 300%..."
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Emily Chen", points: 1250, streak: 21, badge: "Wellness Champion" },
    { rank: 2, name: "David Wilson", points: 1180, streak: 18, badge: "Consistency King" },
    { rank: 3, name: "Lisa Park", points: 1050, streak: 15, badge: "Team Player" },
    { rank: 4, name: "James Lee", points: 980, streak: 12, badge: "Rising Star" },
    { rank: 5, name: "Anna Kim", points: 920, streak: 10, badge: "Dedicated" }
  ];

  const challenges = [
    {
      id: 1,
      title: "30-Day Posture Challenge",
      description: "Improve your posture with daily exercises and reminders",
      participants: 156,
      daysLeft: 12,
      difficulty: "Beginner",
      reward: "Posture Master Badge"
    },
    {
      id: 2,
      title: "Mindful Mondays",
      description: "Start each week with 10 minutes of mindfulness",
      participants: 89,
      daysLeft: 3,
      difficulty: "Easy",
      reward: "Zen Badge"
    },
    {
      id: 3,
      title: "Team Step Challenge",
      description: "Collaborate with your team to reach 1 million steps",
      participants: 234,
      daysLeft: 20,
      difficulty: "Intermediate",
      reward: "Team Spirit Badge"
    }
  ];

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: 'MessageCircle' },
    { id: 'challenges', label: 'Challenges', icon: 'Trophy' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'Award' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/10 text-success';
      case 'Beginner': return 'bg-primary/10 text-primary';
      case 'Intermediate': return 'bg-warning/10 text-warning';
      case 'Advanced': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { icon: 'Crown', color: 'text-yellow-500' };
      case 2: return { icon: 'Medal', color: 'text-gray-400' };
      case 3: return { icon: 'Award', color: 'text-orange-500' };
      default: return { icon: 'User', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} pb-20 lg:pb-8`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Community Hub
            </h1>
            <p className="text-muted-foreground">
              Connect, share, and grow together with your wellness community
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-muted/20 rounded-2xl p-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-background shadow-gentle text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              {/* Create Post Button */}
              <div className="flex justify-end">
                <Button iconName="Plus" iconPosition="left">
                  Start Discussion
                </Button>
              </div>

              {/* Discussions List */}
              <div className="space-y-4">
                {discussions?.map((discussion) => (
                  <div key={discussion?.id} className="bg-card rounded-2xl p-6 border border-border hover:shadow-gentle transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {discussion?.author?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{discussion?.author}</p>
                          <p className="text-sm text-muted-foreground">{discussion?.timeAgo}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {discussion?.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {discussion?.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {discussion?.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{discussion?.replies}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{discussion?.likes}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Join Discussion
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges?.map((challenge) => (
                  <div key={challenge?.id} className="bg-card rounded-2xl p-6 border border-border hover:shadow-gentle transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {challenge?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {challenge?.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(challenge?.difficulty)}`}>
                        {challenge?.difficulty}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Participants</span>
                        <span className="font-medium text-foreground">{challenge?.participants}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Days Left</span>
                        <span className="font-medium text-foreground">{challenge?.daysLeft}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Reward</span>
                        <span className="font-medium text-foreground">{challenge?.reward}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      Join Challenge
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Top Wellness Champions
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Leading members in our wellness community
                </p>
              </div>
              
              <div className="divide-y divide-border">
                {leaderboard?.map((member) => {
                  const rankIcon = getRankIcon(member?.rank);
                  return (
                    <div key={member?.rank} className="p-6 hover:bg-muted/10 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8">
                            <Icon name={rankIcon?.icon} size={20} className={rankIcon?.color} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{member?.name}</h4>
                            <p className="text-sm text-muted-foreground">{member?.badge}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{member?.points} pts</p>
                          <p className="text-sm text-muted-foreground">{member?.streak} day streak</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default CommunityPage;