import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StickyNote, Plus, Search, Share2, Edit } from 'lucide-react';

const Notes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const notes = [
    { id: '1', title: 'Calculus Notes - Chapter 5', content: 'Derivatives and their applications...', lastEdited: '2h ago', shared: false },
    { id: '2', title: 'Physics Lab Report', content: 'Experiment on momentum conservation...', lastEdited: '1d ago', shared: true },
    { id: '3', title: 'Computer Science Project Ideas', content: 'Web application concepts...', lastEdited: '3d ago', shared: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient flex items-center gap-3">
              <StickyNote className="w-8 h-8" />
              Smart Notes
            </h1>
            <p className="text-muted-foreground mt-1">Create, organize, and share your study notes</p>
          </div>
          <Button className="btn-hero">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>My Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{note.title}</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
                    <p className="text-xs text-muted-foreground">Last edited {note.lastEdited}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Search Notes
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Shared with Me
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;