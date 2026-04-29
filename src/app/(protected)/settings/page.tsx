'use client';

import * as React from 'react';

type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="mt-1 text-sm text-gray-600">{description}</div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
          checked ? 'bg-blue-600' : 'bg-gray-200',
        ].join(' ')}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={[
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition',
            checked ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [appearance, setAppearance] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [marketingEmails, setMarketingEmails] = React.useState(false);
  const [autoUpdates, setAutoUpdates] = React.useState(true);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      <div className="space-y-3">
        <Toggle
          label="Appearance"
          description="Use a cleaner, modern look across the app."
          checked={appearance}
          onChange={setAppearance}
        />
        <Toggle
          label="Notifications"
          description="Receive updates about important activity."
          checked={notifications}
          onChange={setNotifications}
        />
        <Toggle
          label="Marketing emails"
          description="Get product tips and occasional announcements."
          checked={marketingEmails}
          onChange={setMarketingEmails}
        />
        <Toggle
          label="Auto updates"
          description="Keep the app updated automatically."
          checked={autoUpdates}
          onChange={setAutoUpdates}
        />
      </div>
    </div>
  );
}

