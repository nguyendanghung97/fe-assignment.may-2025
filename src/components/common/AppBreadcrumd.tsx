import { Fragment } from 'react/jsx-runtime';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import React from 'react';

type AppBreadcrumdProps = {
    data: IBreadcrumd[];
    className?: string;
};

export type IBreadcrumd = {
    title: string;
    url: string;
};

const AppBreadcrumd = ({ data, className, ...props }: AppBreadcrumdProps) => {
    return (
        <>
            <Breadcrumb className={cn('py-0.5', className)} {...props}>
                <BreadcrumbList className="h-12 text-sm font-medium gap-4">
                    {data.map((brc, index) => {
                        const isLast = index === data.length - 1;
                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem key={index} className="gap-4 leading-6">
                                    {isLast ? (
                                        <BreadcrumbPage className="text-center text-[var(--primary-color)]">
                                            {brc.title}
                                        </BreadcrumbPage>
                                    ) : (
                                        <Link to={brc.url} className="text-center hover:text-[var(--primary-color)]">
                                            {brc.title}
                                        </Link>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator className="[&>svg]:size-3.5" />}
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </>
    );
};

export default React.memo(AppBreadcrumd);
