"use client";

import { useRouter } from "next/navigation";
import useCurrentAdmin from "./Usecurrentadmin";
import { useEffect } from "react";

function UseProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useCurrentAdmin();

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/sign-in");
        return;
      }

      if (user.role !== "ADMIN") {
        router.push("/Unauthorized");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export default UseProtectedRoute;