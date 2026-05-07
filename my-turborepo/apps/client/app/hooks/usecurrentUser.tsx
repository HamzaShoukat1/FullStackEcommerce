import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/user.service";

function useCurrentUser() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => getCurrentUser(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: isError ? null : data ?? null, 
    loading: isLoading,
    refetch,
  };
}

export default useCurrentUser;