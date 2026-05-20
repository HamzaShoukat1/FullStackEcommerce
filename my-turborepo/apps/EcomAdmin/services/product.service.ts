import { apiClient } from "@/hooks/ApiClient";


const backendUrl = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:3007';


export async function getAllProducts() {
    return apiClient(`${backendUrl}/products`, {
        method: "GET",
        next: { revalidate: 40 }
    });


};
export async function createProduct(data: { name: string, price: number, description: string, shortDescription: string, sizes: string[], colors: string[], images: Record<string, string>, categorySlug: string }) {
    return apiClient(`${backendUrl}/products`, {
        method: "POST",
        body: JSON.stringify(data)
    });

}



export async function getProductsinHome() {
    return apiClient(`${backendUrl}/products?limit=5`, {
        method: "GET",
        next: { revalidate: 60 }
    });

}
export async function createCategory(data: { name: string, slug: string }) {
    return apiClient(`${backendUrl}/categories`, {
        method: "POST",
        body: JSON.stringify(data)
    });



}
export async function deleteProducts(ids:string ) {
    return apiClient(`${backendUrl}/products/${ids}`, {
        method: "DELETE",
    });

}``
export async function getCategories() {
    return apiClient(`${backendUrl}/categories`, {
        method: "GET",
        next: { revalidate: 60 }
    });

}