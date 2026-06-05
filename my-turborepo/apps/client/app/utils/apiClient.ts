

export async function apiClient(url: string, options?: RequestInit){
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json().catch(() => null);



  // 2. If it's not a 401 but still failed, throw an error
  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  // 3. Success path
  console.log("response data", data?.data);
  return data;
}



