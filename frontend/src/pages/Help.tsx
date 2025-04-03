
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, BookOpen, MessageCircle, Youtube } from 'lucide-react';

const Help: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse our comprehensive guides and documentation.
            </p>
            <Button variant="outline" className="w-full">
              View Docs
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get in touch with our support team for personalized help.
            </p>
            <Button variant="outline" className="w-full">
              Contact Us
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-primary" />
              Video Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Watch step-by-step tutorial videos to learn how to use the app.
            </p>
            <Button variant="outline" className="w-full">
              Watch Videos
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to common questions about using the interview trainer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the voice recognition work?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Our voice recognition uses your browser's built-in speech recognition capabilities to transcribe your spoken answers in real-time. To use it, you'll need to grant microphone permissions when prompted.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  For best results, use Chrome or Edge browsers in a quiet environment and speak clearly. The system works best with English language responses.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How is feedback generated?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Feedback is generated using advanced AI models that analyze your responses against industry best practices and expected answers. The system evaluates:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                  <li>Technical accuracy of your response</li>
                  <li>Completeness of your explanation</li>
                  <li>Communication clarity</li>
                  <li>Code quality (when applicable)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Real-time feedback appears during the interview, while more comprehensive analysis is provided after you complete the session.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I save my interview sessions?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Yes, all your interview sessions are automatically saved. You can access your complete interview history in the "History" section, where you can:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                  <li>Review past interviews</li>
                  <li>See detailed feedback and scores</li>
                  <li>Track your progress over time</li>
                  <li>Export sessions for personal reference</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How can I customize my interview experience?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  You can customize your interview experience in the Settings section, where you can:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                  <li>Adjust difficulty levels of questions</li>
                  <li>Focus on specific technologies or topics</li>
                  <li>Set preferred interview duration</li>
                  <li>Configure feedback preferences</li>
                  <li>Connect your own API key for enhanced features</li>
                </ul>
                <Button 
                  variant="link" 
                  className="mt-2 h-auto p-0" 
                  onClick={() => navigate('/settings')}
                >
                  Go to Settings
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Is my data private and secure?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Yes, we take data privacy seriously. All your interview sessions, responses, and personal information are:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                  <li>Encrypted in transit and at rest</li>
                  <li>Only accessible to you through your account</li>
                  <li>Never used for training AI models without consent</li>
                  <li>Subject to our comprehensive privacy policy</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  You can delete your data at any time through the account settings.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Still Need Help?
          </CardTitle>
          <CardDescription>
            Can't find what you're looking for? We're here to help.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Button className="flex-1">
            Contact Support
          </Button>
          <Button variant="outline" className="flex-1">
            Join Community Forum
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
