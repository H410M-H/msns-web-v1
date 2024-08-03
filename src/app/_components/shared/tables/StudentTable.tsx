
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
import { CSVUploadDialog } from "../forms/student/FileInput";
const columns: ColumnDef<StudentProps>[] = [
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
    accessorKey: "studentId",
    header: "Student ID",
    cell: ({ row }) => <div>{row.getValue("studentId")}</div>,
  },

  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "fatherName",
    header: "Father Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("fatherName")}</div>,
  },
  {
    accessorKey: "studentBFormNumber",
    header: "Student B-Form #",
    cell: ({ row }) => <div>{row.getValue("studentBFormNumber")}</div>,
  },
  {
    accessorKey: "fatherCNIC",
    header: "Father CNIC",
    cell: ({ row }) => <div>{row.getValue("fatherCNIC")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "dateOfBirthNumbers",
    header: "Date of Birth",
    cell: ({ row }) => <div>{row.getValue("dateOfBirthNumbers")}</div>,
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile No",
    cell: ({ row }) => <div>{row.getValue("mobileNo")}</div>,
  },
  {
    accessorKey: "religion",
    header: "Religion",
    cell: ({ row }) => <div>{row.getValue("religion")}</div>,
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => <div>{row.getValue("grade")}</div>,
  },
  {
    accessorKey: "session",
    header: "Session",
    cell: ({ row }) => <div>{row.getValue("session")}</div>,
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
              <Link href={`/dashboard/bicycle/product/${row.original.studentId}`}>
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const StudentTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<StudentProps[]>([]);

  const studentsData = api.student.getStudents.useQuery();

  useMemo(() => {
    if (studentsData.data) setData(studentsData.data);
  }, [studentsData.data]);


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
      
      <Button variant={'outline'} type="button" onClick={()=>studentsData.refetch()}>
        Refresh
      </Button>
      <Button 
        variant="destructive" 
        type="button" 
        onClick={()=>studentsData.refetch()}>
        Delete
      </Button>
      <CSVUploadDialog/>
      <Button  type="button" onClick={()=>studentsData.refetch()} asChild>
        <Link href={'/registration/student/create'}>Create</Link>
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
