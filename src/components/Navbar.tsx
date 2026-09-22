import React from 'react';
import { History, Play, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenUpload: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenUpload, onOpenHistory, historyCount }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md hairline-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center group-hover:border-accent transition-colors">
            <svg className="w-4 h-4 text-accent fill-current" viewBox="0 0 24 24">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base tracking-tight text-white flex items-center gap-1.5">
              ReelUp
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-elevated text-foreground-muted border border-border/50 font-mono">
                v0.1-lab
              </span>
            </span>
          </div>
        </a>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm text-foreground-muted">
          <a href="#transformation" className="hover:text-foreground transition-colors">Transformation</a>
          <a href="#problem" className="hover:text-foreground transition-colors">The Problem</a>
          <a href="#workflow" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#methodology" className="hover:text-foreground transition-colors">Lab & Specs</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-foreground-muted hover:text-white bg-surface hover:bg-surface-elevated border border-border rounded-md transition-colors"
            title="Processing History"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-accent/20 text-accent text-[10px] flex items-center justify-center font-mono font-medium ml-1">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenUpload}
            className="flex items-center space-x-2 px-4 py-2 text-xs font-medium text-white bg-accent hover:bg-accent-hover rounded-md shadow-sm shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Enhance Video</span>
            <Play className="w-3 h-3 fill-white" />
          </button>
        </div>
      </div>
    </header>
  );
};
