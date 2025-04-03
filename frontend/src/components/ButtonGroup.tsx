
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ 
  children, 
  className,
  variant = "default"
}) => {
  // Convert children to array to work with them
  const childrenArray = React.Children.toArray(children);
  
  // Apply specific styling to each button
  const styledChildren = childrenArray.map((child, index) => {
    if (React.isValidElement(child) && child.type === Button) {
      // Apply rounded corners based on position
      let roundedClassName = '';
      
      if (childrenArray.length === 1) {
        roundedClassName = 'rounded-md';
      } else if (index === 0) {
        roundedClassName = 'rounded-l-md rounded-r-none';
      } else if (index === childrenArray.length - 1) {
        roundedClassName = 'rounded-r-md rounded-l-none';
      } else {
        roundedClassName = 'rounded-none';
      }
      
      // Apply border styling
      let borderClassName = '';
      if (variant === "outline" && index > 0) {
        borderClassName = 'border-l-0';
      }
      
      // Properly merge the className props
      const combinedClassName = cn(
        child.props.className,
        roundedClassName,
        borderClassName
      );
      
      // Need to ensure we're cloning with the correct props structure
      return React.cloneElement(child, {
        className: combinedClassName,
        variant: child.props.variant || variant,
      } as React.ComponentProps<typeof Button>);
    }
    return child;
  });
  
  return (
    <div className={cn("inline-flex", className)}>
      {styledChildren}
    </div>
  );
};

export { ButtonGroup };
