import { ChevronRightIcon, ListIcon, PackageIcon, SearchIcon } from '@/assets/svgs';
import AppBreadcrumd, { type IBreadcrumd } from '@/components/common/AppBreadcrumd';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationNext } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { Tabs } from '@/components/ui/tabs';
import configs from '@/configs';
import { cn } from '@/lib/utils';
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useMemo, useState } from 'react';

const dataBrc: IBreadcrumd[] = [
    { title: 'Estimator', url: configs.routes.work },
    { title: 'Work Packages', url: configs.routes.work },
];

const tabs = [
    {
        value: 'RFX',
        label: 'RFX WPs',
        subTabs: [
            { value: 'All Work', label: 'All Work Packages', packages: [...Array(9)] },
            { value: 'Architectural', label: 'Architectural WPs', packages: [...Array(2)] },
            { value: 'Development', label: 'Development WPs', packages: null },
            { value: 'Operation', label: 'Operation WPs', packages: null },
            { value: 'Basic', label: 'Basic', packages: null },
            { value: 'Comprehensive', label: 'Comprehensive', packages: null },
            { value: 'Advanced', label: 'Advanced', packages: null },
        ],
    },
    { value: 'custom', label: 'Custom WPs', subTabs: [] },
];

const Page = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].value);
    const [activeSubTab, setActiveSubTab] = useState(tabs[0].subTabs[0].value);

    const packages = useMemo(() => {
        const tab = tabs.find((tab) => tab.value === activeTab);
        const subTab = tab?.subTabs.find((sub) => sub.value === activeSubTab);
        return subTab?.packages || [];
    }, [activeTab, activeSubTab]);
    return (
        <>
            <div className="flex justify-between">
                <AppBreadcrumd data={dataBrc} />
                <Button className="h-10 !px-4 bg-[var(--primary-color)] gap-2.5 rounded-4xl">
                    <ListIcon />
                    View Summary
                </Button>
            </div>

            <Separator />
            <div className="pl-11">
                <h3 className="pt-4 pb-8 text-xl font-medium leading-8 text-gray-800">Work Packages (WP)</h3>
                <div className="flex">
                    <section className="pr-2 max-w-52 min-h-screen">
                        <div className="pr-3 h-full flex flex-col">
                            <Tabs
                                value={activeTab}
                                onValueChange={(v) => {
                                    setActiveTab(v);
                                    const foundTab = tabs.find((tab) => tab.value === v);
                                    if (foundTab && foundTab.subTabs.length > 0) {
                                        setActiveSubTab(foundTab.subTabs[0].value); // luôn set thằng đầu
                                    } else {
                                        setActiveSubTab('');
                                    }
                                }}
                                className="flex-1"
                            >
                                <TabsList className="grid grid-cols-2 gap-1 rounded-sm border p-0.5">
                                    {tabs.map((tab, index) => (
                                        <TabsTrigger
                                            key={index}
                                            value={tab.value}
                                            className={cn(
                                                'text-sm leading-6 rounded-sm hover:bg-[#E2F5F9] hover:text-[var(--primary-color)]',
                                                {
                                                    'text-[var(--primary-color)] bg-[#E2F5F9]': activeTab === tab.value,
                                                },
                                            )}
                                        >
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <h3 className="mt-3 mb-2 text-[#343434] text-[18px] font-medium">Categories</h3>

                                {tabs.map((tab) => (
                                    <TabsContent key={tab.value} value={tab.value}>
                                        {tab.subTabs.length > 0 ? (
                                            <Tabs
                                                value={activeSubTab}
                                                onValueChange={(value) => setActiveSubTab(value)}
                                            >
                                                <TabsList className="flex flex-col gap-2">
                                                    {tab.subTabs.map((sub, idx) => (
                                                        <TabsTrigger
                                                            value={sub.value}
                                                            key={idx}
                                                            className={cn(
                                                                'text-start text-sm hover:text-[var(--primary-color)]',
                                                                {
                                                                    'text-[var(--primary-color)]':
                                                                        activeSubTab === sub.value,
                                                                },
                                                            )}
                                                        >
                                                            {sub.label}
                                                            <Separator className="mt-1" />
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            </Tabs>
                                        ) : (
                                            <p className="text-gray-500">No sub-tabs available.</p>
                                        )}
                                    </TabsContent>
                                ))}
                            </Tabs>
                            <Button
                                variant="link"
                                className="italic text-[var(--primary-color)] text-sm font-medium flex justify-center items-center gap-2"
                            >
                                <ListIcon />
                                How to add custom WPs
                            </Button>
                        </div>
                    </section>
                    <section className="pl-4 flex-1">
                        <div className="relative">
                            <SearchIcon className="absolute left-4 h-full" />
                            <Input className="h-8 px-9" />
                        </div>
                        <div className="pt-4 ">
                            {packages.length > 0 ? (
                                <>
                                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                                        {packages.map((_, index) => (
                                            <Card
                                                key={index}
                                                className="max-w-[296px] p-3 rounded-sm shadow-none gap-4 min-w-fit"
                                            >
                                                <CardHeader className="flex items-center justify-between">
                                                    <CardTitle className="text-[18px]">
                                                        Work package {index + 1}
                                                    </CardTitle>
                                                    <ChevronRightIcon className="text-sm" />
                                                </CardHeader>
                                                <CardContent className="flex flex-col gap-4">
                                                    <CardDescription className="line-clamp-2">
                                                        Define system structure, technology stack, and integration flow.
                                                        Includes do...
                                                    </CardDescription>
                                                    <div className="flex gap-1.5">
                                                        <Button
                                                            variant="secondary"
                                                            className="w-6 h-6 rounded-none bg-[#E2F5F9] hover:text-[var(--primary-color)] border"
                                                        >
                                                            <ChevronRightIcon />
                                                        </Button>
                                                        <Button
                                                            variant="secondary"
                                                            className="w-6 h-6 rounded-none bg-[#E2F5F9] border"
                                                        >
                                                            <ChevronRightIcon />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-between">
                                                    <CardAction className="flex">
                                                        <Button
                                                            variant="secondary"
                                                            className="h-9 text-[var(--primary-color)] bg-[#F3F4F6] mr-4"
                                                        >
                                                            View Detail
                                                        </Button>
                                                    </CardAction>
                                                    <PackageIcon />
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                    <Pagination className="mt-36 justify-end">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationNext className="text-[var(--primary-color)] gap-2 border border-[var(--primary-color)] hover:text-[var(--primary-color)]" />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </>
                            ) : (
                                <p className="text-gray-500">No packages available.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Page;
