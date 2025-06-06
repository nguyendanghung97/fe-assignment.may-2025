import { BooksIcon, ChartIcon, ClipBoardIcon, FilesIcon, NotePencilIcon, PercentIcon } from '@/assets/svgs';
import { ESectionInfo } from '@/utils/enum';

export const dataInfo = [
    {
        type: ESectionInfo.GENERAL,
        label: 'GENERAL INFORMATION',
        icon: <BooksIcon />,
        defaultOpen: true,
        collapseDisable: true,
        content: [
            { label: 'First Name', value: 'David' },
            { label: 'Last Name', value: 'Nguyen' },
            { label: 'Experience', value: '5 years' },
            { label: 'Personal Website', value: 'david.com' },
            { label: 'First Name', value: 'David' },
            { label: 'Last Name', value: 'Nguyen' },
            { label: 'Experience', value: '5 years' },
            { label: 'Personal Website', value: 'david.com' },
        ],
    },
    {
        type: ESectionInfo.STRUCTURES,
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
        type: ESectionInfo.RECRUITMENT,
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
        type: ESectionInfo.LOAN_DOCUMENTS,
        label: 'RELATED CLIENTS & LOAN DOCUMENTS',
        icon: <FilesIcon />,
        defaultOpen: true,
        collapseDisable: false,
    },
    {
        type: ESectionInfo.PERFORMANCE,
        label: 'PERFORMANCE',
        icon: <ChartIcon />,
        defaultOpen: false,
    },
    {
        type: ESectionInfo.TO_DO,
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
