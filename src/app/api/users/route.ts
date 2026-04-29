import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { verifyToken } from '../../../lib/auth';
import {
  DEFAULT_LIMIT,
  DEFAULT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_SORT_BY,
  TOKEN_COOKIE_NAME,
} from '../../../lib/constants';
import type { PaginatedUsersResponse, SortOrder, User } from '../../../types';

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseOrder(value: string | null, fallback: SortOrder): SortOrder {
  if (value === 'asc' || value === 'desc') return value;
  return fallback;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export async function GET(req: Request) {
  try {
    const token = (await cookies()).get(TOKEN_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await verifyToken(token);
    } catch (error) {
      console.error('GET /api/users token verification error:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = parsePositiveInt(url.searchParams.get('page'), DEFAULT_PAGE);
    const limit = clamp(parsePositiveInt(url.searchParams.get('limit'), DEFAULT_LIMIT), 1, 100);
    const sortByRaw = url.searchParams.get('sortBy') ?? DEFAULT_SORT_BY;
    const order = parseOrder(url.searchParams.get('order'), DEFAULT_ORDER as SortOrder);
    const search = url.searchParams.get('search') ?? '';

    const sortBy: keyof User =
      sortByRaw === 'id' || sortByRaw === 'name' || sortByRaw === 'email'
        ? sortByRaw
        : DEFAULT_SORT_BY;

    const allUsers: User[] = Array.from({ length: 100 }, (_, i) => {
      const id = i + 1;
      return { id, name: `User ${id}`, email: `user${id}@example.com` };
    });

    const needle = search.trim().toLowerCase();
    let filtered = allUsers;
    if (needle.length > 0) {
      filtered = allUsers.filter(
        (u) => u.name.toLowerCase().includes(needle) || u.email.toLowerCase().includes(needle)
      );
    }

    const direction = order === 'desc' ? -1 : 1;
    filtered.sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];

      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * direction;
      return String(av).localeCompare(String(bv)) * direction;
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = clamp(page, 1, totalPages);
    const start = (safePage - 1) * limit;
    const data = filtered.slice(start, start + limit);

    const response: PaginatedUsersResponse = {
      data,
      total,
      page: safePage,
      limit,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
