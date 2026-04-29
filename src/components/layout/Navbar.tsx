'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

import { TOKEN_COOKIE_NAME } from '../../lib/constants';

export function Navbar() {
  const router = useRouter();

  const onLogout = () => {
    try {
      deleteCookie(TOKEN_COOKIE_NAME, { path: '/' });
    } finally {
      router.push('/login');
    }
  };

  return (
    <header className="h-14 bg-blue-900 flex justify-between items-center px-6 w-full">
      <div className="text-xl font-bold text-white">MyApp</div>
      <button 
        onClick={onLogout}
        className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition-colors text-sm"
      >
        Logout
      </button>
    </header>
  );
}

