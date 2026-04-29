# My Dashboard App

## Overview
This is a Next.js 14 (App Router) demo dashboard app with simple JWT-based authentication, protected routes via middleware, and a user management table backed by mock data.

## Tech stack
- Next.js 14 + App Router
- TypeScript
- Tailwind CSS
- `jose` (JWT sign/verify)
- `cookies-next` (client-side cookie helpers)
- `@tanstack/react-table` (table rendering)
- Prettier

## Setup
Install dependencies:

```bash
npm install
```

Create `.env.local`:

```bash
JWT_SECRET=supersecret_dev_key_123
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Architecture
### App Router structure
- Public auth pages live under `src/app/(auth)/...`
- Protected pages live under `src/app/(protected)/...`

### Middleware protection
`src/middleware.ts` protects:
- `/dashboard`
- `/profile`
- `/settings`

If the `auth_token` cookie is missing/invalid, requests are redirected to `/login`. Verification uses `jose` so it works in the Edge runtime.

### Auth flow
1. User submits credentials on `/login`
2. `POST /api/login` validates against mock credentials and sets an `httpOnly` `auth_token` cookie
3. Middleware verifies the cookie on protected routes
4. `/dashboard` calls `GET /api/users` which also verifies the cookie before returning user data

## API docs
### `POST /api/login`
**Body**

```json
{ "email": "admin@example.com", "password": "admin123" }
```

**Success**

```json
{ "success": true }
```

**Failure (401)**

```json
{ "error": "Invalid credentials" }
```

### `GET /api/users`
Requires `auth_token` cookie.

**Query params**
- `page` (number)
- `limit` (number)
- `sortBy` (string: `id` | `name` | `email`)
- `order` (string: `asc` | `desc`)
- `search` (string)

**Response**
Returns a `PaginatedUsersResponse`:
- `data`: list of users
- `total`: total matching results
- `page`: current page
- `limit`: page size
- `totalPages`: number of pages

**Unauthorized (401)**

```json
{ "error": "Unauthorized" }
```

## Mock credentials
- `admin@example.com` / `admin123`
- `user@example.com` / `user123`

## Deploy to Vercel
1. Push the repository to GitHub.
2. In Vercel, click **New Project** and import the repo.
3. Add environment variables in the Vercel project settings:
   - `JWT_SECRET`
4. Deploy.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
