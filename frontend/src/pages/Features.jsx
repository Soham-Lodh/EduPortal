import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Calendar,
  BookOpen,
  BarChart3,
  Users,
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Cloud,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Download,
  Share2,
  Target,
  Clock,
  Trophy,
  Lightbulb,
  FileText,
  Video,
  Headphones,
  PenTool,
  Search,
  Filter,
  Bookmark,
  Bell,
  Settings,
  Lock
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Tutor',
      description: 'Get instant, personalized help with any subject. Our AI understands your learning style and adapts explanations accordingly.',
      benefits: [
        '24/7 availability for instant help',
        'Personalized explanations based on your level',
        'Multi-subject expertise',
        'Interactive problem-solving sessions'
      ],
      color: 'from-purple-500 to-pink-500',
      href: '/chat',
      badge: 'Most Popular'
    },
    {
      icon: Calendar,
      title: 'Smart Study Planner',
      description: 'Intelligent scheduling that adapts to your deadlines, study habits, and learning goals for optimal time management.',
      benefits: [
        'Automatic deadline tracking',
        'Smart task prioritization',
        'Customizable study schedules',
        'Progress monitoring and adjustments'
      ],
      color: 'from-blue-500 to-cyan-500',
      href: '/planner',
      badge: 'Essential'
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Access thousands of curated study materials, textbooks, videos, and practice exercises across all subjects.',
      benefits: [
        'Comprehensive study materials',
        'Advanced search and filtering',
        'Offline download capabilities',
        'Collaborative bookmarking'
      ],
      color: 'from-green-500 to-emerald-500',
      href: '/library',
      badge: 'Updated Daily'
    },
    {
      icon: BarChart3,
      title: 'Learning Analytics',
      description: 'Track your progress with detailed insights, performance metrics, and personalized recommendations.',
      benefits: [
        'Detailed progress tracking',
        'Performance trend analysis',
        'Goal achievement monitoring',
        'Personalized improvement suggestions'
      ],
      color: 'from-orange-500 to-red-500',
      href: '/analytics',
      badge: 'Data-Driven'
    },
    {
      icon: Users,
      title: 'Study Community',
      description: 'Connect with peers, join study groups, and collaborate on projects in a supportive learning environment.',
      benefits: [
        'Peer-to-peer learning',
        'Study group formation',
        'Collaborative projects',
        'Expert mentorship programs'
      ],
      color: 'from-indigo-500 to-purple-500',
      href: '/community',
      badge: 'Social Learning'
    },
    {
      icon: MessageSquare,
      title: 'Smart Notes & Chat',
      description: 'Take collaborative notes with AI-enhanced organization, real-time chat, and seamless sharing capabilities.',
      benefits: [
        'Real-time collaboration',
        'AI-powered organization',
        'Cross-platform synchronization',
        'Advanced formatting tools'
      ],
      color: 'from-pink-500 to-rose-500',
      href: '/notes',
      badge: 'Collaborative'
    }
  ];

  const additionalFeatures = [
    {
      icon: Zap,
      title: 'Instant Answers',
      description: 'Get immediate responses to your questions'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Study in your preferred language'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Perfect experience on any device'
    },
    {
      icon: Cloud,
      title: 'Cloud Sync',
      description: 'Access your content anywhere, anytime'
    },
    {
      icon: Heart,
      title: 'Wellness Tracking',
      description: 'Balance study time with health metrics'
    }
  ];

  const testimonials = [
    {
      quote: "EduPortal's AI tutor helped me understand complex calculus concepts in just 30 minutes. Game changer!",
      author: "Sarah Chen",
      role: "Engineering Student",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80",
      rating: 5
    },
    {
      quote: "The study planner is incredible. It automatically adjusts my schedule when I fall behind. So smart!",
      author: "Marcus Johnson",
      role: "Medical Student",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
      rating: 5
    },
    {
      quote: "Found my perfect study group through the community feature. We help each other succeed every day.",
      author: "Elena Rodriguez",
      role: "Business Major",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Student',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'AI Tutor (10 sessions/month)',
        'Basic Study Planner',
        'Resource Library Access',
        'Community Forums',
        'Mobile App Access'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Premium',
      price: '$9.99/month',
      description: 'Most popular for serious students',
      features: [
        'Unlimited AI Tutor Sessions',
        'Advanced Study Planner',
        'Premium Resource Library',
        'Priority Community Access',
        'Learning Analytics Dashboard',
        'Offline Mode',
        'Study Group Creation'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Pro',
      price: '$19.99/month',
      description: 'For advanced learners and educators',
      features: [
        'Everything in Premium',
        'Personal AI Learning Assistant',
        'Advanced Analytics & Insights',
        'Custom Study Plans',
        'Priority Support',
        'API Access',
        'White-label Options'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Students' },
    { number: '1,200+', label: 'Courses Available' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-6">
            <Badge className="gradient-primary text-white border-0 px-6 py-2 text-lg">
              ✨ Premium Learning Features
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold">
              Everything You Need to
              <span className="text-gradient block">Excel in Your Studies</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of AI-powered tools designed to transform your learning experience
              and help you achieve academic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="text-lg px-8 py-4 h-auto">
                <PlayCircle className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl font-bold text-gradient">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Core Features That
              <span className="text-gradient block">Drive Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each feature is carefully designed to address specific learning challenges and accelerate your academic progress.
            </p>
          </div>

          <div className="space-y-16">
            {mainFeatures.map((feature, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      {feature.badge && (
                        <Badge className="gradient-secondary text-white border-0">{feature.badge}</Badge>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Link to={feature.href}>
                      <Button className="btn-hero">
                        Try {feature.title}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="card-premium p-8 h-80">
                    <CardContent className="p-0 h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center shadow-xl animate-float`}>
                          <feature.icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-semibold">Interactive Demo</h4>
                          <p className="text-muted-foreground">Click to explore this feature</p>
                        </div>
                        <Button variant="outline" className="animate-pulse">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Additional Features That
              <span className="text-gradient block">Make a Difference</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond our core features, we provide additional tools and capabilities to enhance every aspect of your learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="card-glass hover:shadow-premium transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="gradient-secondary text-white border-0 px-4 py-2 mb-6">
              💬 Student Success Stories
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Loved by Students
              <span className="text-gradient block">Worldwide</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-premium">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Choose Your
              <span className="text-gradient block">Learning Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and upgrade as you grow. All plans include access to our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`card-premium relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-primary text-white border-0 px-4 py-2">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-gradient">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full h-12 ${plan.popular ? 'btn-hero' : 'btn-secondary'}`}
                  >
                    {plan.cta}
                  </Button>
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
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Experience the Future of Learning?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of students who have already transformed their academic journey with EduPortal's powerful features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4 h-auto">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 h-auto">
                  Try AI Tutor Now
                  <Brain className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm opacity-75">
              No credit card required • Full access to all features • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;