'use client';

import * as React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: ButtonVariant;
};

export function Button({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

  const variantClass =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600'
      : variant === 'secondary'
        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400'
        : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`${base} ${variantClass} w-full`}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span className="sr-only">Loading</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
