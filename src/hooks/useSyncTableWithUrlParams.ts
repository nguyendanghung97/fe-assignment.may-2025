import { EURL_PAGINATION_KEYS } from '@/utils/enum';
import type { Table } from '@tanstack/react-table';
import { useEffect, useRef } from 'react';
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

    // Cờ để đảm bảo ta chỉ đồng bộ URL → table 1 lần duy nhất lúc mount (hoặc URL thay đổi thực sự bên ngoài)
    const isFirstLoad = useRef(true);

    // 1. Load filter & pagination từ URL vào table
    useEffect(() => {
        if (isFirstLoad.current) {
            // Đặt filter cho từng column từ URL
            table.getAllColumns().forEach((col) => {
                const value = searchParams.get(col.id);
                if (value) {
                    col.setFilterValue(value);
                }
            });

            // Đặt pageIndex từ URL (đã -1 vì TanStack Table pageIndex bắt đầu từ 0)
            const page = Number(searchParams.get(EURL_PAGINATION_KEYS.PAGE));
            if (page && !isNaN(page)) {
                table.setPageIndex(page - 1);
            }

            // Đặt pageSize từ URL hoặc mặc định nếu không có
            const pageSize = Number(searchParams.get(EURL_PAGINATION_KEYS.PAGE_SIZE));
            if (pageSize && !isNaN(pageSize)) {
                table.setPageSize(pageSize);
            } else {
                table.setPageSize(initialPageSize);
            }

            // Đánh dấu đã sync lần đầu, tránh reset pageIndex ở những lần render tiếp theo
            isFirstLoad.current = false;
        }
    }, [table, searchParams, initialPageSize]);

    // 2. Cập nhật URL khi filter/pagination thay đổi
    useEffect(() => {
        // Chỉ cập nhật URL khi đã đồng bộ lần đầu (không update trong lần đầu để tránh vòng lặp vô hạn)
        if (!isFirstLoad.current) {
            const newParams: Record<string, string> = {
                [EURL_PAGINATION_KEYS.PAGE]: (paginationMemo.pageIndex + 1).toString(),
                [EURL_PAGINATION_KEYS.PAGE_SIZE]: paginationMemo.pageSize.toString(),
            };
            filtersMemo.forEach((f: any) => {
                if (f.value) newParams[f.id] = f.value;
            });

            setSearchParams(newParams, { replace: true });
        }
    }, [filtersMemo, paginationMemo, setSearchParams, table]);
};
