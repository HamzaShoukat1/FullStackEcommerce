
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllProducts } from "@/services/product.service";
import { ProductDTO } from "@repo/shared";
export default async function ProductsPage() {
  let products: ProductDTO[] = [];
  try {
    products = await getAllProducts();

  } catch (error) {
    console.error("Failed to fetch products:", error);

  }
  if (!products || products.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-semibold">No Products Found</h1>
        <p className="text-muted-foreground mt-2">There are currently no products available.</p>
      </div>
    );
  }
  

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Products</h1>
      </div>
      <DataTable columns={columns} data={products ?? []} />
    </div>
  );
};
