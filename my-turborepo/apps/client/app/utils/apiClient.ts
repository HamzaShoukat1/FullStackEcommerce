
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshToken() {
  try {
    const res = await fetch("http://localhost:3003/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function apiClient(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options
  });

  // Handle 401 - token expired
  if (response.status === 401) {
    // Only refresh once, other requests wait
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshToken();
    }

    const refreshSuccess = await refreshPromise;
    isRefreshing = false;

    if (refreshSuccess) {
      // Retry original request with new token
      const retryResponse = await fetch(url, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        ...options
      });

      const data = await retryResponse.json().catch(() => null);

      if (!retryResponse.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      return data;
    } else {
      // Refresh failed - session expired
      throw new Error("SESSION_EXPIRED");
    }
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}