import React from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const Layout = () => {
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
            <main className="flex-1 pt-2 md:pt-5 pl-5 pb-4 pr-4">
                <SidebarTrigger className="fixed right-0 top-0 md:hidden cursor-pointer" />
                <div className="pl-0.5">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
};

export default Layout;
