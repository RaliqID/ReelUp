import React, { useState } from 'react';
import { 
  VideoMetadata, 
  AnalysisRecommendation, 
  TargetResolution, 
  EnhancementMode 
} from '../types/media.js';
import { Sparkles, Check, ArrowRight, Video, Gauge, Film, Cpu, HardDrive } from 'lucide-react';

interface AnalysisPanelProps {
  metadata: VideoMetadata;
  recommendation: AnalysisRecommendation;
  onConfirmProcessing: (targetRes: TargetResolution, mode: EnhancementMode) => void;
  onCancel: () => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  metadata,
  recommendation,
  onConfirmProcessing,
  onCancel
}) => {
  const [targetRes, setTargetRes] = useState<TargetResolution>(recommendation.suggestedResolution);
  const [mode, setMode] = useState<EnhancementMode>('balanced');

  const formatBitrate = (bps: number) => {
    return `${(bps / 1000000).toFixed(1)} Mbps`;
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-surface rounded-2xl border border-border/80 p-6 sm:p-8 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/60 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold block mb-1">
            ANALYSIS COMPLETE
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {metadata.fileName}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-foreground-muted hover:text-white bg-surface-elevated rounded-md border border-border transition-colors"
          >
            Change Footage
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Source Footage Technical Specs */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-dim">
            SOURCE SPECIFICATIONS
          </h3>

          <div className="bg-background rounded-xl p-4 border border-border/60 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-zinc-500 flex items-center gap-2">
                <Video className="w-3.5 h-3.5" /> Resolution
              </span>
              <span className="text-white font-medium">
                {metadata.width} × {metadata.height} ({metadata.aspectRatio})
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-zinc-500 flex items-center gap-2">
                <Gauge className="w-3.5 h-3.5" /> Frame Rate
              </span>
              <span className="text-white font-medium">{metadata.fps} FPS</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-zinc-500 flex items-center gap-2">
                <Film className="w-3.5 h-3.5" /> Video Codec
              </span>
              <span className="text-white font-medium uppercase">{metadata.codec}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-zinc-500 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" /> Bitrate
              </span>
              <span className="text-white font-medium">{formatBitrate(metadata.bitrateBps)}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-500 flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5" /> Duration & Size
              </span>
              <span className="text-white font-medium">
                {metadata.durationSeconds.toFixed(1)}s • {formatSize(metadata.fileSizeBytes)}
              </span>
            </div>
          </div>

          {/* Diagnosis Badge */}
          <div className="p-4 rounded-xl bg-surface-elevated border border-border/60">
            <span className="text-xs font-mono text-zinc-400 block mb-2 font-semibold">
              ENGINE DIAGNOSIS:
            </span>
            <ul className="space-y-1.5 text-xs text-foreground-muted">
              {recommendation.reasoning.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Enhancement Recommendation & Settings */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-surface-elevated to-surface p-6 rounded-xl border border-accent/30 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-accent px-2.5 py-0.5 rounded bg-accent/15 border border-accent/20">
                RECOMMENDED PIPELINE
              </span>
              <span className="text-xs text-zinc-400 font-mono">Instagram Delivery Ready</span>
            </div>

            <h4 className="text-lg font-bold text-white tracking-tight mb-1">
              {recommendation.isAlreadyHighQuality4K
                ? 'High-Bitrate 4K Quality Preservation'
                : 'AI Super-Resolution to 4K Master'}
            </h4>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {recommendation.isAlreadyHighQuality4K
                ? 'Maintains pristine source pixels while conditioning GOP intervals and color matrices for Instagram servers.'
                : 'Reconstructs structural micro-edges and fine facial/texture details without introducing artificial halo ringing.'}
            </p>
          </div>

          {/* Target Resolution Selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-foreground-dim block mb-2.5">
              TARGET RESOLUTION
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['1080p', '1440p', '4k'] as TargetResolution[]).map((res) => {
                const isSelected = targetRes === res;
                return (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setTargetRes(res)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-border bg-surface-elevated hover:border-zinc-700'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-white uppercase">{res}</span>
                    <span className="block text-[11px] text-foreground-muted font-mono mt-0.5">
                      {res === '4k' ? '3840×2160' : res === '1440p' ? '2560×1440' : '1920×1080'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Processing Quality Mode */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-foreground-dim block mb-2.5">
              PROCESSING PROFILE
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'fast', label: 'Fast', desc: 'Lightweight bicubic + micro-sharpening' },
                { id: 'balanced', label: 'Balanced', desc: 'AI Lanczos + ringing-suppressed contrast' },
                { id: 'maximum', label: 'Maximum', desc: 'Full multi-pass reconstruction & grain retention' }
              ].map((m) => {
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as EnhancementMode)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-border bg-surface-elevated hover:border-zinc-700'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-white">{m.label}</span>
                    <span className="block text-[11px] text-foreground-muted leading-tight mt-1">
                      {m.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="pt-2">
            <button
              onClick={() => onConfirmProcessing(targetRes, mode)}
              className="w-full py-4 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg shadow-lg shadow-accent/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Enhance Video ({targetRes.toUpperCase()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
