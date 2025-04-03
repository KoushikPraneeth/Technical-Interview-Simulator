
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState, lazy, Suspense } from "react";
import { supabaseClient } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "./components/ThemeToggle";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Interview = lazy(() => import("./pages/Interview"));
const AlgorithmChallenges = lazy(() => import("./pages/AlgorithmChallenges"));
const SystemDesign = lazy(() => import("./pages/SystemDesign"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Analytics = lazy(() => import("./pages/Analytics"));
const History = lazy(() => import("./pages/History"));
const Settings = lazy(() => import("./pages/Settings"));
const Help = lazy(() => import("./pages/Help"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Loading fallback component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-apple-light dark:bg-apple-dark">
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-1">
        <div className="h-3 w-3 bg-apple-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="h-3 w-3 bg-apple-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="h-3 w-3 bg-apple-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return <SidebarProvider>
    <div className="min-h-screen flex w-full bg-apple-light dark:bg-apple-dark font-sans">
      <AppSidebar />
      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 p-4 bg-apple-light dark:bg-apple-dark border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <SidebarTrigger />
          <ThemeToggle />
        </div>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  </SidebarProvider>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/dashboard" 
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              } 
            />
            <Route 
              path="/interview" 
              element={
                <AuthenticatedRoute>
                  <Interview />
                </AuthenticatedRoute>
              } 
            />
            <Route 
              path="/algorithms" 
              element={
                <AuthenticatedRoute>
                  <AlgorithmChallenges />
                </AuthenticatedRoute>
              } 
            />
            <Route 
              path="/system-design" 
              element={
                <AuthenticatedRoute>
                  <SystemDesign />
                </AuthenticatedRoute>
              } 
            />
            <Route 
              path="/schedule" 
              element={
                <AuthenticatedRoute>
                  <Schedule />
                </AuthenticatedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <AuthenticatedRoute>
                  <History />
                </AuthenticatedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AuthenticatedRoute>
                  <Settings />
                </AuthenticatedRoute>
              } 
            />
            <Route 
              path="/help" 
              element={
                <AuthenticatedRoute>
                  <Help />
                </AuthenticatedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <AuthenticatedRoute>
                  <Analytics />
                </AuthenticatedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
