'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DataTable } from '../../../components/DataTable/DataTable';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { useUsers } from '../../../hooks/useUsers';
import type { SortOrder, UsersQueryParams } from '../../../types';

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseOrder(value: string | null, fallback: SortOrder): SortOrder {
  if (value === 'asc' || value === 'desc') return value;
  return fallback;
}

export function DashboardClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const page = parsePositiveInt(sp.get('page'), 1);
  const limit = parsePositiveInt(sp.get('limit'), 10);
  const sortBy = sp.get('sortBy') ?? 'id';
  const order = parseOrder(sp.get('order'), 'asc');
  const search = sp.get('search') ?? '';

  const params: UsersQueryParams = { page, limit, sortBy, order, search };
  const { data, isLoading, error } = useUsers(params);

  const setParams = React.useCallback(
    (next: Partial<UsersQueryParams>) => {
      const nextParams: UsersQueryParams = { ...params, ...next };
      const qs = new URLSearchParams();
      qs.set('page', String(nextParams.page));
      qs.set('limit', String(nextParams.limit));
      qs.set('sortBy', nextParams.sortBy);
      qs.set('order', nextParams.order);
      if (nextParams.search.trim()) qs.set('search', nextParams.search);
      router.push(`/dashboard?${qs.toString()}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, page, limit, sortBy, order, search]
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
      </div>

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <DataTable
          data={data?.data ?? []}
          total={data?.total ?? 0}
          page={data?.page ?? page}
          limit={data?.limit ?? limit}
          totalPages={data?.totalPages ?? 1}
          isLoading={isLoading}
          sortBy={sortBy}
          order={order}
          search={search}
          onSearchChange={(value) => setParams({ search: value, page: 1 })}
          onLimitChange={(value) => setParams({ limit: value, page: 1 })}
          onPageChange={(p) => setParams({ page: p })}
          onSortChange={(nextSortBy, nextOrder) =>
            setParams({ sortBy: nextSortBy, order: nextOrder, page: 1 })
          }
        />
      )}
    </div>
  );
}

