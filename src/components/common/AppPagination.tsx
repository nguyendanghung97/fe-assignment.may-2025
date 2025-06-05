import { cn } from '@/lib/utils';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { INITIAL_PAGE_SIZE } from '@/pages/admin';

type AppPaginationProps = {
    className?: string;
    table: any;
    initialPageSize?: number;
};

const AppPagination = ({ className, table, initialPageSize = INITIAL_PAGE_SIZE }: AppPaginationProps) => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageSize = table.getState().pagination.pageSize;

    function getPaginationPages(totalPages: number, currentPage: number, windowSize = 2) {
        const pages: (number | string)[] = [1];

        if (currentPage - windowSize > 2) pages.push('...');
        for (
            let i = Math.max(2, currentPage - windowSize);
            i <= Math.min(totalPages - 1, currentPage + windowSize);
            i++
        ) {
            pages.push(i);
        }
        if (currentPage + windowSize < totalPages - 1) pages.push('...');
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    }
    const pages = getPaginationPages(totalPages, currentPage);
    const pageSizes = [1, 2, 3].map((n) => n * initialPageSize);
    return (
        <div className={cn('flex gap-6 py-3.5 px-4 text-[#637381]', className)}>
            <Pagination>
                <PaginationContent className="gap-2.5">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => table.previousPage()}
                            className={cn(
                                'w-9 h-9 hover:bg-[#E6EFF3]',
                                !table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'border',
                            )}
                        />
                    </PaginationItem>

                    {pages.map((page, index) => (
                        <PaginationItem key={typeof page === 'number' ? `page-${page}` : `ellipsis-${index}`}>
                            {typeof page === 'number' ? (
                                <PaginationLink
                                    className={cn('text-base font-normal hover:bg-[#E6EFF3] border', {
                                        'bg-[#E6EFF3] border-[#294172]': currentPage === page,
                                    })}
                                    onClick={() => table.setPageIndex(page - 1)}
                                    isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            ) : (
                                <PaginationEllipsis />
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => table.nextPage()}
                            className={cn(
                                'w-9 h-9 hover:bg-[#E6EFF3]',
                                !table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'border',
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            <Select
                value={pageSize.toString().padStart(2, '0')}
                onValueChange={(value) => table.setPageSize(Number(value))}
            >
                <SelectTrigger className="text-base font-normal gap-2.5">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {pageSizes.map((size) => (
                            <SelectItem
                                key={size}
                                value={size.toString().padStart(2, '0')}
                                className="text-base font-normal"
                            >
                                {/* padStart(2, '0'): đảm bảo luôn có ít nhất 2 ký tự*/}
                                {size.toString().padStart(2, '0')} items
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default AppPagination;
