'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCurrentAdmin from '@/hooks/Usecurrentadmin';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useCurrentAdmin();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we've finished loading and user exists
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // While loading, don't render anything to prevent hydration mismatch
  if (loading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className="bg-black">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        </body>
      </html>
    );
  }

  // Only render auth pages if user is NOT logged in
  if (user) {
    return null;
  }

  return <>{children}</>;
}
