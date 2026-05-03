import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/user.service";
import { handleSessionExpired } from "@/app/utils/sessionhandler";

function useCurrentUser() {
  const queryClient = useQueryClient();

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

  // Handle session expired
  if (isError) {
    handleSessionExpired(queryClient);
  }

  return {
    user: isError ? null : data ?? null, 
    loading: isLoading,
    refetch,
  };
}

export default useCurrentUser;