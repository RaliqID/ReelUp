import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background hairline-border-t py-12 text-xs font-mono text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded bg-surface border border-border flex items-center justify-center">
            <div className="w-2 h-2 bg-accent rounded-sm" />
          </div>
          <span className="text-zinc-300 font-semibold tracking-tight">ReelUp Media Engine</span>
          <span>© 2026</span>
        </div>

        <p className="text-zinc-600 text-center sm:text-right max-w-md leading-relaxed text-[11px]">
          Engineered for high-quality social delivery. We do not claim to bypass platform transcoding; we guarantee footage enters with maximum visual headroom.
        </p>
      </div>
    </footer>
  );
};
