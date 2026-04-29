'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';

import type { SortOrder, User } from '../../types';
import { columns as defaultColumns } from './columns';
import { DataTablePagination } from './DataTablePagination';
import { DataTableToolbar } from './DataTableToolbar';

export type DataTableProps = {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  sortBy: string;
  order: SortOrder;
  onSortChange: (sortBy: string, order: SortOrder) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  onLimitChange?: (value: number) => void;
  onPageChange?: (page: number) => void;
};

function SortIndicator({ active, order }: { active: boolean; order: SortOrder }) {
  if (!active) return <span className="ml-1 text-gray-300">↕</span>;
  return <span className="ml-1 text-gray-700">{order === 'asc' ? '↑' : '↓'}</span>;
}

export function DataTable({
  data,
  total,
  page,
  limit,
  totalPages,
  isLoading,
  sortBy,
  order,
  onSortChange,
  search = '',
  onSearchChange,
  onLimitChange,
  onPageChange,
}: DataTableProps) {
  const sorting = React.useMemo<SortingState>(() => {
    return sortBy ? [{ id: sortBy, desc: order === 'desc' }] : [];
  }, [sortBy, order]);

  const table = useReactTable<User>({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    manualSorting: true,
  });

  const onHeaderClick = (columnId: string) => {
    const isActive = sortBy === columnId;
    const nextOrder: SortOrder = isActive ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
    onSortChange(columnId, nextOrder);
  };

  return (
    <div className="space-y-4">
      <DataTableToolbar
        search={search}
        onSearchChange={onSearchChange ?? (() => {})}
        limit={limit}
        onLimitChange={onLimitChange ?? (() => {})}
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const columnId = header.column.id;
                  const canSort = header.column.getCanSort();
                  const isActive = sortBy === columnId;
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      className={[
                        'whitespace-nowrap px-4 py-3 font-medium',
                        canSort ? 'cursor-pointer select-none hover:bg-gray-100' : '',
                      ].join(' ')}
                      onClick={canSort ? () => onHeaderClick(columnId) : undefined}
                    >
                      <div className="inline-flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort ? <SortIndicator active={isActive} order={order} /> : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {defaultColumns.map((_col, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-gray-600" colSpan={defaultColumns.length}>
                  No results.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={[
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                    'hover:bg-blue-50/40',
                  ].join(' ')}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap px-4 py-3 text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing <span className="font-medium text-gray-900">{data.length}</span> of{' '}
          <span className="font-medium text-gray-900">{total}</span> users
        </div>
        <div>
          Page <span className="font-medium text-gray-900">{page}</span> /{' '}
          <span className="font-medium text-gray-900">{totalPages}</span> •{' '}
          <span className="font-medium text-gray-900">{limit}</span> per page
        </div>
      </div>

      <DataTablePagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange ?? (() => {})}
      />
    </div>
  );
}

