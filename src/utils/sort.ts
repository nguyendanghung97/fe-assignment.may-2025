import type { Column } from '@tanstack/react-table';

// 'asc':ascending (tăng dần)
// 'asc':descending (giảm dần)
export const toggleBasicSorting = (column: Column<any>) => {
    column.toggleSorting(column.getIsSorted() === 'asc');
};
