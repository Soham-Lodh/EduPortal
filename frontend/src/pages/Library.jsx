import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Filter, Download, Star, Eye, Upload, FileText, Video, Headphones } from 'lucide-react';

const Library = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const resources = [
    { id: '1', title: 'Introduction to Calculus', type: 'PDF', category: 'Mathematics', rating: 4.8, downloads: 1250 },
    { id: '2', title: 'Physics Lab Manual', type: 'PDF', category: 'Physics', rating: 4.6, downloads: 890 },
    { id: '3', title: 'Data Structures Video Course', type: 'Video', category: 'Computer Science', rating: 4.9, downloads: 2100 },
    { id: '4', title: 'Chemistry Formulas Guide', type: 'PDF', category: 'Chemistry', rating: 4.7, downloads: 680 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              Resource Library
            </h1>
            <p className="text-muted-foreground mt-1">Access thousands of study materials and resources</p>
          </div>
          <Button className="btn-hero">
            <Upload className="w-4 h-4 mr-2" />
            Upload Resource
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-6 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="card-feature">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {resource.type === 'Video' ? <Video className="w-6 h-6 text-primary" /> : <FileText className="w-6 h-6 text-primary" />}
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <Badge variant="outline">{resource.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{resource.rating}</span>
                        <span className="text-sm text-muted-foreground">({resource.downloads} downloads)</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="btn-hero">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Recent Downloads
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Bookmarks
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;