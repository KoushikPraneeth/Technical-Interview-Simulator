
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  // Interview settings
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [aiModel, setAiModel] = useState("gpt-4");
  const [interviewDuration, setInterviewDuration] = useState(30);
  const [difficultyLevel, setDifficultyLevel] = useState("medium");
  
  // Feedback settings
  const [realTimeFeedback, setRealTimeFeedback] = useState(true);
  const [detailedAnalysis, setDetailedAnalysis] = useState(true);
  const [codeAnalysis, setCodeAnalysis] = useState(true);
  
  // Account settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // API settings
  const [apiKey, setApiKey] = useState("");
  
  const handleSaveSettings = () => {
    // This would save to a real settings service in production
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  const handleResetDefaults = () => {
    // Reset to default settings
    setMicrophoneEnabled(true);
    setAiModel("gpt-4");
    setInterviewDuration(30);
    setDifficultyLevel("medium");
    setRealTimeFeedback(true);
    setDetailedAnalysis(true);
    setCodeAnalysis(true);
    setEmailNotifications(true);
    setDarkMode(false);
    
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetDefaults}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings}>
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="interview">
        <TabsList className="mb-4">
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="interview">
          <Card>
            <CardHeader>
              <CardTitle>Interview Settings</CardTitle>
              <CardDescription>
                Configure your interview experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="microphone">Microphone Input</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable voice input during interviews
                  </p>
                </div>
                <Switch
                  id="microphone"
                  checked={microphoneEnabled}
                  onCheckedChange={setMicrophoneEnabled}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label htmlFor="duration">Interview Duration</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="duration"
                    min={15}
                    max={60}
                    step={5}
                    value={[interviewDuration]}
                    onValueChange={(values) => setInterviewDuration(values[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{interviewDuration} min</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set the default length of interview sessions
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="adaptive">Adaptive</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose the default complexity of interview questions
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label htmlFor="ai-model">AI Model</Label>
                <Select value={aiModel} onValueChange={setAiModel}>
                  <SelectTrigger id="ai-model">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3.5">GPT-3.5 (Faster)</SelectItem>
                    <SelectItem value="gpt-4">GPT-4 (More detailed)</SelectItem>
                    <SelectItem value="custom">Custom Model</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Select which AI model powers your interview experience
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Settings</CardTitle>
              <CardDescription>
                Configure how you receive feedback on your interviews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="realtime">Real-time Feedback</Label>
                  <p className="text-sm text-muted-foreground">
                    Display feedback during the interview
                  </p>
                </div>
                <Switch
                  id="realtime"
                  checked={realTimeFeedback}
                  onCheckedChange={setRealTimeFeedback}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="detailed">Detailed Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    Provide comprehensive feedback after interviews
                  </p>
                </div>
                <Switch
                  id="detailed"
                  checked={detailedAnalysis}
                  onCheckedChange={setDetailedAnalysis}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="code">Code Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    Analyze and provide feedback on your code samples
                  </p>
                </div>
                <Switch
                  id="code"
                  checked={codeAnalysis}
                  onCheckedChange={setCodeAnalysis}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue="John Smith" />
                <p className="text-sm text-muted-foreground">
                  This name will be used throughout the application
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.smith@example.com" />
                <p className="text-sm text-muted-foreground">
                  Used for notifications and account recovery
                </p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your progress
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Configure external API connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="api-key">OpenAI API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..." 
                />
                <p className="text-sm text-muted-foreground">
                  Optional: Use your own API key for advanced functionality
                </p>
              </div>
              
              <div className="pt-4">
                <Button type="submit" onClick={() => {
                  if (apiKey) {
                    toast({
                      title: "API key saved",
                      description: "Your OpenAI API key has been securely stored.",
                    });
                  } else {
                    toast({
                      title: "API key removed",
                      description: "Using the default API integration.",
                    });
                  }
                }}>
                  Save API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
