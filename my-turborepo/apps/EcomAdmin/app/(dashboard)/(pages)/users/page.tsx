"use client"

import {columns } from "./columns";
import { DataTable } from "@/app/(dashboard)/orders/data-table";
import {useQuery} from "@tanstack/react-query";
import { getAllUsers } from "@/services/user.service";
const UsersPage =  () => {
  const {data} = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default UsersPage;