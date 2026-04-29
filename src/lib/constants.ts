export const MOCK_USERS_CREDENTIALS = [
  { email: 'admin@example.com', password: 'admin123' },
  { email: 'user@example.com', password: 'user123' },
];

export const JWT_SECRET = process.env.JWT_SECRET ?? 'supersecret_dev_key';

export const TOKEN_COOKIE_NAME = 'auth_token';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_SORT_BY = 'id';
export const DEFAULT_ORDER = 'asc';
