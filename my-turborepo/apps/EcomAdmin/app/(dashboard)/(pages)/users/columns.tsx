"use client";

import { User } from "@/app/Validations";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import getFormattedCreationDate from "@/app/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";



export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },


    {
    accessorKey: "firstName",
    header: "firstName",
  },
    {
    accessorKey: "lastName",
    header: "lastName",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-40 justify-start"
        >
          Email
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("email");
      return <div className="truncate w-50">{email as string}</div>;
    },
  },



  // Harmonized Status Column
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      let colorClass = "bg-gray-300 text-gray-800";
      if (role === "ADMIN") colorClass = "bg-green-500/40 text-white";
      else if (role === "USER") colorClass = "bg-blue-500/40 text-white-900";

      return (
        <div
          className={cn(
            `p-1 rounded-md w-24 text-xs text-center `,
            colorClass
          )}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created ",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            createdAt === "ADMIN" && "bg-green-500/40",
            createdAt === "USER" && "bg-blue-500/40"
          )}
        >
          {getFormattedCreationDate(createdAt)}
        </div>
      );
    },
  },


  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/users/${user.id}`}>View customer</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];