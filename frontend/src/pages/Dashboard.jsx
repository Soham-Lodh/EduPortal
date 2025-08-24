import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Calendar,
  MessageSquare,
  BarChart3,
  Users,
  StickyNote,
  Brain,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Bell,
  Plus,
  ArrowRight,
  Star,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const quickActions = [
    {
      title: 'AI Tutor Chat',
      description: 'Get instant help with any subject',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      href: '/chat',
      badge: 'Popular'
    },
    {
      title: 'Study Planner',
      description: 'Organize your study schedule',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      href: '/planner',
      badge: null
    },
    {
      title: 'Resource Library',
      description: 'Access study materials',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      href: '/library',
      badge: 'Updated'
    },
    {
      title: 'Analytics',
      description: 'Track your progress',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      href: '/analytics',
      badge: null
    }
  ];

  const recentActivity = [
    {
      action: 'Completed Chapter 5: Data Structures',
      subject: 'Computer Science',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-green-500'
    },
    {
      action: 'Joined Study Group: Calculus II',
      subject: 'Mathematics',
      time: '5 hours ago',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      action: 'AI Tutor Session: Physics Problems',
      subject: 'Physics',
      time: '1 day ago',
      icon: Brain,
      color: 'text-purple-500'
    },
    {
      action: 'Submitted Assignment: Research Paper',
      subject: 'English Literature',
      time: '2 days ago',
      icon: StickyNote,
      color: 'text-orange-500'
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: 'Tomorrow',
      priority: 'high',
      completed: false
    },
    {
      title: 'Math Quiz Chapter 8',
      subject: 'Calculus II',
      dueDate: 'Mar 25',
      priority: 'medium',
      completed: false
    },
    {
      title: 'Essay Draft',
      subject: 'English Literature',
      dueDate: 'Mar 28',
      priority: 'low',
      completed: true
    }
  ];

  const studyStats = [
    {
      label: 'Study Streak',
      value: '7 days',
      change: '+2 from last week',
      icon: Trophy,
      trend: 'up'
    },
    {
      label: 'Total Study Time',
      value: '24.5 hrs',
      change: '+5.2 hrs this week',
      icon: Clock,
      trend: 'up'
    },
    {
      label: 'Subjects Studied',
      value: '6',
      change: 'Same as last week',
      icon: BookOpen,
      trend: 'stable'
    },
    {
      label: 'AI Sessions',
      value: '12',
      change: '+4 this week',
      icon: Brain,
      trend: 'up'
    }
  ];

  const currentGoals = [
    {
      title: 'Complete Data Structures Course',
      progress: 75,
      target: '100%',
      deadline: 'End of month'
    },
    {
      title: 'Improve Math Grade to A',
      progress: 60,
      target: 'A Grade',
      deadline: 'Final Exam'
    },
    {
      title: 'Join 3 Study Groups',
      progress: 33,
      target: '3 Groups',
      deadline: 'This semester'
    }
  ];

  const notifications = [
    {
      title: 'New Assignment Posted',
      message: 'Physics Lab Report is now available',
      time: '1 hour ago',
      type: 'assignment'
    },
    {
      title: 'Study Group Invitation',
      message: 'You\'ve been invited to Calculus Study Group',
      time: '3 hours ago',
      type: 'invitation'
    },
    {
      title: 'Achievement Unlocked!',
      message: 'You\'ve maintained a 7-day study streak',
      time: '1 day ago',
      type: 'achievement'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-orange-500 bg-orange-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button className="btn-hero">
                <Plus className="w-4 h-4 mr-2" />
                New Study Session
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href} className="group">
                <Card className="card-feature h-full hover:shadow-premium transition-all duration-300 group-hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      {action.badge && (
                        <Badge className="gradient-primary text-white border-0">{action.badge}</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Study Stats */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Your Progress</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {studyStats.map((stat, index) => (
                  <Card key={index} className="card-glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="w-5 h-5 text-primary" />
                        {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-xs text-green-600">{stat.change}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Current Goals */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Current Goals</h2>
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Set New Goal
                </Button>
              </div>
              <div className="space-y-4">
                {currentGoals.map((goal, index) => (
                  <Card key={index} className="card-premium">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{goal.title}</h3>
                          <Badge variant="outline">{goal.deadline}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{goal.progress}% of {goal.target}</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className={`p-2 rounded-lg ${activity.color} bg-muted/20`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.subject}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
              <Card className="card-premium">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                        <div className={`p-1 rounded-full ${getPriorityColor(deadline.priority)}`}>
                          {deadline.completed ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${deadline.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {deadline.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{deadline.subject}</p>
                          <p className="text-xs text-muted-foreground">Due: {deadline.dueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/planner">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View All Assignments
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>

            {/* Notifications */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <Card className="card-premium">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notification, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-primary mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All Notifications
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Study Streak */}
            <section>
              <Card className="card-glass gradient-primary text-white">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">7-Day Streak! 🔥</h3>
                  <p className="text-sm opacity-90 mb-4">
                    You're on a roll! Keep studying to maintain your streak.
                  </p>
                  <Link to="/analytics">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      View Progress
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
