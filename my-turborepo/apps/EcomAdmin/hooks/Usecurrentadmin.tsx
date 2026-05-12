import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/user.service";

function useCurrentAdmin() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin"],
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

export default useCurrentAdmin;