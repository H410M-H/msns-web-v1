
"use client";


import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
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
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { type ColumnDef, type SortingState, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
const columns: ColumnDef<EmployeeProps>[] = [
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
    accessorKey: "employeeName",
    header: "Employee Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("employeeName")}</div>,
  },
  {
    accessorKey: "fatherName",
    header: "Father Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("fatherName")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: ({ row }) => <div>{row.getValue("dob")}</div>,
  },
  {
    accessorKey: "doj",
    header: "Session",
    cell: ({ row }) => <div>{row.getValue("doj")}</div>,
  },
  {
    accessorKey: "cnic",
    header: "Employee CNIC #",
    cell: ({ row }) => <div>{row.getValue("cnic")}</div>,
  },
  {
    accessorKey: "fcnic",
    header: "Father CNIC",
    cell: ({ row }) => <div>{row.getValue("fcnic")}</div>,
  },
  {
    accessorKey: "religion",
    header: "Religion",
    cell: ({ row }) => <div>{row.getValue("religion")}</div>,
  },
  {
    accessorKey: "contact",
    header: "Mobile No",
    cell: ({ row }) => <div>{row.getValue("contact")}</div>,
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
              <Link href={`/dashboard/bicycle/product/${row.original.employeeId}`}>
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const EmployeeTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<EmployeeProps[]>([]);

  const employeesData = api.employee.getEmployees.useQuery();

  useMemo(() => {
    if (employeesData.data) setData(employeesData.data);
  }, [employeesData.data]);


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
  <div className="flex items-center justify-between m-2">
    <Input
      placeholder="Search name"
      value={
        (table.getColumn("className")?.getFilterValue() as string) ?? ""
      }
      onChange={(event) =>
        table.getColumn("className")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
    <div className="flex items-center gap-3">
      
      <Button variant={'outline'} type="button" onClick={()=>employeesData.refetch()}>
        Refresh
      </Button>
      <Button 
        variant="destructive" 
        type="button" 
        onClick={()=>employeesData.refetch()}>
        Delete
      </Button>
      <Button  type="button" onClick={()=>employeesData.refetch()} asChild>
        <Link href={'/registration/faculty/create'}>Create</Link>
      </Button>
    </div>
  </div>
  <div className="rounded-md border m-2">
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
                        header.getContext(),
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
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
  <div className="flex items-center justify-end space-x-2 m-6">
    <div className="flex-1 text-sm text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
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
