'use client';

import * as React from 'react';

export type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
};

export function Input({
  label,
  error,
  type = 'text',
  value,
  onChange,
  placeholder,
}: InputProps) {
  const id = React.useId();

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={[
            'w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors',
            'focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
            error ? 'border-red-500 focus:ring-red-600' : 'border-gray-300',
          ].join(' ')}
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
