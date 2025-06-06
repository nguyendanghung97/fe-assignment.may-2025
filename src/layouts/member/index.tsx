import React from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Layout = () => {
    const isMobile = useIsMobile();
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '242px',
                    '--sidebar-width-icon': '5rem',
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <main className="flex-1 pt-2 md:pt-5 pb-4 pl-5 pr-2 text-[#7C7C7C]">
                <SidebarTrigger className={cn('fixed right-0 top-0 cursor-pointer', isMobile ? 'block' : 'hidden')} />
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default Layout;
