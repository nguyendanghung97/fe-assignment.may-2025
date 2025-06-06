import type { ColumnDef } from '@tanstack/react-table';
import type { ILoan, IUser } from './dataTable';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileTextICon } from '@/assets/svgs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { filterByInput, filterByRatioGroup, filterBySelect } from '@/utils/filter';
import { ArrowUpDown } from 'lucide-react';
import { toggleBasicSorting } from '@/utils/sort';
import { ELoanTableColumnId, EUserTableColumnId } from '@/utils/enum';
import { Button } from '@/components/ui/button';
import { formatPhoneNumber } from '@/utils/format';

export const tableUsersColumns: ColumnDef<IUser>[] = [
    {
        id: EUserTableColumnId.SELECT,
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
        accessorKey: EUserTableColumnId.USER_INFO,
        header: () => {
            return (
                <div className="flex flex-col">
                    <span>User Name</span>
                    <span>User ID</span>
                </div>
            );
        },
        cell: ({ row }) => {
            const { userId, username, sex, avatar } = row.original;
            return (
                <div className="flex items-center gap-4">
                    <Avatar className="w-9 h-9">
                        <AvatarImage src={avatar} className="object-cover" />
                        <AvatarFallback>CN1</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col h-11 justify-between">
                        <span className="font-medium text-[#111928]">
                            {sex === 'male' ? `Mr. ${username}` : `Ms. ${username}`}
                        </span>
                        <span className="text-[#637381]">{userId}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: EUserTableColumnId.USERNAME,
        enableHiding: true, // Cho phép ẩn cột
        filterFn: filterBySelect,
    },
    {
        accessorKey: EUserTableColumnId.USER_ID,
        enableHiding: true,
        filterFn: filterByInput,
    },
    {
        accessorKey: EUserTableColumnId.CONTACT,
        // header: 'Contact Info',
        accessorFn: (row) => row.email,
        enableSorting: true,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => toggleBasicSorting(column)}
                    className="flex items-center gap-2 hover:bg-[#DAE6EF]/50"
                >
                    Contact Info
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },

        cell: ({ row }) => {
            const { phone, email } = row.original;
            return (
                <div className="flex flex-col text-[#111928] h-11 justify-between">
                    <span>{formatPhoneNumber(phone.toString())}</span>
                    <span>{email}</span>
                </div>
            );
        },
    },
    {
        accessorKey: EUserTableColumnId.PHONE,
        enableHiding: true, // Cho phép ẩn cột
        filterFn: filterByInput,
    },
    {
        accessorKey: EUserTableColumnId.EMAIL_ADDRESS,
        enableHiding: true,
        filterFn: filterByInput,
    },
    {
        accessorKey: EUserTableColumnId.TYPE,
        header: 'Type',
        filterFn: filterBySelect,
    },
    {
        accessorKey: EUserTableColumnId.EXPERIENCE,
        // header: 'Experience',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => toggleBasicSorting(column)}
                    className="flex items-center gap-2 hover:bg-[#DAE6EF]/50"
                >
                    Experience
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const { experience } = row.original;
            return <span>{experience} years</span>;
        },
    },
    {
        accessorKey: EUserTableColumnId.STATUS,
        header: 'Status',
        cell: ({ row }) => {
            const { status } = row.original;
            return (
                <span
                    className={cn(
                        '!h-5 px-2.5 p-2.5 bg-[#F6FFED] rounded-sm flex items-center uppercase w-fit font-medium',
                        status === 'Inactive' ? 'text-red-300' : 'text-[#43A047]',
                    )}
                >
                    {status}
                </span>
            );
        },
        filterFn: filterByRatioGroup,
    },
];

export const tableLoanDocumentsColumns: ColumnDef<ILoan>[] = [
    { id: ELoanTableColumnId.INDEX, header: 'Index', cell: ({ row }) => <span>0{row.index + 1}</span> },
    {
        accessorKey: 'loanInfo', // key phụ, không nhất thiết phải khớp với data
        // header: 'User Info',
        header: () => {
            return (
                <div className="flex flex-col">
                    <span>Borrower Name</span>
                    <span>Loan ID</span>
                </div>
            );
        },
        cell: ({ row }) => {
            const { borrowerName, loanId, sex } = row.original;
            return (
                <div className="flex flex-col h-11 justify-between">
                    <span className="font-medium text-[#111928]">
                        {sex === 'male' ? `Mr. ${borrowerName}` : `Ms. ${borrowerName}`}
                    </span>
                    <span className="text-[#637381]">#{loanId}</span>
                </div>
            );
        },
    },
    {
        accessorKey: ELoanTableColumnId.LENDER_AND_RATE,
        header: () => {
            return (
                <div className="flex flex-col">
                    <span>Lender</span>
                    <span>Interest Rate</span>
                </div>
            );
        },
        cell: ({ row }) => {
            const aprConversionRate: number = 1.028;
            const unitConvert = 'APR';
            const { lender, interestRate } = row.original;
            return (
                <div className="flex flex-col h-11 justify-between">
                    <span className="font-medium text-[#111928]">{lender}</span>
                    <span className="text-[#637381]">
                        {interestRate}% ({interestRate * aprConversionRate}% {unitConvert})
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: ELoanTableColumnId.PROCESS,
        header: 'Process',
        cell: ({ row }) => {
            const { process } = row.original;
            return (
                <div className="flex items-center gap-2.5">
                    <Progress className="w-20 h-1.5 border border-[#294172] bg-transparent" value={process} />
                    <span className="text-[#294172]">{process}%</span>
                </div>
            );
        },
    },
    {
        accessorKey: ELoanTableColumnId.STATUS,
        header: 'Status',
        cell: ({ row }) => {
            const { status } = row.original;
            return (
                <div className="!h-5 px-2.5 text-xs text-[#2979FF] bg-[#E6F7FF] rounded-sm flex items-center uppercase w-fit font-medium">
                    {status}
                </div>
            );
        },
    },
    {
        id: ELoanTableColumnId.ACTIONS,
        header: 'Actions',
        cell: () => {
            return <FileTextICon />;
        },
    },
];
