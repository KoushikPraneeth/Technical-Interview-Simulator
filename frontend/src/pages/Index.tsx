
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { supabaseClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';

const Index = () => {
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
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleTryInterview = () => {
    if (isLoggedIn) {
      navigate('/interview');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-secondary/10">
      <header className="w-full p-4 flex justify-between items-center">
        <div className="text-xl font-semibold tracking-tight">TechInterviewPro</div>
        <div className="flex items-center gap-4">
          {!loading && !isLoggedIn && (
            <Button 
              variant="outline" 
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
          )}
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-5xl shadow-lg border-0 overflow-hidden bg-card/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 bg-clip-text">
                    Technical Interview Simulator
                  </h1>
                  <p className="text-muted-foreground text-lg mb-8">
                    Practice technical interviews with AI-powered feedback, voice recognition, and realistic scenarios.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-foreground">Realistic mock interviews</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-foreground">Real-time AI feedback</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-foreground">Voice interaction support</p>
                    </div>
                  </div>
                </div>
                <div className="space-x-4">
                  <Button 
                    onClick={handleGetStarted}
                    size="lg" 
                    className="group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleTryInterview}
                  >
                    Try an Interview
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-r-lg bg-gradient-to-br from-primary/80 to-primary/50 h-full min-h-[350px]">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <h2 className="text-2xl font-bold mb-4 text-center text-primary-foreground">Ready for your next interview?</h2>
                  <p className="text-center mb-8 text-primary-foreground/90">
                    Our simulator helps you practice and improve your technical interview skills in a stress-free environment.
                  </p>
                  <blockquote className="italic border-l-2 pl-4 max-w-xs text-primary-foreground/80">
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

export default Index;
