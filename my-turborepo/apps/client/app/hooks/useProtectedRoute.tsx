'use client';

import { useEffect, useState } from 'react';
import usecurrentUser from './usecurrentUser';

export default function useProtectedRoute() {
  const { user, loading } = usecurrentUser();
  const [showSignin, setShowSignin] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowSignin(true);
    }
  }, [user, loading]);

  return {
    isAuthenticated: !!user,
    isLoading: loading,
    showSignin,
    setShowSignin,
  };
}
