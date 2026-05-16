"use client";

import { useRouter } from "next/navigation";
import useCurrentAdmin from "./Usecurrentadmin";
import { useEffect, useState } from "react";

function UseProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useCurrentAdmin();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || loading) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (user.role !== "ADMIN") {
      router.push("/Unauthorized");
    }
  }, [ user,loading, router, isClient]);

  // Don't render anything during loading or hydration to prevent flash
  if (!isClient || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export default UseProtectedRoute;