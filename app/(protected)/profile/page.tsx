export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <span className="text-lg font-semibold">U</span>
          </div>

          <div className="min-w-0">
            <div className="truncate text-lg font-semibold text-gray-900">Demo User</div>
            <div className="truncate text-sm text-gray-600">user@example.com</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-gray-50 p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Role</div>
            <div className="mt-1 text-sm font-medium text-gray-900">user</div>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Account</div>
            <div className="mt-1 text-sm font-medium text-gray-900">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

