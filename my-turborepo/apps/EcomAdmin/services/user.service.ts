import "dotenv/config"

import { apiClient } from "@/hooks/ApiClient";
const BackenedUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3003";



export async function loginUser(loginData: { email: string; password: string }) {
    return apiClient(`${BackenedUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
    });
}

export async function getCurrentUser() {
    return apiClient(`${BackenedUrl}/auth/me`, {
        method: "GET",
    });
}

export async function logoutUser() {
    return apiClient(`${BackenedUrl}/auth/logout`, {
        method: "POST",

    });
}
export async function registerUser(registerData: { firstName: string; lastName: string; email: string; password: string }) {
    return apiClient(`${BackenedUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(registerData),
    });
}
export async function deleteUser(userId: string) {
    return apiClient(`${BackenedUrl}/admin/user/${userId}`, {
        method: "DELETE",
    });
}
export async function refreshToken() {
    return apiClient(`${BackenedUrl}/auth/refresh`, {
        method: "POST",
    });
}

