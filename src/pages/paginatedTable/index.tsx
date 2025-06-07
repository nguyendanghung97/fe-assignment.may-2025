import DataTable from '@/components/common/data-table';
import customersData from '@/data/customer.json';
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { INITIAL_PAGE_SIZE } from '../user-management';
import { tableCostumerColumns } from './columns';
import AppFilter from '@/components/common/AppFilter';
import { ECustomerColumn, EFormType } from '@/utils/enum';
import { useState } from 'react';
import { useSyncTableWithUrlParams } from '@/hooks/useSyncTableWithUrlParams';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowsClockWiseICon } from '@/assets/svgs';

const Page = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const customersTable = useReactTable({
        data: customersData,
        columns: tableCostumerColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: INITIAL_PAGE_SIZE, // default page size
            },
        },
    });

    useSyncTableWithUrlParams({ table: customersTable, initialPageSize: INITIAL_PAGE_SIZE });

    const allVisibleUsers = customersTable.getPrePaginationRowModel().rows.map((row) => row.original);

    console.log({
        pageIndex: customersTable.getState().pagination.pageIndex,
        pageCount: customersTable.getPageCount(),
        rowCount: customersTable.getFilteredRowModel().rows.length,
    });

    return (
        <div className="flex">
            <section className="w-1/5 p-4 relative shrink-0 hidden md:flex flex-col justify-between gap-4">
                <AppFilter
                    className="flex flex-col gap-4"
                    table={customersTable}
                    fields={[
                        { id: ECustomerColumn.FULL_NAME, label: ECustomerColumn.FULL_NAME, type: EFormType.INPUT },
                        { id: ECustomerColumn.COMPANY, label: ECustomerColumn.COMPANY, type: EFormType.SELECT },
                        { id: ECustomerColumn.EMAIL, label: ECustomerColumn.EMAIL, type: EFormType.INPUT },
                        { id: ECustomerColumn.COUNTRY, label: ECustomerColumn.COUNTRY, type: EFormType.SELECT },
                    ]}
                />
                <Button
                    variant="outline"
                    className="text-sm font-medium text-[#4A4B57] h-8"
                    onClick={() => {
                        setColumnFilters([]);
                        setSorting([]);
                        customersTable.getState().pagination.pageSize = INITIAL_PAGE_SIZE;
                    }}
                >
                    Export Data
                </Button>
                <Separator className="absolute right-0 top-0" orientation="vertical" />
            </section>
            <div className="w-full">
                <h3 className="h-14 px-4 flex items-center gap-2.5 text-xl text-[#294172] font-bold">
                    {allVisibleUsers.length} CUSTOMERS <ArrowsClockWiseICon />
                </h3>
                <Separator />

                <DataTable className="flex-1 h-[calc(100dvh-4rem)]" table={customersTable} showPagination />
            </div>
        </div>
    );
};

export default Page;
