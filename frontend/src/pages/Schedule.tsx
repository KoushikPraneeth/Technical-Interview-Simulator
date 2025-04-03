
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clock, CalendarIcon, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { addDays, format, isSameDay } from 'date-fns';

type Event = {
  id: string;
  title: string;
  date: Date;
  type: string;
  status: 'upcoming' | 'completed' | 'canceled';
};

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [interviewType, setInterviewType] = useState<string>("react");
  
  const events: Event[] = [
    {
      id: '1',
      title: 'Frontend Interview',
      date: addDays(new Date(), 1),
      type: 'React',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'System Design Interview',
      date: addDays(new Date(), 3),
      type: 'Architecture',
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Algorithm Challenge',
      date: new Date(),
      type: 'JavaScript',
      status: 'completed',
    },
    {
      id: '4',
      title: 'Backend Interview',
      date: addDays(new Date(), -2),
      type: 'Node.js',
      status: 'canceled',
    },
  ];

  const filteredEvents = events.filter(event => 
    date ? isSameDay(event.date, date) : true
  );

  const handleScheduleInterview = () => {
    // Logic to schedule an interview
    console.log('Scheduling interview of type:', interviewType, 'on date:', date);
  };

  // Define a component to customize the calendar day rendering
  const renderDay = (day: Date) => {
    const hasEvent = events.some(event => isSameDay(event.date, day));
    
    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {hasEvent && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground mt-1">Schedule and manage your interview sessions</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Schedule an Interview</CardTitle>
              <CardDescription>Select a date and interview type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                  components={{
                    Day: (props) => renderDay(props.date)
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Type</label>
                <Select value={interviewType} onValueChange={setInterviewType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="node">Node.js</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="system-design">System Design</SelectItem>
                    <SelectItem value="algorithms">Algorithms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleScheduleInterview} className="w-full mt-4">
                Schedule Interview
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? (
                  <span>Interviews on {format(date, 'MMM dd, yyyy')}</span>
                ) : (
                  <span>All Upcoming Interviews</span>
                )}
              </CardTitle>
              <CardDescription>
                {filteredEvents.length ? `${filteredEvents.length} interviews scheduled` : 'No interviews scheduled'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredEvents.length ? (
                <div className="space-y-4">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          event.status === 'upcoming' ? 'bg-blue-100 dark:bg-blue-900' : 
                          event.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : 
                          'bg-red-100 dark:bg-red-900'
                        }`}>
                          {event.status === 'upcoming' ? (
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          ) : event.status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{format(event.date, 'MMM dd, yyyy - h:mm a')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{event.type}</Badge>
                        {event.status === 'upcoming' && (
                          <Button size="sm" variant="outline">
                            Join <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No interviews scheduled for this day.</p>
                  <p className="text-muted-foreground text-center">Select another date or schedule a new interview.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
