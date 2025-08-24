import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  Edit,
  Camera,
  Trophy,
  Target,
  BookOpen,
  Brain,
  Users,
  Clock,
  Star,
  Award,
  TrendingUp,
  Save,
  Settings,
  Shield,
  Bell
} from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    university: '',
    major: '',
    year: ''
  });
  const { toast } = useToast();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const achievements = [
    {
      title: '7-Day Study Streak',
      description: 'Maintained consistent daily study sessions',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      earned: true,
      date: '2024-03-15'
    },
    {
      title: 'AI Tutor Expert',
      description: 'Completed 50+ AI tutoring sessions',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      earned: true,
      date: '2024-03-10'
    },
    {
      title: 'Community Helper',
      description: 'Helped 25+ fellow students',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      earned: true,
      date: '2024-03-05'
    },
    {
      title: 'Knowledge Seeker',
      description: 'Accessed 100+ library resources',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      earned: false,
      progress: 75
    },
    {
      title: 'Time Master',
      description: 'Used study planner for 30 days',
      icon: Clock,
      color: 'from-indigo-500 to-purple-500',
      earned: false,
      progress: 60
    },
    {
      title: 'Analytics Pro',
      description: 'Tracked progress for 60 days',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-500',
      earned: false,
      progress: 30
    }
  ];

  const stats = [
    {
      label: 'Total Study Hours',
      value: '127.5',
      unit: 'hours',
      icon: Clock,
      change: '+15.2 this week'
    },
    {
      label: 'Courses Completed',
      value: '8',
      unit: 'courses',
      icon: BookOpen,
      change: '+2 this month'
    },
    {
      label: 'AI Sessions',
      value: '156',
      unit: 'sessions',
      icon: Brain,
      change: '+23 this week'
    },
    {
      label: 'Community Points',
      value: '2,340',
      unit: 'points',
      icon: Star,
      change: '+180 this week'
    }
  ];

  const studyGoals = [
    {
      title: 'Complete Data Structures Course',
      progress: 75,
      target: 'End of March',
      category: 'Computer Science'
    },
    {
      title: 'Improve Calculus Grade',
      progress: 60,
      target: 'Final Exam',
      category: 'Mathematics'
    },
    {
      title: 'Read 5 Research Papers',
      progress: 40,
      target: 'This Semester',
      category: 'Research'
    }
  ];

  const recentActivity = [
    {
      action: 'Completed Chapter 5: Advanced Algorithms',
      time: '2 hours ago',
      type: 'completion'
    },
    {
      action: 'Joined Machine Learning Study Group',
      time: '1 day ago',
      type: 'social'
    },
    {
      action: 'AI Tutor session: Calculus Integration',
      time: '2 days ago',
      type: 'learning'
    },
    {
      action: 'Earned "Week Streak" achievement',
      time: '3 days ago',
      type: 'achievement'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      email: formData.email
    });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      bio: '',
      university: '',
      major: '',
      year: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="card-premium mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="gradient-primary text-white text-2xl">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full gradient-primary"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{user?.name}</h1>
                  <Badge className="gradient-secondary text-white border-0">
                    {user?.role === 'student' ? 'Student' : 'Teacher'}
                  </Badge>
                  {user?.isVerified && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(user?.joinDate || '').toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Manage your account details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="university">University</Label>
                          <Input
                            id="university"
                            value={formData.university}
                            onChange={(e) => handleInputChange('university', e.target.value)}
                            placeholder="Your university"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="major">Major</Label>
                          <Input
                            id="major"
                            value={formData.major}
                            onChange={(e) => handleInputChange('major', e.target.value)}
                            placeholder="Your major"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            placeholder="Tell us about yourself"
                          />
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                          <Button onClick={handleSave} className="btn-hero">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Full Name</Label>
                            <p className="font-medium">{user?.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Email</Label>
                            <p className="font-medium">{user?.email}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">University</Label>
                            <p className="font-medium text-muted-foreground">Not specified</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Major</Label>
                            <p className="font-medium text-muted-foreground">Not specified</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Study Goals */}
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Current Study Goals</CardTitle>
                    <CardDescription>
                      Track your academic objectives and progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studyGoals.map((goal, index) => (
                      <div key={index} className="space-y-2 p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{goal.title}</h4>
                          <Badge variant="outline">{goal.category}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{goal.progress}% • Target: {goal.target}</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-6">
                {/* Study Statistics */}
                <Card className="card-glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Study Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <stat.icon className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold">
                            {stat.value}
                            <span className="text-sm font-normal text-muted-foreground ml-1">
                              {stat.unit}
                            </span>
                          </div>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <div className="space-y-1">
                          <p className="leading-relaxed">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
                <CardDescription>
                  Celebrate your learning milestones and accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className={`card-glass ${achievement.earned ? 'ring-2 ring-primary/20' : 'opacity-75'}`}>
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center shadow-lg ${achievement.earned ? 'animate-glow' : ''}`}>
                          <achievement.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <Badge className="gradient-primary text-white border-0">
                            <Award className="w-3 h-3 mr-1" />
                            Earned {achievement.date}
                          </Badge>
                        ) : (
                          <div className="space-y-2">
                            <Progress value={achievement.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              {achievement.progress}% complete
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  Your complete learning journey and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-4 pb-6 border-b border-border/50 last:border-0">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Privacy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Profile Visibility</p>
                          <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;