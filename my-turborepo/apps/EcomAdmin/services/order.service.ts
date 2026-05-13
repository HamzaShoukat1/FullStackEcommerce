import { apiClient } from "@/hooks/ApiClient"



const backendUrl = process.env.NEXT_PUBLIC_ORDERS_SERVICE_URL || 'http://localhost:3011'

export async function getAllOrders() {
    return apiClient(`${backendUrl}/all-orders`, {
        method: "GET",
    });
}