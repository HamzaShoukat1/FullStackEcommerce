'use client';

import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

let showSessionExpiredFn: (() => void) | null = null;

export function triggerSessionExpired() {
  if (showSessionExpiredFn) {
    showSessionExpiredFn();
  }
}

export default function SessionExpiredModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Register the callback so sessionhandler can trigger it
    showSessionExpiredFn = () => setOpen(true);
  }, []);

  const handleRefresh = () => {
    setOpen(false);
    router.push('/');
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Expired</AlertDialogTitle>
          <AlertDialogDescription>
            Your session has expired. Please log in again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleRefresh}>
            Sign In Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
