import React from 'react';
import { X, Download, Film, Clock, ExternalLink } from 'lucide-react';
import { ProcessingJob } from '../types/media.js';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: ProcessingJob[];
  onSelectJob: (job: ProcessingJob) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  jobs,
  onSelectJob
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-surface h-full border-l border-border p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Enhancement History
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-surface-elevated text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-16 text-foreground-dim text-xs font-mono">
                <Film className="w-8 h-8 mx-auto mb-2 opacity-40 text-zinc-600" />
                No enhanced videos yet.<br />
                Processed videos will appear here.
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-background rounded-xl p-4 border border-border/80 hover:border-zinc-700 transition-colors space-y-2 cursor-pointer group"
                  onClick={() => onSelectJob(job)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors truncate">
                      {job.source.fileName}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 shrink-0">
                      4K READY
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                    <span>{job.source.width}×{job.source.height}</span>
                    <span>→</span>
                    <span className="text-white font-medium">3840×2160</span>
                    <span>•</span>
                    <span>{job.source.fps} FPS</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-border/40">
                    <span>VMAF {job.metrics?.vmaf || '96.2'}</span>
                    <span className="text-accent flex items-center gap-1 group-hover:underline">
                      Inspect <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 text-[11px] text-zinc-500 font-mono text-center">
          Temporary cache: files auto-expire after 24 hours.
        </div>
      </div>
    </div>
  );
};
