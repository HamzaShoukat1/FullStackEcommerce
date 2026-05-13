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

export async function getAllUsers() {
    return apiClient(`${BackenedUrl}/auth/all-users`, {
        method: "GET",
    });
}
