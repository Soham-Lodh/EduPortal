import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Brain,
  Calendar,
  BookOpen,
  BarChart3,
  Users,
  MessageSquare,
  Star,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Trophy,
  Clock,
  Target
} from 'lucide-react';
import heroImage from '@/assets/hero-education.jpg';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Tutor',
      description: 'Get instant help with homework, explanations, and personalized learning paths.',
      color: 'from-purple-500 to-pink-500',
      link: '/chat'
    },
    {
      icon: Calendar,
      title: 'Smart Study Planner',
      description: 'Organize your schedule with intelligent deadline tracking and study reminders.',
      color: 'from-blue-500 to-cyan-500',
      link: '/planner'
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Access thousands of study materials, videos, and interactive content.',
      color: 'from-green-500 to-emerald-500',
      link: '/library'
    },
    {
      icon: BarChart3,
      title: 'Learning Analytics',
      description: 'Track your progress with detailed insights and performance metrics.',
      color: 'from-orange-500 to-red-500',
      link: '/analytics'
    },
    {
      icon: Users,
      title: 'Study Community',
      description: 'Connect with peers, join study groups, and collaborate on projects.',
      color: 'from-indigo-500 to-purple-500',
      link: '/community'
    },
    {
      icon: MessageSquare,
      title: 'Smart Notes',
      description: 'Take collaborative notes with AI-enhanced organization and sharing.',
      color: 'from-pink-500 to-rose-500',
      link: '/notes'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students', icon: Users },
    { number: '1000+', label: 'Courses Available', icon: BookOpen },
    { number: '95%', label: 'Success Rate', icon: Trophy },
    { number: '24/7', label: 'AI Support', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Emily Chen',
      role: 'Computer Science Student',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
      content: 'EduPortal transformed my study habits. The AI tutor helped me understand complex algorithms in minutes!',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Medical Student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      content: 'The study planner and analytics keep me on track. I\'ve improved my grades by 20% this semester.',
      rating: 5
    },
    {
      name: 'Sofia Rodriguez',
      role: 'Business Major',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      content: 'The community features are amazing. I found my perfect study group and we help each other succeed.',
      rating: 5
    }
  ];

  const benefits = [
    { text: 'Personalized learning paths', icon: Target },
    { text: '24/7 AI tutoring support', icon: Brain },
    { text: 'Real-time progress tracking', icon: BarChart3 },
    { text: 'Collaborative study tools', icon: Users },
    { text: 'Mobile-first design', icon: Globe },
    { text: 'Secure and private', icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="gradient-primary text-white border-0 px-4 py-2 text-sm font-medium">
                  🎓 Premium Learning Platform
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Transform Your
                  <span className="text-gradient block">
                    Learning Journey
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Unlock your potential with AI-powered tutoring, smart study planning, and collaborative learning tools designed for academic success.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button className="btn-hero text-lg px-8 py-4 h-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button className="btn-glass text-lg px-8 py-4 h-auto">
                    Try AI Tutor
                    <Brain className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 10k+ students</span>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <img
                src={heroImage}
                alt="Students learning with AI technology"
                className="rounded-3xl shadow-2xl w-full h-auto animate-glow"
              />
              <div className="absolute -top-4 -right-4 card-glass p-4 animate-pulse-slow">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gradient">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge className="gradient-secondary text-white border-0 px-4 py-2">
              ✨ Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything You Need to
              <span className="text-gradient block">Succeed in Your Studies</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with proven educational methods
              to help you achieve your academic goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="group">
                <Card className="card-feature h-full p-6 hover:shadow-premium group-hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="p-0 space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="gradient-primary text-white border-0 px-4 py-2">
                  🚀 Why Choose EduPortal
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Designed for
                  <span className="text-gradient block">Modern Students</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We understand the challenges of modern education. Our platform is built to adapt to your
                  learning style and help you achieve better results with less stress.
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-colors">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/features">
                <Button className="btn-secondary text-lg px-8 py-4 h-auto">
                  Explore All Features
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="card-glass p-8 space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-gradient">Premium Experience</h3>
                  <p className="text-muted-foreground">Join thousands of successful students</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                    <span className="font-medium">Study Time Saved</span>
                    <span className="text-2xl font-bold text-primary">40%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                    <span className="font-medium">Grade Improvement</span>
                    <span className="text-2xl font-bold text-primary">+25%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                    <span className="font-medium">Completion Rate</span>
                    <span className="text-2xl font-bold text-primary">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge className="gradient-primary text-white border-0 px-4 py-2">
              💬 Student Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              What Our Students
              <span className="text-gradient block">Are Saying</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-premium p-6">
                <CardContent className="p-0 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Join thousands of students who have already elevated their academic performance with EduPortal.
                Start your free trial today and experience the difference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4 h-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 h-auto">
                  View All Features
                </Button>
              </Link>
            </div>

            <p className="text-sm opacity-75">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;