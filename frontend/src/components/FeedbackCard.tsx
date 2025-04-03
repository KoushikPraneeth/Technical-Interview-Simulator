
import React from 'react';
import { Check, AlertCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeedbackCardProps {
  type: 'positive' | 'negative' | 'suggestion';
  title: string;
  content: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ type, title, content }) => {
  const getIcon = () => {
    switch (type) {
      case 'positive':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'suggestion':
        return <HelpCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  const getBorderClass = () => {
    switch (type) {
      case 'positive':
        return 'border-l-4 border-l-green-500';
      case 'negative':
        return 'border-l-4 border-l-red-500';
      case 'suggestion':
        return 'border-l-4 border-l-amber-500';
    }
  };

  return (
    <Card className={cn("mb-4", getBorderClass())}>
      <CardHeader className="flex flex-row items-center gap-2 pb-2 pt-4">
        {getIcon()}
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
