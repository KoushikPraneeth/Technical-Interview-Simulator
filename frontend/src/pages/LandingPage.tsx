
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { supabaseClient } from '@/lib/supabase';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabaseClient.auth.getSession();
      setIsLoggedIn(!!data.session);
      setLoading(false);
      
      // If user is already logged in, redirect to dashboard
      if (data.session) {
        navigate('/dashboard');
      }
    };
    
    checkAuthStatus();
    
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
        if (session) {
          navigate('/dashboard');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-apple-light dark:bg-apple-dark">Loading...</div>;
  }

  // Don't render the landing page if the user is logged in (they'll be redirected to dashboard)
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-apple-light dark:bg-apple-dark text-apple-dark dark:text-white font-sans">
      <header className="w-full px-8 py-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <div className="text-2xl font-semibold tracking-tight">TechInterviewPro</div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={handleSignIn}
            className="rounded-full px-6 hover:bg-apple-blue/10 hover:text-apple-blue border-apple-gray text-apple-dark dark:text-white"
          >
            Sign In
          </Button>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <Card className="w-full max-w-5xl shadow-sm border-0 rounded-3xl overflow-hidden bg-white/80 dark:bg-black/80 backdrop-blur-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-10">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-apple-dark dark:text-white mb-6 leading-tight">
                    Master Your Technical Interviews
                  </h1>
                  <p className="text-apple-gray dark:text-gray-300 text-lg mb-10 leading-relaxed">
                    Practice with our AI-powered interview simulator that provides real-time feedback, voice recognition, and realistic scenarios.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-apple-green flex items-center justify-center text-white mr-4">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-apple-dark dark:text-white">Realistic mock interviews</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-apple-green flex items-center justify-center text-white mr-4">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-apple-dark dark:text-white">Real-time AI feedback</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-apple-green flex items-center justify-center text-white mr-4">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-apple-dark dark:text-white">Voice interaction support</p>
                    </div>
                  </div>
                </div>
                <div className="space-x-4">
                  <Button 
                    onClick={handleGetStarted}
                    size="lg"
                    className="bg-apple-blue hover:bg-apple-blue/90 text-white rounded-full px-8 py-6 text-base font-medium group transition-all"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleSignIn}
                    className="rounded-full px-8 py-6 text-base font-medium border-apple-gray/30 text-apple-dark dark:text-white hover:bg-apple-blue/10 hover:text-apple-blue transition-all"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-r-3xl bg-gradient-to-br from-apple-blue/90 to-apple-indigo/70 h-full min-h-[400px]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-center text-white">Ready for your next interview?</h2>
                  <p className="text-center mb-10 text-white/90 max-w-md leading-relaxed">
                    Our simulator helps you practice and improve your technical interview skills in a stress-free environment.
                  </p>
                  <blockquote className="italic border-l-2 pl-6 py-2 max-w-sm text-white/90 leading-relaxed">
                    "The most realistic interview practice tool I've used. It helped me land my dream job at a top tech company."
                  </blockquote>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
