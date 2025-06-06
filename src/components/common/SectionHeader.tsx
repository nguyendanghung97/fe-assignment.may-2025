import { cn } from '@/lib/utils';
import React from 'react';

type SectionHeaderProps = {
    icon: React.JSX.Element;
    title: string;
    className?: string;
};

const SectionHeader = ({ className, icon, title, ...props }: SectionHeaderProps) => {
    return (
        <div className={cn('h-10 flex items-center gap-2', className)} {...props}>
            {icon}
            <h3 className="text-base">{title}</h3>
        </div>
    );
};

export default SectionHeader;
