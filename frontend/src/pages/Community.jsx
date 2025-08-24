import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, Plus, Calendar, Trophy } from 'lucide-react';

const Community = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const studyGroups = [
    { id: '1', name: 'Calculus Study Group', members: 12, category: 'Mathematics', active: true },
    { id: '2', name: 'Physics Lab Partners', members: 8, category: 'Physics', active: true },
    { id: '3', name: 'CS Project Team', members: 6, category: 'Computer Science', active: false }
  ];

  const discussions = [
    { id: '1', title: 'Help with derivatives?', author: 'Sarah Chen', replies: 5, time: '2h ago' },
    { id: '2', title: 'Study group for finals', author: 'Mike Johnson', replies: 12, time: '4h ago' },
    { id: '3', title: 'Best resources for physics', author: 'Emma Davis', replies: 8, time: '1d ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient flex items-center gap-3">
              <Users className="w-8 h-8" />
              Community Hub
            </h1>
            <p className="text-muted-foreground mt-1">Connect with fellow students and study together</p>
          </div>
          <Button className="btn-hero">
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Recent Discussions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{discussion.title}</h3>
                      <p className="text-sm text-muted-foreground">by {discussion.author}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Study Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studyGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.members} members • {group.category}</p>
                      </div>
                    </div>
                    <Button variant="outline">Join</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="card-glass gradient-primary text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">Community Leader</h3>
                <p className="text-sm opacity-90 mb-4">You've helped 15 students this month!</p>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Study Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;