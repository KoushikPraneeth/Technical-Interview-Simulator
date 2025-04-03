
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, Layers, Box, Database, Server, Globe } from 'lucide-react';

interface DesignChallenge {
  id: string;
  title: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'distributed';
  description: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  timeEstimate: string;
  completed?: boolean;
}

// Sample system design challenges
const challenges: DesignChallenge[] = [
  {
    id: '1',
    title: 'Design a URL Shortener',
    category: 'backend',
    description: 'Create a system design for a service that shortens URLs (like bit.ly).',
    complexity: 'basic',
    timeEstimate: '30-45 min'
  },
  {
    id: '2',
    title: 'Design Twitter',
    category: 'fullstack',
    description: 'Design a simplified version of Twitter with core functionality.',
    complexity: 'advanced',
    timeEstimate: '60-90 min',
    completed: true
  },
  {
    id: '3',
    title: 'Design Netflix',
    category: 'distributed',
    description: 'Create a high-level design for a video streaming service like Netflix.',
    complexity: 'advanced',
    timeEstimate: '60-90 min'
  },
  {
    id: '4',
    title: 'Design a Chat Application',
    category: 'fullstack',
    description: 'Design a real-time chat application supporting one-to-one and group messaging.',
    complexity: 'intermediate',
    timeEstimate: '45-60 min'
  },
  {
    id: '5',
    title: 'Design a Photo Sharing App',
    category: 'frontend',
    description: 'Design the frontend architecture for a photo sharing application.',
    complexity: 'intermediate',
    timeEstimate: '45-60 min'
  },
  {
    id: '6',
    title: 'Design a Distributed Cache',
    category: 'distributed',
    description: 'Design a distributed caching system for high-traffic applications.',
    complexity: 'advanced',
    timeEstimate: '60-90 min'
  },
];

// Get category icon
const getCategoryIcon = (category: DesignChallenge['category']) => {
  switch (category) {
    case 'frontend':
      return <Layers className="h-5 w-5 text-blue-500" />;
    case 'backend':
      return <Database className="h-5 w-5 text-green-500" />;
    case 'fullstack':
      return <Box className="h-5 w-5 text-purple-500" />;
    case 'distributed':
      return <Server className="h-5 w-5 text-orange-500" />;
    default:
      return <Globe className="h-5 w-5 text-gray-500" />;
  }
};

// Challenge card component
const DesignChallengeCard = ({ challenge }: { challenge: DesignChallenge }) => {
  // Map complexity to colors
  const complexityColor = {
    basic: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  };
  
  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            {getCategoryIcon(challenge.category)}
            <div>
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
              <CardDescription className="mt-1">
                {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)} System
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{challenge.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={complexityColor[challenge.complexity]}>
            {challenge.complexity.charAt(0).toUpperCase() + challenge.complexity.slice(1)}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {challenge.timeEstimate}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" variant={challenge.completed ? "outline" : "default"}>
          {challenge.completed ? "Review Solution" : "Start Design Challenge"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const SystemDesign = () => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">System Design Challenges</h1>
          <p className="text-muted-foreground mt-1">
            Practice designing scalable systems for technical interviews
          </p>
        </div>
        <Button>
          <Server className="mr-2 h-4 w-4" />
          Create Custom Design Challenge
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Challenges</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
          <TabsTrigger value="distributed">Distributed Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <DesignChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
        
        {['frontend', 'backend', 'fullstack', 'distributed'].map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges
                .filter(c => c.category === category)
                .map(challenge => (
                  <DesignChallengeCard key={challenge.id} challenge={challenge} />
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SystemDesign;
