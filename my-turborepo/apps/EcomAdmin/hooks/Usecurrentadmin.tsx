import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/user.service";

function useCurrentAdmin() {
  const {
    data,
    isLoading,
    error: isError,
    refetch,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: () => getCurrentUser(),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    user:  data ?? null, 
    error: isError,
    loading: isLoading,
    refetch,
  };
}

export default useCurrentAdmin;