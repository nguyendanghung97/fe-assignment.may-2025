import { Fragment } from 'react/jsx-runtime';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Link } from 'react-router-dom';

const AppBreadcrumd = ({ data, ...props }: Type) => {
    return (
        <Breadcrumb className="py-0.5" {...props}>
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
                            {!isLast && <BreadcrumbSeparator className="[&>svg]:size-4" />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default AppBreadcrumd;

type Type = {
    data: IBreadcrumd[];
};

export type IBreadcrumd = {
    title: string;
    url: string;
};
