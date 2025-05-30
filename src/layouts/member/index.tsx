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
            <main className="flex-1">
                <SidebarTrigger className="md:hidden" />
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default Layout;
