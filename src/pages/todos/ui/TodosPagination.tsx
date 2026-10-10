import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';
import type { MouseEvent } from 'react';

type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

// First, last and current ± 1, with ellipses for the gaps.
function getPageItems(page: number, totalPages: number): PageItem[] {
  const pages = new Set(
    [1, page - 1, page, page + 1, totalPages].filter((p) => p >= 1 && p <= totalPages),
  );
  const sorted = [...pages].sort((a, b) => a - b);
  const items: PageItem[] = [];
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1];
    if (prev !== undefined && p - prev > 1) {
      items.push(p - prev === 2 ? prev + 1 : i === 1 ? 'ellipsis-start' : 'ellipsis-end');
    }
    items.push(p);
  });
  return items;
}

interface TodosPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TodosPagination({ page, totalPages, onPageChange }: TodosPaginationProps) {
  if (totalPages <= 1) return null;

  const goTo = (target: number) => (event: MouseEvent) => {
    event.preventDefault();
    onPageChange(target);
  };

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={goTo(page - 1)}
            aria-disabled={isFirst}
            className={isFirst ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
        {getPageItems(page, totalPages).map((item) => (
          <PaginationItem key={item}>
            {typeof item === 'number' ? (
              <PaginationLink href='#' isActive={item === page} onClick={goTo(item)}>
                {item}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={goTo(page + 1)}
            aria-disabled={isLast}
            className={isLast ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
