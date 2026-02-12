'use client';

import { List, Map } from 'lucide-react';

interface ViewToggleProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-surface2 border border-border rounded-lg p-1">
      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          view === 'list'
            ? 'bg-primary text-black'
            : 'text-muted hover:text-text'
        }`}
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">List</span>
      </button>
      <button
        onClick={() => onViewChange('map')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          view === 'map'
            ? 'bg-primary text-black'
            : 'text-muted hover:text-text'
        }`}
      >
        <Map className="w-4 h-4" />
        <span className="hidden sm:inline">Map</span>
      </button>
    </div>
  );
}
