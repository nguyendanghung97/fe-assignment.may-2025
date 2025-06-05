import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EFormType, EUserTableColumnId } from '@/utils/enum';
import type { Table } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { FilterIcon } from '@/assets/svgs';
import { Separator } from '@/components/ui/separator';
import { useCallback } from 'react';

export type IFieldFilter = {
    id: string;
    label: string;
    type: 'select' | 'input' | 'radio';
};

type AppFilterProps<TData> = {
    table: Table<TData>;
    fields: IFieldFilter[];
    className?: string;
};

export const ALL_VALUE = '__all';

const AppFilter = <TData,>({ className, table, fields }: AppFilterProps<TData>) => {
    const getOptions = useCallback(
        (key: string) => Array.from(new Set(table.options.data.map((row) => String(row[key as keyof TData])))),
        [table.options.data],
    );
    const renderControl = (id: string, type: string) => {
        const column = table.getColumn(id);
        const options = getOptions(id);
        switch (type) {
            case EFormType.SELECT:
                return (
                    <Select
                        value={(column?.getFilterValue() as string) ?? ''}
                        onValueChange={(v) => column?.setFilterValue(v)}
                    >
                        <SelectTrigger className="w-full text-[#4A4B57]">
                            <SelectValue placeholder="Select" className="data-[placeholder]:text-red-500" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ALL_VALUE}>All</SelectItem>
                            {options &&
                                options.map((opt) => (
                                    <SelectItem key={opt} value={opt}>
                                        {opt}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                );

            case EFormType.RADIO:
                return (
                    <RadioGroup
                        value={(column?.getFilterValue() as string) ?? ALL_VALUE}
                        onValueChange={(v) => column?.setFilterValue(v === ALL_VALUE ? undefined : v)}
                        className="flex flex-col gap-4 text-[#4A4B57]"
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value={ALL_VALUE} id={ALL_VALUE} />
                            <Label htmlFor={ALL_VALUE} className="text-sm font-normal">
                                All
                            </Label>
                        </div>
                        {options.map((opt) => (
                            <div key={opt} className="flex items-center gap-3">
                                <RadioGroupItem value={opt} id={opt} />
                                <Label htmlFor={opt} className="text-sm font-normal">
                                    {opt}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            default: // "input"
                return (
                    <Input
                        id={id}
                        onKeyDown={(e) => {
                            // Chỉ cho nhập số
                            if (id === EUserTableColumnId.PHONE && !/[0-9]|Backspace|Arrow/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        maxLength={id === EUserTableColumnId.PHONE ? 10 : undefined} // Giới hạn ký tự
                        value={(column?.getFilterValue() as string) ?? ''}
                        onChange={(e) => {
                            column?.setFilterValue(e.target.value);
                        }}
                        placeholder="Input"
                    />
                );
        }
    };
    return (
        <div className={cn('w-full', className)}>
            <div className="py-2.5 flex items-center justify-between relative">
                <h3 className="text-base font-medium">FILTER</h3>
                <FilterIcon />
                <Separator className="absolute bottom-0" />
            </div>
            {fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                    <Label htmlFor={field.id} className="text-sm font-semibold text-[#0C0C0D]">
                        {field.label}
                    </Label>
                    {renderControl(field.id, field.type)}
                </div>
            ))}
        </div>
    );
};

export default AppFilter;
