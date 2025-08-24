import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Brain,
  Download,
  Share2,
  RefreshCw,
  Lightbulb,
  Calculator,
  BookOpen,
  Zap,
  Clock,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const Chat = () => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm your AI tutor. I'm here to help you with any subject - from math and science to history and literature. What would you like to learn about today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const quickQuestions = [
    { text: "Explain photosynthesis", icon: Lightbulb, category: "Biology" },
    { text: "Help with calculus derivatives", icon: Calculator, category: "Math" },
    { text: "What is quantum physics?", icon: Zap, category: "Physics" },
    { text: "Analyze this poem", icon: BookOpen, category: "Literature" },
    { text: "Study tips for exams", icon: Brain, category: "Study Skills" },
    { text: "Programming concepts", icon: RefreshCw, category: "Computer Science" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  const sendMessageToAI = async (message) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        userMessage: message
      }, {
        withCredentials: true
      });
      
      return response.data.reply;
    } catch (error) {
      console.error('Error sending message to AI:', error);
      throw new Error('Failed to get AI response');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Send message to backend AI
      const aiResponse = await sendMessageToAI(inputMessage);
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Fallback to simulated response if AI fails
      const fallbackResponses = [
        "I'm having trouble connecting right now. Let me try that again...",
        "It seems there's a connection issue. Could you try again?",
        "I apologize, I'm experiencing some technical difficulties. Please try your question again."
      ];
      
      const fallbackMessage = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI tutor. I'm here to help you with any subject. What would you like to learn about today?",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg animate-glow">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">AI Tutor</h1>
                <p className="text-muted-foreground">Powered by Gemini AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="gradient-secondary text-white border-0">
                <Zap className="w-3 h-3 mr-1" />
                Online
              </Badge>
              <Button variant="outline" size="icon" onClick={clearChat}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-premium">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Quick Questions
                </h3>
                <div className="space-y-3">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full text-left justify-start h-auto p-3 hover:bg-muted/50"
                      onClick={() => handleQuickQuestion(question.text)}
                    >
                      <div className="flex items-start gap-3">
                        <question.icon className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        <div className="text-left">
                          <div className="text-sm font-medium">{question.text}</div>
                          <div className="text-xs text-muted-foreground">{question.category}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-glass gradient-primary text-white">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">AI Study Tips</h3>
                <p className="text-sm opacity-90 mb-4">
                  Ask me to create custom study plans, explain complex topics, or help with homework.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="card-premium h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/ai-avatar.png" alt="AI Tutor" />
                      <AvatarFallback className="gradient-primary text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">AI Tutor Assistant</h3>
                      <p className="text-sm text-muted-foreground">Powered by Gemini AI</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={clearChat}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'ai' && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="gradient-primary text-white text-xs">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                        <div
                          className={`p-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'gradient-primary text-white ml-auto'
                              : 'bg-muted/50 border border-border/50'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        </div>
                        
                        <div className={`flex items-center gap-2 mt-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.sender === 'ai' && (
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => copyMessage(message.text)}>
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {message.sender === 'user' && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="gradient-secondary text-white text-xs">
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="gradient-primary text-white text-xs">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted/50 border border-border/50 p-3 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your studies..."
                      className="pr-20 py-3 h-auto resize-none"
                      disabled={isTyping}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="btn-hero px-6 py-3 h-auto"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI can make mistakes. Please verify important information.
                </p>
              </div>
            </Card>

            {/* Chat Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card className="card-glass">
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Response Time</div>
                  <div className="text-lg font-bold text-gradient">Real-time</div>
                </CardContent>
              </Card>
              <Card className="card-glass">
                <CardContent className="p-4 text-center">
                  <Brain className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">AI Model</div>
                  <div className="text-lg font-bold text-gradient">Gemini 1.5</div>
                </CardContent>
              </Card>
              <Card className="card-glass">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Subjects</div>
                  <div className="text-lg font-bold text-gradient">All</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;