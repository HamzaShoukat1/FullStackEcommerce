
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllUsers } from "@/services/admin.service";
import { cookies } from "next/dist/server/request/cookies";
export default async function UsersPage() {
  let cookiesAuth = await cookies();
  const authToken = cookiesAuth.get("accessToken")?.value;

  if (!authToken) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-red-500">Unauthorized</h1>
        <p className="text-muted-foreground mt-2">You must be logged in to view this page.</p>
      </div>
    );
  }
  let data = []
  try {
    data = await getAllUsers(authToken);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }


  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};
