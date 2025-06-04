import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { flexRender, type Table as ReactTableInstance } from '@tanstack/react-table';
import AppPagination from './AppPagination';
import { useEffect } from 'react';

interface DataTableProps<TData> {
    className?: string;
    showPagination?: boolean;
    table: ReactTableInstance<TData>;
    initialPageSize?: number;
}

const DataTable = <TData,>({ table, className, showPagination = false, initialPageSize }: DataTableProps<TData>) => {
    // Tự động ẩn các cột có enableHiding === true
    useEffect(() => {
        table.getAllColumns().forEach((column) => {
            const shouldHide = column.columnDef.enableHiding === true;
            if (shouldHide && column.getIsVisible()) {
                column.toggleVisibility(false);
            }
        });
    }, [table]);
    return (
        <div className={cn('h-full flex flex-col', className)}>
            <Table className="border text-sm text-[#111928]">
                <TableHeader className="h-[52px] bg-[#DAE6EF] text-[#111928]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="px-4">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="h-16">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="px-4">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {showPagination && (
                <>
                    <div className="flex-1"></div>
                    <AppPagination table={table} initialPageSize={initialPageSize} />
                </>
            )}
        </div>
    );
};

export default DataTable;
