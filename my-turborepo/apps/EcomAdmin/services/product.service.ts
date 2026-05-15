import { apiClient } from "@/hooks/ApiClient";


const backendUrl = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:3007';


export async function getAllProducts() {
    return apiClient(`${backendUrl}/products`, {
        method: "GET",
        next:{revalidate:40}
    });


}