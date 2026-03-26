import {columns } from "./columns";
import { DataTable } from "@/app/payments/data-table";
import { User } from "@/app/Validations";
const getData = async (): Promise<User[]> => {
  return [
    {
      id: "728ed521",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "active",
      fullName: "John Doe",
      email: "johndoe@gmail.com",
    },
    {
      id: "728ed522",
      avatar: "https://i.pravatar.cc/150?img=2",
      status: "active",
      fullName: "Jane Doe",
      email: "janedoe@gmail.com",
    },
    {
      id: "728ed523",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "inactive",
      fullName: "Mike Galloway",
      email: "mikegalloway@gmail.com",
    },
    {
      id: "728ed524",
      avatar: "https://i.pravatar.cc/150?img=4",
      status: "inactive",
      fullName: "Minerva Robinson",
      email: "minerbarobinson@gmail.com",
    },
    {
      id: "728ed525",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "active",
      fullName: "Mable Clayton",
      email: "mableclayton@gmail.com",
    },
    {
      id: "728ed526",
      avatar: "https://i.pravatar.cc/150?img=6",
      status: "active",
      fullName: "Nathan McDaniel",
      email: "nathanmcdaniel@gmail.com",
    },
    {
      id: "728ed527",
      avatar: "https://i.pravatar.cc/150?img=7",
      status: "active",
      fullName: "Myrtie Lamb",
      email: "myrtielamb@gmail.com",
    },
    {
      id: "728ed528",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "active",
      fullName: "Leona Bryant",
      email: "leonabryant@gmail.com",
    },
    {
      id: "728ed529",
      avatar: "https://i.pravatar.cc/150?img=9",
      status: "inactive",
      fullName: "Aaron Willis",
      email: "aaronwillis@gmail.com",
    },
    {
      id: "728ed52a",
      avatar: "https://i.pravatar.cc/150?img=10",
      status: "active",
      fullName: "Joel Keller",
      email: "joelkeller@gmail.com",
    },
    // continue same pattern...
  ];
};
const UsersPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UsersPage;