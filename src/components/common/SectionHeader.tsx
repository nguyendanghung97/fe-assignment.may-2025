import { cn } from '@/lib/utils';
import React from 'react';

const SectionHeader = ({ className, icon, title, ...props }: Type) => {
    return (
        <div className={cn('h-10 flex items-center gap-2', className)} {...props}>
            {icon}
            <h3 className="text-base">{title}</h3>
        </div>
    );
};

export default SectionHeader;

type Type = {
    icon: React.JSX.Element;
    title: string;
    className?: string;
};
