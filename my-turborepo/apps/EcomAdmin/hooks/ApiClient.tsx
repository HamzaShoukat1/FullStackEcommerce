
export async function apiClient(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  console.log("response data", data.data)

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data
}