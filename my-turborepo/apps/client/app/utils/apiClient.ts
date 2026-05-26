import { refreshToken } from "@/services/user.service";

let isRefreshing = false;

export async function apiClient(url: string, options?: RequestInit, _retry?: boolean): Promise<any> {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  // 1. Check for 401 Unauthorized FIRST before throwing generic errors
  if (response.status === 401 && !_retry) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        await refreshToken();
        isRefreshing = false;
      }
      // Retry the original request with the new tokens
      return apiClient(url, options, true);
    } catch (error) {
      isRefreshing = false;
      triggerSessionExpired(); // This fires the window event if refresh fails
      throw error;
    }
  }

  // 2. If it's not a 401 but still failed, throw an error
  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  // 3. Success path
  console.log("response data", data?.data);
  return data;
}

const triggerSessionExpired = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:session-expired"));
  }
};

