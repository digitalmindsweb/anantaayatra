import * as React from "react"
import { cn } from "@/lib/utils"

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, className, emptyMessage = "No results found." }: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-auto rounded-md border border-slate-200 dark:border-slate-800", className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <tr className="border-b border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800">
            {columns.map((col, i) => (
              <th key={i} className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0 bg-white dark:bg-slate-950">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-4 align-middle text-slate-800 dark:text-slate-200">
                    {col.cell ? col.cell(row) : (col.accessorKey ? String(row[col.accessorKey]) : null)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
