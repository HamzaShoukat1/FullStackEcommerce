import "dotenv/config"

import { apiClient } from "@/app/utils/apiClient";

const BackenedUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3003";

export async function createUser(signupData: { firstName: string; lastName: string; email: string; password: string }) {
    return apiClient(`${BackenedUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(signupData),

    });
}

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

