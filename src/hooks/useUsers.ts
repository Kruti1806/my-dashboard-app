import * as React from 'react';

import type { PaginatedUsersResponse, UsersQueryParams } from '../types';

export function useUsers(
  params: UsersQueryParams
): { data: PaginatedUsersResponse | null; isLoading: boolean; error: string | null } {
  const [data, setData] = React.useState<PaginatedUsersResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setIsLoading(true);
      setError(null);

      const qs = new URLSearchParams({
        page: String(params.page),
        limit: String(params.limit),
        sortBy: params.sortBy,
        order: params.order,
        search: params.search,
      });

      try {
        const res = await fetch(`/api/users?${qs.toString()}`, { signal: controller.signal });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(body?.error ?? `Request failed (${res.status})`);
        }

        const json = (await res.json()) as PaginatedUsersResponse;
        setData(json);
      } catch (e) {
        if ((e as { name?: string } | null)?.name === 'AbortError') return;
        console.error('useUsers fetch error:', e);
        setError(e instanceof Error ? e.message : 'Network error');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [params.page, params.limit, params.sortBy, params.order, params.search]);

  return { data, isLoading, error };
}

