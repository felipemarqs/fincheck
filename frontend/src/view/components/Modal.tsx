import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../app/utils/cn';
import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
  onClose?(): void;
}

export const Modal = ({ open, children, title, onClose }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80  backdrop-blur-sm z-50 data-[state=open]:animate-overlayShow'
          )}
        />
        <Dialog.Content
          className={cn(
            'data-[state=open]:animate-contentShow',
            'fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-[99]',
            'p-6 space-y-10 bg-white rounded-2xl',
            'shadow=[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none'
          )}
        >
          <header className="relative h-12 flex items-center justify-center text-gray-800 ">
            <span className="absolute left-1/2 transform -translate-x-1/2 text-lg tracking-[-1px] font-bold">
              {title}
            </span>

            <button
              className="absolute right-1 w-12 h-12 flex items-center justify-center outline-none"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
          </header>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
