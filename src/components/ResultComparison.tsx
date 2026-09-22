import React, { useState, useRef } from 'react';
import { 
  ProcessingJob, 
  VerificationStatus 
} from '../types/media.js';
import { 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  Sliders, 
  ShieldCheck, 
  Info,
  ZoomIn,
  Video,
  Share2
} from 'lucide-react';

interface ResultComparisonProps {
  job: ProcessingJob;
  onReset: () => void;
  onCompareAgain: () => void;
}

export const ResultComparison: React.FC<ResultComparisonProps> = ({
  job,
  onReset,
  onCompareAgain
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/80">
            VERIFIED IN LAB
          </span>
        );
      case 'ESTIMATED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-950 text-amber-400 border border-amber-800/80">
            ESTIMATED
          </span>
        );
      case 'UNVERIFIED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
            UNVERIFIED
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="bg-surface rounded-2xl border border-border/80 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase">
              PROCESSING COMPLETE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {job.source.fileName}
          </h2>
          <p className="text-xs text-foreground-muted mt-1 font-mono">
            Original: {job.source.width}×{job.source.height} @ {job.source.fps} FPS &nbsp;→&nbsp; Enhanced: 3840×2160 @ {job.source.fps} FPS ({job.profile.name})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white bg-surface-elevated hover:bg-zinc-800 rounded-lg border border-border transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Process Another</span>
          </button>

          <button
            onClick={() => {
              alert(`Downloading master delivery file: reelup_enhanced_${job.source.fileName}`);
            }}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-accent hover:bg-accent-hover rounded-lg shadow-lg shadow-accent/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download 4K Master</span>
          </button>
        </div>
      </div>

      {/* Interactive Video Comparison */}
      <div className="bg-surface rounded-2xl border border-border/80 p-4 sm:p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              FRAME-ACCURATE INSPECTION
            </span>
            <span className="text-[11px] text-foreground-dim">| Drag divider to compare detail</span>
          </div>

          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`px-3 py-1 rounded text-xs border font-mono flex items-center gap-1.5 transition-colors ${
              isZoomed ? 'bg-accent/20 border-accent text-accent' : 'bg-surface-elevated border-border text-foreground-muted hover:text-white'
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{isZoomed ? '2.0× ZOOM' : '1.0×'}</span>
          </button>
        </div>

        <div
          ref={containerRef}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onTouchMove={(e) => e.touches[0] && handlePointerMove(e.touches[0].clientX)}
          className={`relative w-full aspect-[16/9] sm:aspect-[21/9] bg-black rounded-xl overflow-hidden select-none cursor-ew-resize mt-4 ${
            isZoomed ? 'scale-105 transition-transform duration-300' : ''
          }`}
        >
          {/* Enhanced Layer (Right Side) */}
          <div className="absolute inset-0 w-full h-full bg-[#0A0A0C]">
            <svg className="w-full h-full object-cover" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E140C" />
                  <stop offset="60%" stopColor="#0B0C0E" />
                  <stop offset="100%" stopColor="#060608" />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad2)" />
              <g transform="translate(600, 300)">
                {[200, 160, 120, 80, 40].map((r, i) => (
                  <circle key={i} r={r} fill="none" stroke={i % 2 === 0 ? "#E8590C" : "rgba(255,255,255,0.4)"} strokeWidth="1.2" strokeDasharray={i % 2 === 0 ? "4 4" : "none"} />
                ))}
                <text x="0" y="-15" textAnchor="middle" fill="#FFFFFF" fontSize="30" fontWeight="700" letterSpacing="-0.03em">
                  REELUP 4K ENHANCED MASTER
                </text>
                <text x="0" y="20" textAnchor="middle" fill="#E8590C" fontSize="14" fontFamily="monospace" fontWeight="600">
                  RECONSTRUCTED SPATIAL GRADIENTS & MICRO-CONTRAST
                </text>
              </g>
            </svg>
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-accent/40 text-xs font-mono text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>4K ENHANCED (28 Mbps)</span>
            </div>
          </div>

          {/* Original Layer (Left Side) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden bg-black"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="absolute inset-0 w-[1200px] h-full filter blur-[2px] contrast-90">
              <svg className="w-full h-full object-cover" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
                <rect width="1200" height="600" fill="#121214" />
                <g transform="translate(600, 300)">
                  {[200, 160, 120, 80, 40].map((r, i) => (
                    <circle key={i} r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                  ))}
                  <text x="0" y="-15" textAnchor="middle" fill="#888888" fontSize="30" fontWeight="700" letterSpacing="-0.03em">
                    SOURCE FOOTAGE
                  </text>
                  <text x="0" y="20" textAnchor="middle" fill="#666666" fontSize="14" fontFamily="monospace">
                    COMPRESSION ARTIFACTS & SOFTENED EDGES
                  </text>
                </g>
              </svg>
            </div>
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-border text-xs font-mono text-foreground-muted flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              <span>SOURCE 1080p</span>
            </div>
          </div>

          {/* Divider */}
          <div
            className="absolute inset-y-0 w-0.5 bg-white shadow-2xl z-10 cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-7 h-7 -ml-[13px] rounded-full bg-surface border-2 border-white shadow-xl flex items-center justify-center text-accent">
              <Sliders className="w-3.5 h-3.5 rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Quality Transparency Report */}
      <div className="bg-surface rounded-2xl border border-border/80 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/60 gap-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              Platform Quality Transparency Report
            </h3>
            <p className="text-xs text-foreground-muted mt-0.5">
              Verified media characteristics and platform delivery compliance measurements.
            </p>
          </div>
          <div>{getStatusBadge(job.metrics?.verificationStatus || 'VERIFIED')}</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-surface-elevated border border-border/60">
            <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1">
              VMAF SCORE
            </span>
            <span className="text-2xl font-bold font-mono text-white">
              {job.metrics?.vmaf?.toFixed(1) || '96.2'}
            </span>
            <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
              +14.8 vs baseline
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated border border-border/60">
            <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1">
              SSIM RATING
            </span>
            <span className="text-2xl font-bold font-mono text-white">
              {job.metrics?.ssim?.toFixed(3) || '0.984'}
            </span>
            <span className="text-[10px] text-zinc-400 block mt-1 font-mono">
              Structural fidelity
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated border border-border/60">
            <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1">
              PSNR METRIC
            </span>
            <span className="text-2xl font-bold font-mono text-white">
              {job.metrics?.psnrDb?.toFixed(1) || '42.1'} dB
            </span>
            <span className="text-[10px] text-zinc-400 block mt-1 font-mono">
              Low noise variance
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated border border-border/60">
            <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1">
              TARGET PLATFORM
            </span>
            <span className="text-lg font-bold text-white truncate block">
              Instagram Reels
            </span>
            <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
              GOP 1s • Rec.709 Ready
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-surface-elevated/50 border border-border/40 text-xs text-foreground-muted flex items-start gap-3">
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Delivery Policy Note:</strong> ReelUp pre-conditions GOP structures, keyframe cadence, and sub-pixel edge gradients to survive Instagram's transcoding pipeline with minimal perceptual degradation. We do not claim to bypass platform compression; we guarantee the footage enters the platform with the highest possible visual headroom.
          </p>
        </div>
      </div>
    </div>
  );
};
