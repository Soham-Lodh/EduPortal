import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Clock, AlertCircle, CheckCircle2, Target, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import axios from 'axios';

const Planner = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '', 
    description: '', 
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00', 
    endTime: '10:00', 
    category: 'study', 
    priority: 'medium'
  });

  const categories = [
    { value: 'assignment', label: 'Assignment', color: 'from-red-500 to-pink-500' },
    { value: 'study', label: 'Study Session', color: 'from-blue-500 to-cyan-500' },
    { value: 'exam', label: 'Exam', color: 'from-orange-500 to-red-500' },
    { value: 'presentation', label: 'Presentation', color: 'from-purple-500 to-indigo-500' },
    { value: 'project', label: 'Project', color: 'from-green-500 to-emerald-500' },
    { value: 'meeting', label: 'Meeting', color: 'from-yellow-500 to-orange-500' }
  ];

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      const data = res.data.map(e => ({ 
        ...e, 
        _id: e._id || e.id, 
        date: new Date(e.date) 
      }));
      setEvents(data);
    } catch (err) { 
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => { 
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  // Event Handlers
  const handleAddEvent = async () => {
    try {
      const categoryColor = categories.find(c => c.value === newEvent.category)?.color || 'from-gray-500 to-gray-600';
      
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/events`, {
        ...newEvent,
        color: categoryColor,
        userId: user?.id // Associate with current user
      });

      const createdEvent = { 
        ...res.data, 
        _id: res.data._id || res.data.id,
        date: new Date(res.data.date)
      };
      
      setEvents([...events, createdEvent]);
      setNewEvent({
        title: '', 
        description: '', 
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00', 
        endTime: '10:00', 
        category: 'study', 
        priority: 'medium'
      });
      setIsDialogOpen(false);
    } catch (err) { 
      console.error('Error adding event:', err);
    }
  };

  const toggleEventStatus = async (eventId) => {
    try {
      const event = events.find(e => e._id === eventId);
      const updatedStatus = event.status === 'completed' ? 'pending' : 'completed';
      
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
        status: updatedStatus
      });

      const updatedEvent = { 
        ...res.data, 
        _id: res.data._id || res.data.id,
        date: new Date(res.data.date)
      };
      
      setEvents(events.map(e => e._id === eventId ? updatedEvent : e));
    } catch (err) { 
      console.error('Error updating event:', err);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`);
      setEvents(events.filter(e => e._id !== eventId));
    } catch (err) { 
      console.error('Error deleting event:', err);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = Array(firstDay.getDay()).fill(null);
    
    for(let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if(!date) return [];
    return events.filter(e => e.date.toDateString() === date.toDateString());
  };

  const navigateMonth = (dir) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (dir === 'next' ? 1 : -1), 1));
  };

  const upcomingTasks = events
    .filter(e => e.status === 'pending')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const stats = [
    { label: 'Upcoming Tasks', value: events.filter(e => e.status === 'pending').length, icon: Clock, color: 'text-orange-500' },
    { label: 'Completed', value: events.filter(e => e.status === 'completed').length, icon: CheckCircle2, color: 'text-green-500' },
    { label: 'High Priority', value: events.filter(e => e.priority === 'high' && e.status === 'pending').length, icon: AlertCircle, color: 'text-red-500' },
    { label: 'This Week', value: events.filter(e => {
      const eventDate = new Date(e.date);
      const today = new Date();
      const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return eventDate >= today && eventDate <= weekEnd;
    }).length, icon: Target, color: 'text-blue-500'}
  ];

  if(!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient flex items-center gap-3">
              <Calendar className="w-8 h-8" /> Study Planner
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-hero">
                <Plus className="w-4 h-4 mr-2"/> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  placeholder="Title" 
                  value={newEvent.title} 
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                />
                <Textarea 
                  placeholder="Description" 
                  value={newEvent.description} 
                  onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                />
                <Input 
                  type="date" 
                  value={newEvent.date} 
                  onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    type="time" 
                    value={newEvent.startTime} 
                    onChange={e => setNewEvent({...newEvent, startTime: e.target.value})}
                  />
                  <Input 
                    type="time" 
                    value={newEvent.endTime} 
                    onChange={e => setNewEvent({...newEvent, endTime: e.target.value})}
                  />
                </div>
                <Select 
                  value={newEvent.category} 
                  onValueChange={v => setNewEvent({...newEvent, category: v})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={newEvent.priority} 
                  onValueChange={v => setNewEvent({...newEvent, priority: v})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddEvent} className="w-full btn-hero">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendar */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="w-4 h-4"/>
                  </Button>
                  <CardTitle>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</CardTitle>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="w-4 h-4"/>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentDate).map((day, index) => {
                    if(!day) return <div key={index} className="bg-muted/20 min-h-[100px] rounded-lg"></div>;
                    
                    const dayEvents = getEventsForDate(day);
                    const isToday = day.toDateString() === new Date().toDateString();
                    
                    return (
                      <div key={index} className={`min-h-[100px] p-2 border rounded-lg ${isToday ? 'ring-2 ring-primary' : ''}`}>
                        <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div key={event._id} className={`text-xs p-1 rounded text-white bg-gradient-to-r ${event.color}`} title={event.title}>
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map(task => (
                  <div key={task._id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Button variant="ghost" size="icon" onClick={() => toggleEventStatus(task._id)}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500"/>
                      ) : (
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded-full"/>
                      )}
                    </Button>
                    <div className="flex-1 min-w-0">
                      <p className={task.status === 'completed' ? 'line-through' : ''}>{task.title}</p>
                      <p className="text-xs">{task.date.toLocaleDateString()} at {task.startTime}</p>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteEvent(task._id)}>
                      <Trash2 className="w-3 h-3"/>
                    </Button>
                  </div>
                ))}
                {upcomingTasks.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">No upcoming tasks</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
