import { BooksIcon, ChartIcon, ClipBoardIcon, FilesIcon, NotePencilIcon, PercentIcon } from '@/assets/svgs';

export const dataInfo = [
    {
        type: 'general',
        label: 'GENERAL INFORMATION',
        icon: <BooksIcon />,
        defaultOpen: true,
        collapseDisable: true,
        content: [
            { label: 'First Name', value: 'David' },
            { label: 'Last Name', value: 'Nguyen' },
            { label: 'Experience', value: '5 years' },
            { label: 'Personal Website', value: 'david.com' },
        ],
    },
    {
        type: 'structures',
        label: 'COMMISSION STRUCTURES',
        icon: <PercentIcon />,
        defaultOpen: false,
        collapseDisable: false,
        externalIcon: {
            visible: true,
            clickable: false,
        },
    },
    {
        type: 'recruitment',
        label: 'RECRUITMENT DOCUMENTS',
        icon: <ClipBoardIcon />,
        defaultOpen: false,
        collapseDisable: false,
        externalIcon: {
            visible: true,
            clickable: true,
        },
    },
    {
        type: 'loanDocuments',
        label: 'RELATED CLIENTS & LOAN DOCUMENTS',
        icon: <FilesIcon />,
        defaultOpen: true,
        collapseDisable: false,
    },
    {
        type: 'performance',
        label: 'PERFORMANCE',
        icon: <ChartIcon />,
        defaultOpen: false,
    },
    {
        type: 'todo',
        label: 'TO-DO',
        icon: <NotePencilIcon />,
        defaultOpen: true,
        collapseDisable: true,
        content: [
            { label: 'Review Loan Applications', value: '' },
            { label: 'Contact to Borrower', value: '' },
        ],
    },
];
