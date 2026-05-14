"use client"
import { DataTable } from "./data-table";
import { columns } from './columns';
import { getAllOrders } from "@/services/order.service";
import { OrderDTO } from "@repo/shared";
import { useQuery } from "@tanstack/react-query"



const OrderPage =  () => {
  const { data, isLoading } = useQuery<OrderDTO[]>({
    queryKey: ["orders"],
    queryFn: getAllOrders
  })
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  )

}

export default OrderPage;