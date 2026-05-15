import { DataTable } from "./data-table";
import { columns } from './columns';
import { getAllOrders } from "@/services/order.service";
import { OrderDTO } from "@repo/shared";
import { cookies } from "next/headers";



export default async function OrderPage() {
  const CookieStore = await cookies()
  const authToken = CookieStore.get("accessToken")?.value;

  if (!authToken) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-red-500">Unauthorized</h1>
        <p className="text-muted-foreground mt-2">You must be logged in to view this page.</p>
      </div>
    );
  }
  let data: OrderDTO[] = [];
  try {
    data = await getAllOrders(authToken);
    
  } catch (error) {
        console.error("Failed to fetch orders:", error);
  }


  return (
    <div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  )

}
