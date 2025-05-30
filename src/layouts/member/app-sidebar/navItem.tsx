import { SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import type { Item } from './dataSideBar';

const NavItem = ({ item }: Type) => {
    const { state } = useSidebar();
    return (
        <SidebarMenuItem key={item.title} className="flex items-center">
            <NavLink
                className={({ isActive }) =>
                    cn(
                        'w-full h-10 flex items-center gap-3.5 hover:bg-[#D3D3D3] hover:text-[var(--primary-color)] rounded-sm overflow-hidden',
                        isActive ? 'bg-[#D3D3D3] text-[var(--primary-color))]' : 'text-[var(--text-color)]',
                        state === 'collapsed' ? 'px-0' : 'px-1.5',
                    )
                }
                to={item.url}
            >
                <div className="w-10 flex justify-center items-center shrink-0">{item.icon}</div>
                <span className={cn('text-base leading-6 font-medium')}>{item.title}</span>
            </NavLink>
        </SidebarMenuItem>
    );
};

export default NavItem;

type Type = {
    item: Item;
};
