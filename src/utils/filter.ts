import { ALL_VALUE } from '@/components/common/AppFilter';
import type { Row } from '@tanstack/react-table';

export const filterByInput = <TData>(row: Row<TData>, id: string, value: string): boolean => {
    if (!value) return true;
    const rowValue = row.getValue<string>(id);
    // Nếu là dạng số (điện thoại)
    if (typeof rowValue === 'number') {
        return String(rowValue ?? '').startsWith(value);
    } else {
        return row.getValue<string>(id).toLowerCase().includes(value.toLowerCase());
    }
};

export const filterBySelect = <TData>(row: Row<TData>, id: string, value: string): boolean => {
    if (!value || value === ALL_VALUE) return true;
    return row.getValue<string>(id) === value;
};

export const filterByRatioGroup = <TData>(row: Row<TData>, id: string, value: string): boolean => {
    if (!value) return true;
    return row.getValue<string>(id) === value;
};
