
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Clock, Star, Trophy, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const upcomingInterviews = [
    { title: 'Frontend Interview', date: 'Today, 3:00 PM', type: 'React' },
    { title: 'System Design', date: 'Tomorrow, 11:00 AM', type: 'Architecture' },
  ];
  
  const recentActivities = [
    { title: 'React Hooks Practice', date: '2 days ago', score: '85%' },
    { title: 'Algorithm Challenge', date: '3 days ago', score: '90%' },
    { title: 'System Design Practice', date: '1 week ago', score: '75%' },
  ];

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
        <p className="text-muted-foreground mt-1">Continue your interview preparation journey</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Practice Score
            </CardTitle>
            <CardDescription>Your overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">82%</div>
            <Progress value={82} className="h-2 mt-2" />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span>12% increase from last week</span>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Practice Hours
            </CardTitle>
            <CardDescription>Total time invested</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24.5</div>
            <Progress value={70} className="h-2 mt-2" />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <span>5.5 hours this week</span>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-500" />
              Strengths
            </CardTitle>
            <CardDescription>Your best topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="mb-1 flex justify-between">
                <span>React</span>
                <span className="font-medium">93%</span>
              </div>
              <Progress value={93} className="h-2 mb-3" />
              
              <div className="mb-1 flex justify-between">
                <span>JavaScript</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="upcoming">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="recent">Recent Activities</TabsTrigger>
              </TabsList>
              <Button size="sm" variant="outline" onClick={() => navigate('/schedule')}>
                View All
              </Button>
            </div>
            
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
                  <CardDescription>Your scheduled practice sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingInterviews.map((interview, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{interview.title}</div>
                          <div className="text-sm text-muted-foreground">{interview.date}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{interview.type}</Badge>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/schedule')}>
                    Schedule New Interview
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activities</CardTitle>
                  <CardDescription>Your latest practice sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.date}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{activity.score}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Start Practicing</CardTitle>
            <CardDescription>Choose an interview type</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button className="w-full justify-start" onClick={() => navigate('/interview')}>
              <BookOpen className="mr-2 h-4 w-4" />
              Technical Interview
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/algorithms')}>
              <BookOpen className="mr-2 h-4 w-4" />
              Algorithm Challenge
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              System Design
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
