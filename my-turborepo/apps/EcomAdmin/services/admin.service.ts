import { apiClient } from "@/hooks/ApiClient";

const BackenedUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3003";

export async function getAllUsers(authToken: string) {
    return apiClient(`${BackenedUrl}/admin/all-users`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        next:{revalidate:40}
    });
}


export async function createUser(userData: { firstName: string; lastName: string; email: string; password: string }) {
    return apiClient(`${BackenedUrl}/admin/create-user`, {
        method: "POST",
        body: JSON.stringify(userData),

    });
}

export async function updateUser(id: number, userData: { firstName?: string; lastName?: string; email?: string; password?: string }) {
    return apiClient(`${BackenedUrl}/admin/user/${id}`, {
        method: "PATCH",
        body: JSON.stringify(userData),
    });
}

export async function deleteUser(id: number) {
    return apiClient(`${BackenedUrl}/admin/user/${id}`, {
        method: "DELETE",
    });
}

export async function getSingleUserDetails(id: number, authToken: string) {
    if (!id) throw new Error("Invalid user id");
    return apiClient(`${BackenedUrl}/admin/user/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        next:{revalidate: 40} 
        
    })
}