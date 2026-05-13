import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllProducts } from "@/services/product.service";
import { ProductDTO } from "@repo/shared";
const ProductsPage = async () => {


  const data: ProductDTO[] = await getAllProducts();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Products</h1>
      </div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default ProductsPage;