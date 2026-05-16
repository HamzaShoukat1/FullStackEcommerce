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
        <div className="text-gray-800">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  // Auth pages should have white background to ensure proper dialog visibility
  return <div className="min-h-screen w-full bg-white">{children}</div>;
}
