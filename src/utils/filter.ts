import type { Row } from '@tanstack/react-table';

export const filterByInput = <TData>(row: Row<TData>, id: string, value: string): boolean => {
    if (!value) return true;
    return row.getValue<string>(id).toLowerCase().includes(value.toLowerCase());
};

export const filterBySelect = <TData>(row: Row<TData>, id: string, value: string): boolean => {
    if (!value) return true;
    return row.getValue<string>(id) === value;
};

export const filterByRatioGroup = <TData>(row: Row<TData>, id: string, value: string): boolean => {
    if (!value) return true;
    return row.getValue<string>(id) === value;
};
