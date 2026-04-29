# MyApp — Authentication Dashboard

A full-stack Next.js 14 application featuring JWT-based authentication, middleware-protected routes, and a server-side paginated user management dashboard built with TanStack Table.

---

## 🔗 Live Demo

🔗 https://my-dashboard-app-sigma.vercel.app

---

## 🔐 Test Credentials

| Role  | Email             | Password |
|-------|-------------------|----------|
| Admin | admin@example.com | admin123 |
| User  | user@example.com  | user123  |

---

## ✅ Features

- JWT Authentication with httpOnly cookies
- Protected routes via Next.js Middleware (Edge Runtime)
- Login page with validation and error messages
- Auto-redirect to `/login` if not authenticated
- Logout clears token and redirects to `/login`
- User management data table with:
  - Server-side pagination
  - Column sorting (ID, Name, Email)
  - Debounced live search (no focus loss)
  - Rows per page selector (10 / 20 / 50)
- Static protected pages — Profile & Settings
- Fully typed with TypeScript strict mode
- Clean, consistent code with Prettier formatting

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript (strict) | Type safety |
| Tailwind CSS | Styling |
| TanStack Table v8 | Data table |
| jose | JWT sign & verify (Edge-compatible) |
| cookies-next | Client-side cookie helpers |
| Prettier | Code formatting |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/           # Public login page
│   ├── (protected)/
│   │   ├── layout.tsx       # Protected layout with Navbar + Sidebar
│   │   ├── dashboard/       # User management data table
│   │   ├── profile/         # Static profile page
│   │   └── settings/        # Static settings page
│   └── api/
│       ├── login/           # POST /api/login
│       └── users/           # GET /api/users
├── components/
│   ├── DataTable/           # DataTable, Toolbar, Pagination, Columns
│   ├── layout/              # Navbar, Sidebar
│   └── ui/                  # Button, Input, Spinner, ErrorMessage
├── hooks/
│   └── useUsers.ts          # Data fetching hook with AbortController
├── lib/
│   ├── auth.ts              # JWT sign & verify using jose
│   ├── constants.ts         # App-wide constants
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # Shared TypeScript types
└── middleware.ts             # Route protection (Edge Runtime)
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Kruti1806/my-dashboard-app.git
cd my-dashboard-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env.local` file in the project root:

```env
JWT_SECRET=supersecret_dev_key_123
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Architecture & Flow

### Authentication Flow

```
User visits /dashboard
      ↓
Middleware checks auth_token cookie
      ↓
Token missing/invalid → redirect to /login
Token valid → allow access
      ↓
User submits login form
      ↓
POST /api/login validates credentials
      ↓
JWT signed and stored as httpOnly cookie
      ↓
Redirect to /dashboard
```

### Route Protection

`src/middleware.ts` protects these routes:
- `/dashboard`
- `/profile`
- `/settings`

Uses `jose` for JWT verification — fully compatible with the **Edge Runtime** (no Node.js-only APIs).

### Data Table Flow

```
URL params (page, limit, sortBy, order, search)
      ↓
useUsers hook fetches GET /api/users
      ↓
API verifies auth_token cookie → 401 if invalid
      ↓
Filters + sorts + paginates 100 mock users
      ↓
Returns PaginatedUsersResponse
      ↓
DataTable renders results
```

---

## 📡 API Reference

### `POST /api/login`

**Request Body**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Success — 200**
```json
{ "success": true }
```

**Failure — 401**
```json
{ "error": "Invalid credentials" }
```

---

### `GET /api/users`

Requires a valid `auth_token` cookie. Returns `401` if missing or invalid.

**Query Parameters**

| Param  | Type                  | Default | Description               |
|--------|-----------------------|---------|---------------------------|
| page   | number                | 1       | Page number               |
| limit  | number                | 10      | Items per page (10/20/50) |
| sortBy | `id` \| `name` \| `email` | id  | Column to sort by         |
| order  | `asc` \| `desc`       | asc     | Sort direction            |
| search | string                | —       | Filter by name or email   |

**Success — 200**
```json
{
  "data": [
    { "id": 1, "name": "User 1", "email": "user1@example.com" }
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

**Unauthorized — 401**
```json
{ "error": "Unauthorized" }
```

---

## 📐 Coding Standards

| Rule | Convention |
|------|------------|
| Components | PascalCase — `DataTable.tsx` |
| Variables / Functions | camelCase — `onSearchChange` |
| Constants | UPPER_SNAKE_CASE — `TOKEN_COOKIE_NAME` |
| Types | No `any` — strict TypeScript throughout |
| Errors | Always shown to the user, never silent |
| Formatting | Prettier enforced project-wide |

---

## ☁️ Deploying to Vercel

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) → click **New Project**
3. Import the `my-dashboard-app` repository
4. Add the following environment variable in Vercel project settings:
   - **Key:** `JWT_SECRET`
   - **Value:** `supersecret_dev_key_123`
5. Click **Deploy**

---

## 👩‍💻 Author

**Kruti Kantariya**
GitHub: [@Kruti1806](https://github.com/Kruti1806)s