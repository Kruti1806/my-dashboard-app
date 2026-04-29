'use client';

import * as React from 'react';

export type DataTableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  limit: number;
  onLimitChange: (value: number) => void;
};

export function DataTableToolbar({
  search,
  onSearchChange,
  limit,
  onLimitChange,
}: DataTableToolbarProps) {
  const [inputValue, setInputValue] = React.useState(search);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only sync from outside if input is NOT focused
    if (document.activeElement !== inputRef.current) {
      setInputValue(search);
    }
  }, [search]);

  React.useEffect(() => {
    const t = window.setTimeout(() => onSearchChange(inputValue), 300);
    return () => window.clearTimeout(t);
  }, [inputValue]);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-sm">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search users..."
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="rounded-md border border-gray-300 bg-white px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}