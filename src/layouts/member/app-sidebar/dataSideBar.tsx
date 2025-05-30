import {
    AdministrationsICon,
    DocumentationICon,
    EstimatorICon,
    InquiriesIcon,
    OverviewIcon,
    ProjectsIcon,
} from '@/assets/svgs';
import configs from '@/configs';

export type Item = {
    title: string;
    url: string;
    icon: React.JSX.Element;
};
// Menu items.
const dataSideBar = {
    member: {
        company: 'ABC Company',
        name: 'Lisa Rose',
    },
    navMain: [
        {
            title: 'Overview',
            url: configs.routes.overview,
            icon: <OverviewIcon />,
        },
        {
            title: 'Inquiries',
            url: configs.routes.inquiries,

            icon: <InquiriesIcon />,
        },
        {
            title: 'Estimator',
            url: configs.routes.estimator,
            icon: <EstimatorICon />,
        },
        {
            title: 'Projects',
            url: configs.routes.projects,
            icon: <ProjectsIcon />,
        },
    ],
    navManagement: [
        {
            title: 'Administrations',
            url: configs.routes.administrations,
            icon: <AdministrationsICon />,
        },
        {
            title: 'Documentation',
            url: configs.routes.documentation,
            icon: <DocumentationICon />,
        },
    ],
};

export default dataSideBar;
