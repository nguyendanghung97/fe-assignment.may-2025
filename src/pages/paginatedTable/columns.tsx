import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ECustomerColumn } from '@/utils/enum';
import { filterByInput, filterBySelect } from '@/utils/filter';
import { normalizePhone } from '@/utils/format';
import { toggleBasicSorting } from '@/utils/sort';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

type ICustomer = {
    Index: number;
    'Customer Id': string;
    'First Name': string;
    'Last Name': string;
    City: string;
    Company: string;
    Country: string;
    Email: string;
    'Phone 1': number | string;
    'Phone 2': number | string;
    'Subscription Date': string;
    Website: string;
};

export const tableCostumerColumns: ColumnDef<ICustomer>[] = [
    {
        id: ECustomerColumn.SELECT,
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="bg-white w-5 h-5"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="bg-white w-5 h-5"
            />
        ),
    },
    {
        id: ECustomerColumn.FULL_NAME,
        accessorFn: (row) => row['First Name'],
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => toggleBasicSorting(column)}
                    className="flex items-center gap-2 hover:bg-[#DAE6EF]/50"
                >
                    {ECustomerColumn.FULL_NAME}
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const data = row.original;
            const firstName = data[ECustomerColumn.FIRST_NAME];
            const lastName = data[ECustomerColumn.LAST_NAME];

            return `${firstName} ${lastName}`;
        },

        filterFn: (row, _columnId, filterValue) => {
            const data = row.original;
            const firstName = data[ECustomerColumn.FIRST_NAME] ?? '';
            const lastName = data[ECustomerColumn.LAST_NAME] ?? '';
            const fullName = `${firstName} ${lastName}`.toLowerCase();
            return fullName.includes(String(filterValue).toLowerCase());
        },
    },
    {
        id: ECustomerColumn.LOCATION,
        accessorFn: (row) => row.Country,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => toggleBasicSorting(column)}
                    className="flex items-center gap-2 hover:bg-[#DAE6EF]/50"
                >
                    {ECustomerColumn.LOCATION}
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const { City, Country } = row.original;
            return (
                <div>
                    {Country}, {City}
                </div>
            );
        },
    },
    {
        accessorKey: ECustomerColumn.COUNTRY,

        enableHiding: true,
        filterFn: filterBySelect,
    },
    {
        id: ECustomerColumn.CONTACT,
        accessorFn: (row) => normalizePhone(row['Phone 1']),
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => toggleBasicSorting(column)}
                    className="flex items-center gap-2 hover:bg-[#DAE6EF]/50"
                >
                    {ECustomerColumn.CONTACT}
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const data = row.original;
            const phone = data['Phone 1'];
            const email = data.Email;

            return (
                <div className="flex flex-col text-[#111928] h-11 justify-between">
                    <span>{phone.toString()}</span>
                    <span>{email}</span>
                </div>
            );
        },
    },
    {
        accessorKey: ECustomerColumn.EMAIL,
        enableHiding: true,
        filterFn: filterByInput,
    },
    {
        accessorKey: ECustomerColumn.COMPANY,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => toggleBasicSorting(column)}
                    className="flex items-center gap-2 hover:bg-[#DAE6EF]/50"
                >
                    {ECustomerColumn.COMPANY}
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        filterFn: filterBySelect,
    },
];
