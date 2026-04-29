'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import type { LoginCredentials } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { Input } from '../../../components/ui/Input';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  const submit = async () => {
    setError('');

    const creds: LoginCredentials = { email: email.trim(), password };

    if (!creds.email || !creds.password) {
      setError('Email and password are required.');
      return;
    }
    if (!isValidEmail(creds.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? 'Login failed.');
        return;
      }

      router.push('/dashboard');
    } catch (e) {
      console.error('Login error:', e);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
        <div className="mb-6 text-center">
          <div className="text-2xl font-extrabold tracking-tight text-blue-600">MyApp</div>
          <div className="mt-2 text-sm text-gray-500">Sign in to your account</div>
        </div>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />

          <div className="pt-1">
            <Button onClick={submit} isLoading={isLoading} disabled={isLoading} variant="primary">
              Log in
            </Button>
          </div>

          {error ? <ErrorMessage message={error} /> : null}
        </div>
      </div>
    </div>
  );
}
