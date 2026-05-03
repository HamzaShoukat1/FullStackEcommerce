'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import useProtectedRoute from '@/app/hooks/useProtectedRoute';
import SigninDialog from './SigninDialog';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const pathname =  usePathname()
  const { isAuthenticated, isLoading, showSignin, setShowSignin } = useProtectedRoute();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-2xl font-bold">Sign In Required</h1>
          <p className="text-gray-600">Please sign in to continue shopping</p>
        </div>
        <SigninDialog open={showSignin} setOpen={setShowSignin} redirectUrl={pathname} />
      </>
    );
  }

  return <>{children}</>;
}
