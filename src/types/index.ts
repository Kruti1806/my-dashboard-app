export type User = {
  id: number;
  name: string;
  email: string;
};

export type PaginatedUsersResponse = {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthPayload = {
  email: string;
  role: string;
};

export type SortOrder = 'asc' | 'desc';

export type UsersQueryParams = {
  page: number;
  limit: number;
  sortBy: string;
  order: SortOrder;
  search: string;
};
