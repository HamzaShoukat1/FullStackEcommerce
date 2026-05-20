import { apiClient } from "@/app/utils/apiClient";

const backendUrl = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || "http://localhost:3000";

export async function getProducts({ category, sort, search, params }: { category?: string, sort?: string, search?: string, params?: "homepage" | "products" }) {

    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (search) query.append("search", search);

    if (sort) {
        query.append("sort", sort);
    } else {
        query.append("sort", "newest");
    }


    if (params === "homepage") {
        query.append("limit", "8");
    }




    return apiClient(`${backendUrl}/products?${query.toString()}`, {
        method: "GET",
    });
};

export async function getProductById(id: string) {
    return apiClient(`${backendUrl}/products/${id}`, {
        method: "GET",
    });
}