import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Clock, Users, Star } from 'lucide-react';

const Courses = () => {
  const courses = [
    { id: '1', title: 'Introduction to Calculus', instructor: 'Dr. Smith', duration: '8 weeks', students: 1250, rating: 4.8, level: 'Beginner' },
    { id: '2', title: 'Advanced Physics', instructor: 'Prof. Johnson', duration: '12 weeks', students: 890, rating: 4.6, level: 'Advanced' },
    { id: '3', title: 'Data Structures & Algorithms', instructor: 'Dr. Chen', duration: '10 weeks', students: 2100, rating: 4.9, level: 'Intermediate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient flex items-center gap-3">
            <GraduationCap className="w-8 h-8" />
            Course Catalog
          </h1>
          <p className="text-muted-foreground mt-1">Explore our comprehensive course offerings</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="card-feature">
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">{course.level}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.students} students</span>
                  </div>
                </div>
                <Button className="w-full btn-hero">Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;