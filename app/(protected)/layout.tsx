import type { ReactNode } from 'react';

import { Navbar } from '../../src/components/layout/Navbar';
import { Sidebar } from '../../src/components/layout/Sidebar';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

