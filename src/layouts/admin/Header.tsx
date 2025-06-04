import { ChevronDownIcon, HomeIcon, NotifyIcon, ProfileIcon, SettingIcon } from '@/assets/svgs';

const Header = () => {
    return (
        <header className="px-12 py-0.5 bg-[#294172] w-full">
            <div className="h-14 flex items-center">
                <div className="w-52 text-base text-[#00B25C]">COMPANY LOGO XXX</div>
                <div className="ml-1.5 flex items-center gap-5">
                    <HomeIcon />
                    <div className="flex flex-col gap-1 text-[#294172] bg-[#DAE6EF] px-5 py-1 rounded-sm">
                        <span className="text-xs font-normal leading-4">Module</span>
                        <span className="text-sm font-bold leading-4 uppercase">USER management</span>
                    </div>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center gap-5 text-white">
                    <div className="relative">
                        <NotifyIcon />
                        <sup className="absolute left-3 w-4 h-4 bg-[#E10E0E] rounded-full flex justify-center items-center">
                            1
                        </sup>
                    </div>
                    <SettingIcon />
                    <div className="flex items-center gap-5">
                        <ProfileIcon />
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-bold">Mr. David Nguyen</span>
                            <span className="text-xs font-normal">Home Company</span>
                        </div>
                        <ChevronDownIcon width={20} height={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
