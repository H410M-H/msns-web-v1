
"use client";

import {
  type ColumnDef,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import Link from "next/link";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SessionDeletionDialog } from "../forms/annualSession/SessionDeletion";
import { SessionCreationDialog } from "../forms/annualSession/SessionCreation";

const columns: ColumnDef<SessionProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sessionName",
    header: "Session Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("sessionName")}</div>,
  },
  {
    accessorKey: "SessionFrom",
    header: "Session Start Date",
    cell: ({ row }) => <div>{row.getValue("sessionFrom")}</div>,
  },
  {
    accessorKey: "sessionTo",
    header: "Session End Date",
    cell: ({ row }) => <div>{row.getValue("sessionTo")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/bicycle/product/${row.original.sessionId}`}>
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const SessionTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<SessionProps[]>([]);

  const sessionsData = api.session.getSessions.useQuery();

  useMemo(() => {
    if (sessionsData.data) setData(sessionsData.data);
  }, [sessionsData.data]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
<div className="w-full">
  <div className="flex items-center justify-between gap-2 py-4">
    <div className="flex items-center gap-2">
      <Button
        onClick={() => table.toggleAllRowsSelected()}
        variant="outline"
        className="bg-purple-500 text-white hover:bg-purple-600"
      >
        {table.getIsAllRowsSelected() ? "Deselect All" : "Select All"}
      </Button>
      <Input
        placeholder="Search name"
        value={(table.getColumn("className")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("className")?.setFilterValue(event.target.value)
        }
        className="max-w-sm border-blue-500"
      />
    </div>
    <div className="flex items-center gap-2">
      <SessionCreationDialog />
      <Button
        variant="outline"
        className="bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => sessionsData.refetch()}
      >
        Refresh
      </Button>
      <SessionDeletionDialog
        sessionIds={table.getSelectedRowModel().rows.map(
          (row) => row.original.sessionId
        )}
      />
    </div>
  </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {table.getRowModel().rows?.length ? (
    table.getRowModel().rows.map((row) => (
      <div 
        key={row.id} 
        className="p-4 border rounded-md shadow-md flex flex-col justify-between bg-gradient-to-r from-blue-200 to-purple-200 hover:shadow-lg transition-shadow"
        data-state={row.getIsSelected() && "selected"}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {row.original.sessionName}
            </h3>
          </div>
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            {row.original.sessionFrom}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {row.original.sessionTo}
        </p>
        <div className="mt-2 flex justify-between gap-2">
          <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600">View Details</Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600">Edit</Button>
            <Button variant="destructive" size="sm" className="bg-red-500 text-white hover:bg-red-600">Delete</Button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center py-4">
      No results.
    </div>
  )}
</div>
  <div className="flex items-center justify-end space-x-2 py-4">
    <div className="flex-1 text-sm text-gray-600">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-indigo-500 text-white hover:bg-indigo-600"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-indigo-500 text-white hover:bg-indigo-600"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  </div>
</div>
  );
};
