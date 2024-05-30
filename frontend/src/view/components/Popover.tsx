import * as RadixPopover from '@radix-ui/react-popover';
import React from 'react';
import { cn } from '../../app/utils/cn';

const PopoverRoot = ({ children }: { children: React.ReactNode }) => {
  return <RadixPopover.Root>{children}</RadixPopover.Root>;
};

const PopoverTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <RadixPopover.Trigger asChild className="outline-none">
      {children}
    </RadixPopover.Trigger>
  );
};

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverContent = ({ children, className }: PopoverContentProps) => {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          'rounded-2xl p-4 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slideUpAndFade data-[side=top]:animate-slideDownAndFade z-[99]',
          className
        )}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
};

const PopoverClose = ({ children }: { children: React.ReactNode }) => {
  return <RadixPopover.Close>{children}</RadixPopover.Close>;
};

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
};
