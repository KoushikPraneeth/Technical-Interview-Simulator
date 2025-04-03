
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CalendarDays, 
  Calculator, 
  BookOpen, 
  History, 
  Settings, 
  LogOut, 
  HelpCircle, 
  BarChart,
  Layers,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabaseClient } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        
        // Get user data
        const user = data.session.user;
        const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        setUserName(fullName);
        
        // Set initials
        const initials = fullName
          .split(' ')
          .map(name => name[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);
        setUserInitials(initials);
      } else {
        setIsAuthenticated(false);
      }
    };
    
    getUser();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          const fullName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User';
          setUserName(fullName);
          
          const initials = fullName
            .split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
          setUserInitials(initials);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Interview Practice",
      url: "/interview",
      icon: BookOpen,
    },
    {
      title: "Algorithm Challenges",
      url: "/algorithms",
      icon: Calculator,
    },
    {
      title: "System Design",
      url: "/system-design",
      icon: Layers,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: CalendarDays,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart,
    },
  ];

  const bottomItems = [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      url: "/help",
      icon: HelpCircle,
    },
  ];

  const handleSignOut = async () => {
    try {
      await supabaseClient.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center py-4 border-b">
        <div className="flex items-center gap-2 px-2">
          <Avatar>
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground">{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{userName || 'Guest'}</span>
            <span className="text-xs text-muted-foreground">
              {isAuthenticated ? 'User' : 'Not signed in'}
            </span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.url)}
                    className={isActive(item.url) ? "bg-sidebar-accent" : ""}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.url)}
                    className={isActive(item.url) ? "bg-sidebar-accent" : ""}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t">
        <div className="space-y-2 p-2">
          {!isAuthenticated ? (
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              size="sm"
              onClick={() => navigate('/auth/sign-in')}
            >
              Sign In
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" 
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
