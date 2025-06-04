import { EURL_PAGINATION_KEYS } from '@/utils/enum';
import type { Table } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseSyncTableWithUrlParamsProps<TData> = {
    table: Table<TData>;
    initialPageSize?: number;
};

export const useSyncTableWithUrlParams = <TData>({
    table,
    initialPageSize = 10,
}: UseSyncTableWithUrlParamsProps<TData>) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filtersMemo = table.getState().columnFilters;
    const paginationMemo = table.getState().pagination;

    // 1. Load filter & pagination từ URL vào table
    useEffect(() => {
        table.getAllColumns().forEach((col) => {
            const value = searchParams.get(col.id);
            if (value) col.setFilterValue(value);
        });

        table.setPageIndex(Number(searchParams.get(EURL_PAGINATION_KEYS.PAGE)) - 1);
        table.setPageSize(Number(searchParams.get(EURL_PAGINATION_KEYS.PAGE_SIZE) ?? initialPageSize.toString()));
    }, [table, searchParams, initialPageSize]);

    // 2. Cập nhật URL khi filter/pagination thay đổi
    useEffect(() => {
        const newParams: Record<string, string> = {
            [EURL_PAGINATION_KEYS.PAGE]: (paginationMemo.pageIndex + 1).toString(),
            [EURL_PAGINATION_KEYS.PAGE_SIZE]: paginationMemo.pageSize.toString(),
        };
        filtersMemo.forEach((f: any) => {
            if (f.value) newParams[f.id] = f.value;
        });

        setSearchParams(newParams, { replace: true });
    }, [filtersMemo, paginationMemo, setSearchParams, table]);
};
