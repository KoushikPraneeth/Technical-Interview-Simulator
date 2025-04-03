
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnalyticsService, InterviewSession } from '@/services/AnalyticsService';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Clock, Award, Eye } from 'lucide-react';

const History: React.FC = () => {
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadSessions = async () => {
      setIsLoading(true);
      const analyticsService = new AnalyticsService();
      const data = await analyticsService.getAllSessions();
      setSessions(data);
      setIsLoading(false);
    };
    
    loadSessions();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-amber-600";
    return "text-red-600";
  };

  const handleViewSession = (sessionId: string) => {
    // In a real app, this would navigate to a session details page
    navigate(`/history/${sessionId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your interview history...</p>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>No Interview History</CardTitle>
            <CardDescription>
              You haven't completed any interview practice sessions yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/interview')}>
              Start an Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Interview History</h1>
        <Button onClick={() => navigate('/interview')}>
          New Interview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Interview Sessions</CardTitle>
          <CardDescription>
            Review your past practice interviews and feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interview</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Topics</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.title}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <span>{formatDistanceToNow(session.date, { addSuffix: true })}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{Math.floor(session.duration / 60)} min</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {session.topics.map((topic, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className={getScoreColor(session.performanceScore)}>
                        {session.performanceScore}/100
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewSession(session.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strengths and Areas for Improvement</CardTitle>
          <CardDescription>
            Summary of your performance across all interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-green-600 mb-2 flex items-center gap-1">
                <Award className="h-4 w-4" />
                Strengths
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {Array.from(new Set(sessions.flatMap(s => s.feedback.strengths))).slice(0, 5).map((strength, i) => (
                  <li key={i} className="text-sm">{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-600 mb-2">Areas for Improvement</h3>
              <ul className="list-disc pl-5 space-y-1">
                {Array.from(new Set(sessions.flatMap(s => s.feedback.improvements))).slice(0, 5).map((improvement, i) => (
                  <li key={i} className="text-sm">{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
