import { Suspense } from 'react';

import { DashboardClient } from './DashboardClient';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-gray-600">Loading...</div>}>
      <DashboardClient />
    </Suspense>
  );
}

