import images from '@/assets/images';

export type IUser = {
    userId: string;
    username: string;
    avatar: string;
    sex: string;
    phone: number;
    email: string;
    type: string;
    experience: number;
    status: 'Active' | 'Inactive';
};

export const users: IUser[] = [
    {
        userId: 'LO00001',
        username: 'David Nguyen',
        avatar: images.ImageTable1,
        sex: 'male',
        phone: 3222433452,
        email: 'david.nguyen@gmail.com',
        type: 'Loan Officer',
        experience: 5,
        status: 'Active',
    },
    {
        userId: 'UW00001',
        username: 'Jennie Pink',
        avatar: images.ImageTable2,
        sex: 'female',
        phone: 3222433452,
        email: 'jenniepink@gmail.com',
        type: 'Underwriter',
        experience: 10,
        status: 'Active',
    },

    {
        userId: 'LP00001',
        username: 'Pep Guardiola',
        avatar: images.ImageTable3,
        sex: 'male',
        phone: 3222433452,
        email: 'pepguardiola@gmail.com',
        type: 'Loan Processor',
        experience: 5,
        status: 'Active',
    },

    {
        userId: 'AD00001',
        username: 'Bruno Mar',
        avatar: images.ImageTable4,
        sex: 'male',
        phone: 3222433452,
        email: 'brunomors@gmail.com',
        type: 'Admin',
        experience: 5,
        status: 'Inactive',
    },

    {
        userId: 'ME00001',
        username: 'David Beckham',
        avatar: images.ImageTable5,
        sex: 'male',
        phone: 3222433452,
        email: 'davidbeckham@gmail.com',
        type: 'Member',
        experience: 5,
        status: 'Active',
    },
    {
        userId: 'LO00001',
        username: 'David Nguyen',
        avatar: images.ImageTable1,
        sex: 'male',
        phone: 3222433452,
        email: 'david.nguyen@gmail.com',
        type: 'Loan Officer',
        experience: 5,
        status: 'Active',
    },
    {
        userId: 'UW00001',
        username: 'Jennie Pink',
        avatar: images.ImageTable2,
        sex: 'female',
        phone: 3222433452,
        email: 'jenniepink@gmail.com',
        type: 'Underwriter',
        experience: 10,
        status: 'Active',
    },

    {
        userId: 'LP00001',
        username: 'Pep Guardiola',
        avatar: images.ImageTable3,
        sex: 'male',
        phone: 3222433452,
        email: 'pepguardiola@gmail.com',
        type: 'Loan Processor',
        experience: 5,
        status: 'Active',
    },

    {
        userId: 'AD00001',
        username: 'Bruno Mar',
        avatar: images.ImageTable4,
        sex: 'male',
        phone: 3222433452,
        email: 'brunomors@gmail.com',
        type: 'Admin',
        experience: 5,
        status: 'Inactive',
    },

    {
        userId: 'ME00001',
        username: 'David Beckham',
        avatar: images.ImageTable5,
        sex: 'male',
        phone: 3222433452,
        email: 'davidbeckham@gmail.com',
        type: 'Member',
        experience: 5,
        status: 'Active',
    },
];

export type ILoan = {
    loanId: string;
    borrowerName: string;
    sex: string;
    lender: string;
    interestRate: number;
    process: number;
    status: string;
};

export const loans: ILoan[] = [
    {
        loanId: 'LA00001',
        borrowerName: 'Hang Nguyen',
        sex: 'female',
        lender: 'AD Mortgage',
        interestRate: 6,
        process: 68,
        status: 'IN PROGRESS',
    },
    {
        loanId: 'LA00001',
        borrowerName: 'Hang Nguyen',
        sex: 'female',
        lender: 'AD Mortgage',
        interestRate: 6,
        process: 68,
        status: 'IN PROGRESS',
    },
];
