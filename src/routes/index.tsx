import configs from '@/configs';
import React from 'react';

const publicRoutes = [
    { path: configs.routes.home, component: React.lazy(() => import('@/pages/home')) },
    {
        layout: React.lazy(() => import('@/layouts/member')),
        child: [
            { path: configs.routes.overview, component: React.lazy(() => import('@/pages/overview')) },
            { path: configs.routes.inquiries, component: React.lazy(() => import('@/pages/inquiries')) },
            { path: configs.routes.estimator, component: React.lazy(() => import('@/pages/estimator')) },
            { path: configs.routes.projects, component: React.lazy(() => import('@/pages/projects')) },
            { path: configs.routes.administrations, component: React.lazy(() => import('@/pages/administrations')) },
            { path: configs.routes.documentation, component: React.lazy(() => import('@/pages/documentation')) },
        ],
    },
    {
        layout: React.lazy(() => import('@/layouts/admin')),
        child: [{ path: configs.routes.admin, component: React.lazy(() => import('@/pages/admin')) }],
    },
];

export default publicRoutes;
