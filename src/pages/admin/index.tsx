import { ArrowsClockWiseICon } from '@/assets/svgs';
import DataTable from '@/components/common/data-table';
import { Separator } from '@/components/ui/separator';

import { users } from './dataTable';
import { useState } from 'react';
import { tableUsersColumns } from './columnsTables';

import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type SortingState,
} from '@tanstack/react-table';
import SectionFilter from './filter';
import InfoSections from './info';
import { useSyncTableWithUrlParams } from '@/hooks/useSyncTableWithUrlParams';

export const INITIAL_PAGE_SIZE = 5;

const Page = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const userTable = useReactTable({
        data: users,
        columns: tableUsersColumns,
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

    useSyncTableWithUrlParams({ table: userTable, initialPageSize: INITIAL_PAGE_SIZE });

    const allVisibleUsers = userTable.getPrePaginationRowModel().rows.map((row) => row.original);

    return (
        <div className="flex">
            <section className="w-64 p-4 relative shrink-0">
                <SectionFilter table={userTable} className="flex flex-col gap-4" />
                <Separator className="absolute right-0 top-0" orientation="vertical" />
            </section>
            <section className="min-h-[calc(100dvh-4rem)] flex flex-col">
                <div className="py-0.5">
                    <h3 className="h-14 px-4 flex items-center gap-2.5 text-xl text-[#294172] font-bold">
                        {allVisibleUsers.length} USERS <ArrowsClockWiseICon />
                    </h3>
                </div>
                <Separator />
                <DataTable table={userTable} showPagination />
            </section>
            <section className="flex-1 relative">
                <Separator className="absolute" orientation="vertical" />
                <InfoSections />
            </section>
        </div>
    );
};

export default Page;
