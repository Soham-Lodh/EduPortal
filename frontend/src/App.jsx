import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";

// Pages
import Home from "./pages/Home.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Features from "./pages/Features.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Chat from "./pages/Chat.jsx";
import Planner from "./pages/Planner.jsx";
import Library from "./pages/Library.jsx";
import Analytics from "./pages/Analytics.jsx";
import Community from "./pages/Community.jsx";
import Notes from "./pages/Notes.jsx";
import Courses from "./pages/Courses.jsx";
import Settings from "./pages/Settings.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

// Conditional Layout wrapper
const ConditionalLayout = ({ children }) => {
  const location = useLocation();
  const noLayoutPages = ["/login", "/signup", "/forgot-password"];
  return noLayoutPages.includes(location.pathname) ? (
    children
  ) : (
    <Layout>{children}</Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ConditionalLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/library" element={<Library />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/community" element={<Community />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConditionalLayout>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;