import { ArrowSquareOutICon, ChevronRightIcon } from '@/assets/svgs';
import DataTable from '@/components/common/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { loans } from '../dataTable';
import { tableLoanDocumentsColumns } from '../columnsTables';
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { dataInfo } from './dataInfo';
import React from 'react';

const InfoSections = () => {
    const loanDocumentsTable = useReactTable({
        data: loans,
        columns: tableLoanDocumentsColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5, // default page size
            },
        },
    });

    console.log('InfoSections re-render');
    return (
        <ul className="p-4 flex flex-col gap-4">
            {dataInfo.map((section) => (
                <Collapsible key={section.type} defaultOpen={section.defaultOpen}>
                    {section.collapseDisable ? (
                        <div className="flex items-center gap-2 font-semibold h-11">
                            {section.icon}
                            {section.label}
                        </div>
                    ) : (
                        <CollapsibleTrigger className="w-full h-11" asChild>
                            <Button
                                variant="ghost"
                                className="group !px-0 w-full flex justify-between items-center text-base font-medium rounded-none"
                            >
                                <div className="flex items-center gap-2">
                                    {section.icon}
                                    <span>{section.label}</span>
                                    <ChevronRightIcon className="p-0.5 text-[#D9D9D9] transition-transform duration-200 group-data-[state=open]:rotate-90" />
                                </div>
                                {section.externalIcon?.visible &&
                                    (section.externalIcon.clickable ? (
                                        <ArrowSquareOutICon className="text-[#2979FF]" />
                                    ) : (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="text-[#CFCFCF]">
                                                    <ArrowSquareOutICon />
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="h-8 flex items-center">
                                                You don’t have permission to open this link
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                            </Button>
                        </CollapsibleTrigger>
                    )}
                    <Separator />

                    <CollapsibleContent className="mt-4">
                        {/* Nội dung tùy theo section.type */}
                        {section.type === 'general' && (
                            <ol className="grid grid-cols-4 gap-3.5 text-sm">
                                {section.content?.map((item, index) => (
                                    <li key={index} className="flex flex-col gap-2">
                                        <span className="font-semibold">{item.label}</span>
                                        <span>{item.value}</span>
                                    </li>
                                ))}
                            </ol>
                        )}
                        {section.type === 'loanDocuments' && (
                            <div>
                                <DataTable table={loanDocumentsTable} />
                            </div>
                        )}

                        {section.type === 'todo' && (
                            <ul className="flex flex-col gap-2 text-base text-[#111928] font-medium">
                                {section.content?.map((item, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <Checkbox className="w-5 h-5" />
                                        <Label>{item.label}</Label>
                                        <ArrowSquareOutICon className="text-[#4D69FF] w-4 h-4" />
                                    </li>
                                ))}

                                <div className="flex items-center gap-4">
                                    <Checkbox disabled className="w-5 h-5 bg-[#F5F4F4]" />
                                    <Button variant="link" className="!p-0 h-fit justify-start text-[#D9D9D9]">
                                        Click to add new todo
                                    </Button>
                                </div>
                            </ul>
                        )}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </ul>
    );
};

export default React.memo(InfoSections);
