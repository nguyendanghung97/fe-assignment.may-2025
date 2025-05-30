import images from '@/assets/images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import NavItem from './navItem';
import dataSideBar from './dataSideBar';
import { LogoFull, LogoIcon, RedirectIcon } from '@/assets/svgs';

const AppSidebar = ({ ...props }) => {
    const { state } = useSidebar();
    // onClick={() => setOpen(!open)}

    return (
        <Sidebar className="oke" collapsible="icon" {...props}>
            <SidebarHeader className="pt-6 px-4">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 rounded-none">
                            <AvatarImage src={images.Image1} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-[var(--primary-color)]">
                            <span className="truncate text-xl font-semibold leading-6">
                                {dataSideBar.member.company}
                            </span>
                            <span className="truncate text-base leading-6">{dataSideBar.member.name}</span>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent
                className={cn(
                    'font-[IBM_Plex_Sans] pt-8 pb-5 justify-between gap-14 scroll-hide',
                    state === 'collapsed' ? 'px-5' : 'px-4',
                )}
            >
                <SidebarMenu className="gap-2">
                    {dataSideBar.navMain.map((item, index) => (
                        <NavItem key={index} item={item} />
                    ))}
                </SidebarMenu>
                <SidebarMenu>
                    {dataSideBar.navManagement.map((item, index) => (
                        <NavItem key={index} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="pb-6">
                <SidebarMenu>
                    <SidebarMenuItem
                        className={cn('flex items-center overflow-hidden', state === 'collapsed' ? 'px-0' : 'px-6')}
                    >
                        {state !== 'collapsed' ? (
                            <LogoFull className="shrink-0" />
                        ) : (
                            <LogoIcon className="w-full shrink-0" />
                        )}
                        <SidebarMenuButton asChild className="ml-4">
                            <a href="https://riverflow.solutions/" className="flex justify-center">
                                <RedirectIcon
                                    className={cn('ml-0.5', {
                                        'w-0': state === 'collapsed',
                                    })}
                                />
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default AppSidebar;
