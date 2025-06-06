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
import InfoSections from './info';
import { useSyncTableWithUrlParams } from '@/hooks/useSyncTableWithUrlParams';
import AppFilter from '@/components/common/AppFilter';
import { EFormType, EUserTableColumnId } from '@/utils/enum';
import { Button } from '@/components/ui/button';

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
            <section className="w-52 lg:w-64 p-4 relative shrink-0 hidden md:flex flex-col justify-between gap-4">
                <AppFilter
                    className="flex flex-col gap-4"
                    table={userTable}
                    fields={[
                        { id: EUserTableColumnId.USERNAME, label: 'User name', type: EFormType.SELECT },
                        { id: EUserTableColumnId.USER_ID, label: 'User ID', type: EFormType.INPUT },
                        { id: EUserTableColumnId.TYPE, label: 'User type', type: EFormType.SELECT },
                        { id: EUserTableColumnId.PHONE, label: 'Phone number', type: EFormType.INPUT },
                        { id: EUserTableColumnId.EMAIL_ADDRESS, label: 'Email address', type: EFormType.INPUT },
                        { id: EUserTableColumnId.STATUS, label: 'Status', type: EFormType.RADIO },
                    ]}
                />
                <Button
                    variant="outline"
                    className="text-sm font-medium text-[#4A4B57] h-8"
                    onClick={() => {
                        setColumnFilters([]);
                        setSorting([]);
                        userTable.getState().pagination.pageSize = INITIAL_PAGE_SIZE;
                        console.log('allVisibleUsers', allVisibleUsers);
                    }}
                >
                    Export Data
                </Button>
                <Separator className="absolute right-0 top-0" orientation="vertical" />
            </section>
            <div className="flex-1 flex min-h-[calc(100dvh-4rem)] overflow-x-hidden">
                <section className="flex-1 overflow-hidden flex flex-col">
                    <div className="py-0.5">
                        <h3 className="h-14 px-4 flex items-center gap-2.5 text-xl text-[#294172] font-bold">
                            {allVisibleUsers.length} USERS <ArrowsClockWiseICon />
                        </h3>
                    </div>
                    <Separator />
                    <DataTable table={userTable} showPagination />
                </section>
                <section className="hidden lg:block flex-1 overflow-hidden relative">
                    <Separator className="absolute" orientation="vertical" />
                    <InfoSections />
                </section>
            </div>
        </div>
    );
};

export default Page;
