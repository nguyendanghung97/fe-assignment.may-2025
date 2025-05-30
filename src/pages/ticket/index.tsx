import {
    ArrowUpIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CircelFillIcon,
    CircleIcon,
    ClockIcon,
    EBookIcon,
} from '@/assets/svgs';
import type { IBreadcrumd } from '@/components/common/AppBreadcrumd';
import AppBreadcrumd from '@/components/common/AppBreadcrumd';
import SectionHeader from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import configs from '@/configs';
import { cn } from '@/lib/utils';

const breadcrumdData: IBreadcrumd[] = [
    { title: 'Projects', url: configs.routes.ticket },
    { title: 'UrapidLoan Project', url: configs.routes.ticket },
    { title: '[Ticket name ]', url: configs.routes.ticket },
];

const activitiesData = [
    { activity: 'RFX David Nguyen Submitted to underwriting', time: '2025-04-04 13:00:38' },
    { activity: 'ABC  Lisa Rose approval', time: '2025-04-04 11:10:38' },
    { activity: 'RFX David Nguyen Submitted to underwriting', time: '2025-04-04 08:00:00' },
    { activity: 'ABC Lisa Rose create an issue', time: '2025-04-03 17:10:38' },
];

const propsData = [
    { prop: 'Status', value: 'In-Progress' },
    { prop: 'Priority', value: 'Critical' },
    { prop: 'Assignee', value: 'Trangntt' },
    { prop: 'Type', value: 'Bug' },
    { prop: 'Stated date', value: '2025-04-04' },
    { prop: 'Target date', value: '2025-04-04' },
];

const Page = () => {
    return (
        <div className="pt-2 md:pt-5 pl-6">
            <AppBreadcrumd data={breadcrumdData} />
            <Separator />
            <div className="flex justify-between">
                <div className="flex-1 pr-4">
                    <section>
                        <SectionHeader icon={<EBookIcon />} title="Description" />
                        <Separator />
                        <ul className="mt-2 flex flex-col gap-2.5">
                            {[...Array(2)].map((_, index) => (
                                <li key={index} className="flex gap-2.5">
                                    <CircleIcon className="shrink-0 mt-2" />
                                    <p className="text-sm font-normal leading-6">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <Button variant="link" className="mt-4.5 mb-7 text-[var(--primary-color)] cursor-pointer px-0">
                            + Add sub-tickets
                        </Button>
                    </section>

                    <section>
                        <SectionHeader icon={<EBookIcon />} title="Activity" />
                        <Separator />
                        <ul className="pt-4 pb-6">
                            {activitiesData.map((act, index) => {
                                const isLast = index === activitiesData.length - 1;
                                return (
                                    <li key={index} className="truncate">
                                        <div className="flex items-center gap-2 text-sm leading-6">
                                            <span className="w-5 flex justify-center">
                                                <CircelFillIcon
                                                    className={cn(
                                                        index % 2 === 0 ? 'text-[#22AD5C]' : 'text-[#005A86]',
                                                    )}
                                                />
                                            </span>
                                            <span>{act.activity}</span>
                                            <ClockIcon className="shrink-0" />
                                            <span className="">{act.time}</span>
                                        </div>
                                        {!isLast && (
                                            <div className="w-5 h-5 flex justify-center">
                                                <Separator orientation="vertical" className="bg-[#6F6F6F]" />
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="relative">
                            <Textarea placeholder="Leave a comment ..." className="min-h-24 py-3.5 px-7 bg-[#ECECEC]" />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-[#005B86] absolute right-1.5 bottom-0 cursor-pointer hover:text-[#005B86]/70 hover:bg-transparent"
                            >
                                <ArrowUpIcon className="" />
                            </Button>
                        </div>
                    </section>
                </div>
                <div className="w-72">
                    <Separator className="absolute" orientation="vertical" />
                    <div className="px-4 h-10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base">Properties</h3>
                            <ChevronDownIcon />
                        </div>
                        <span className="w-7 text-xs flex justify-center">
                            <ChevronRightIcon />
                        </span>
                    </div>
                    <Separator />
                    <ul className="pt-1.5 px-4 grid flex-1 gap-4 text-sm">
                        {propsData.map((prop, index) => (
                            <li key={index} className="grid grid-cols-2 gap-6">
                                <span className="flex items-center">{prop.prop}:</span>
                                <div className="flex items-center gap-2">
                                    <ChevronDownIcon />
                                    <span
                                        className={cn({
                                            'text-[#007AFF]': prop.value === 'In-Progress',
                                            'text-[#E10E0E]': prop.value === 'Critical',
                                        })}
                                    >
                                        {prop.value}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Page;
