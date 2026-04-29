import * as React from 'react';

export type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={[
          'h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900',
          className ?? '',
        ].join(' ')}
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}
