"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
// 1. Import useQueryClient
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/shared/TablePagination";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import { deleteProducts } from "@/services/product.service";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data = []
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();
  
  // 2. Initialize the queryClient
  const queryClient = useQueryClient(); 

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const { mutate: deleteProductMutation, isPending } = useMutation<
    void,
    Error,
    string[]
  >({
    mutationFn: async (userIds) => {
      await Promise.all(userIds.map(id => deleteProducts(id)));
    },
    onSuccess: () => {
      toast.success("Product has been deleted successfully!");
      
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
      
      setRowSelection({}); 
      
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete product");
    }
  });

  const handleDelete = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const userIds = selectedRows.map(row => (row.original as any).id);
    if (userIds.length > 0) {
      deleteProductMutation(userIds);
    } else {
      toast.error("Please select at least one product to delete");
    }
  };

  return (
    <div className="rounded-md border">
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex justify-end">
          <button 
            className="flex items-center gap-2 bg-red-500 text-white px-2 py-1 text-sm rounded-md m-4 cursor-pointer disabled:opacity-50"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="w-4 h-4"/>
            {isPending ? "Deleting..." : "Delete Product(s)"}
          </button>
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
