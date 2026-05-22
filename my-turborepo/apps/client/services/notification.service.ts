import { apiClient } from "@/app/utils/apiClient";

const BackendUrl = process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || "http://localhost:3015";



export async function getNotifications() {
    return apiClient(`${BackendUrl}/notifications`, {
        method: "GET",
    });
}

export async function markAsRead(id: string) {
     return apiClient(`${BackendUrl}/notifications/${id}/read`, {
        method: "PATCH",
    });
}

export async function markAllAsRead() {
    return apiClient(`${BackendUrl}/notifications/read-all`, {
        method: "PATCH",
    });
}