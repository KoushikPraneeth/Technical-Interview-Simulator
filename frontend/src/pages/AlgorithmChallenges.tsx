
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, Code, Star } from 'lucide-react';

// Define algorithm challenge data structure
interface Challenge {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  timeEstimate: string;
  completed?: boolean;
  favorite?: boolean;
}

// Sample challenges data
const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'Arrays',
    description: 'Find two numbers in an array that add up to a specific target.',
    timeEstimate: '15-20 min',
    completed: true
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    category: 'Stacks',
    description: 'Determine if a string of parentheses is valid.',
    timeEstimate: '10-15 min',
    favorite: true
  },
  {
    id: '3',
    title: 'Merge Intervals',
    difficulty: 'medium',
    category: 'Arrays',
    description: 'Merge overlapping intervals in an array of intervals.',
    timeEstimate: '20-30 min'
  },
  {
    id: '4',
    title: 'LRU Cache',
    difficulty: 'medium',
    category: 'Design',
    description: 'Implement a Least Recently Used (LRU) cache with O(1) operations.',
    timeEstimate: '30-45 min'
  },
  {
    id: '5',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    category: 'Binary Search',
    description: 'Find the median of two sorted arrays in O(log(m+n)) time.',
    timeEstimate: '45-60 min'
  },
];

// Challenge card component
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  // Map difficulty to colors
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  };
  
  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{challenge.title}</CardTitle>
            <CardDescription className="mt-1">{challenge.category}</CardDescription>
          </div>
          {challenge.favorite && <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{challenge.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={difficultyColor[challenge.difficulty]}>
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {challenge.timeEstimate}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" variant={challenge.completed ? "outline" : "default"}>
          {challenge.completed ? "Review Solution" : "Start Challenge"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const AlgorithmChallenges = () => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Algorithm Challenges</h1>
          <p className="text-muted-foreground mt-1">
            Practice coding problems to improve your algorithmic thinking
          </p>
        </div>
        <Button>
          <Code className="mr-2 h-4 w-4" />
          Create Custom Challenge
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Challenges</TabsTrigger>
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="easy" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.filter(c => c.difficulty === 'easy').map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="medium" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.filter(c => c.difficulty === 'medium').map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="hard" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.filter(c => c.difficulty === 'hard').map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.filter(c => c.favorite).map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlgorithmChallenges;
