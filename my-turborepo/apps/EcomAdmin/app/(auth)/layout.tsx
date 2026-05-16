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
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // FIXED: Standard layout styling used instead of duplicate html/body tags
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}
