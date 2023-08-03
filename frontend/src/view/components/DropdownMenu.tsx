import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { cn } from "../../app/utils/cn";

const DropdownMenuRoot = ({ children }: { children: React.ReactNode }) => {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
};

const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
  return <RadixDropdownMenu.Trigger className="outline-none">{children}</RadixDropdownMenu.Trigger>;
};

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownMenuContent = ({ children, className }: DropdownMenuContentProps) => {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slideUpAndFade z-50",
          className
        )}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
};

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

const DropdownMenuItem = ({ children, className, onSelect }: DropdownMenuItemProps) => {
  return (
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-[40px] hover:outline-none flex items-center py-2 px-4 text-sm text-gray-800 data-[highlighted]:bg-gray-100 rounded-2xl transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
};

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
