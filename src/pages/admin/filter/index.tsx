import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EUserTableColumnId } from '@/utils/enum';
import type { Table } from '@tanstack/react-table';
import type { IUser } from '../dataTable';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type SectionFilterProps = {
    table: Table<IUser>;
    className?: string;
};

export const ALL_VALUE = '__all';

const SectionFilter = ({ className, table }: SectionFilterProps) => {
    const usernames = useMemo(
        () => Array.from(new Set(table.options.data.map((user) => user.username))),
        [table.options.data],
    );

    const statuss = useMemo(
        () => Array.from(new Set(table.options.data.map((user) => user.status))),
        [table.options.data],
    );
    return (
        <div className={cn('w-full', className)}>
            {/* Username Select */}
            <Select
                value={(table.getColumn(EUserTableColumnId.USERNAME)?.getFilterValue() as string) ?? ALL_VALUE}
                onValueChange={(value) => {
                    table
                        .getColumn(EUserTableColumnId.USERNAME)
                        ?.setFilterValue(value === ALL_VALUE ? undefined : value);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_VALUE}>All</SelectItem>
                    {usernames.map((name) => (
                        <SelectItem key={name} value={name}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input
                value={(table.getColumn(EUserTableColumnId.USER_ID)?.getFilterValue() as string) ?? ''}
                onChange={(e) => table.getColumn(EUserTableColumnId.USER_ID)?.setFilterValue(e.target.value)}
                placeholder="Input"
            />

            <RadioGroup
                value={(table.getColumn(EUserTableColumnId.STATUS)?.getFilterValue() as string) ?? ALL_VALUE}
                onValueChange={(value) =>
                    table.getColumn(EUserTableColumnId.STATUS)?.setFilterValue(value === ALL_VALUE ? undefined : value)
                }
                className="flex flex-col gap-4"
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value={ALL_VALUE} id="r1" />
                    <Label htmlFor="r1">All</Label>
                </div>
                {statuss.map((name) => (
                    <div key={name} className="flex items-center gap-3">
                        <RadioGroupItem value={name} id={name} />
                        <Label htmlFor={name}>{name}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default SectionFilter;
