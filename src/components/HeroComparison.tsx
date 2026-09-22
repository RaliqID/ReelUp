import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ZoomIn, Sliders, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroComparisonProps {
  onStartUpload: () => void;
}

type InspectCategory = 'face' | 'texture' | 'text' | 'motion';

export const HeroComparison: React.FC<HeroComparisonProps> = ({ onStartUpload }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [category, setCategory] = useState<InspectCategory>('face');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handlePointerMove(e.clientX);
    }
  };

  // Footage preset samples for different inspection categories
  const samples = {
    face: {
      title: 'Human Face & Skin Pores',
      subtitle: 'Preserves micro-pore texture without artificial waxy smoothing',
      originalLabel: '1080p H.264 • 12 Mbps (Soft edges, blurred pores)',
      enhancedLabel: '4K AI Super-Resolution • 28 Mbps (Crisp hair strands, natural texture)',
      // We will render high-fidelity SVG/canvas graphics simulating realistic high-frequency detail vs low-frequency blurred video frame
    },
    texture: {
      title: 'Fabric & Architectural Foliage',
      subtitle: 'Reconstructs geometric weave and high-frequency edge contrast',
      originalLabel: '1080p • Macroblock compression artifact smear',
      enhancedLabel: '4K • Sub-pixel edge reconstruction with 0% halo overshoot',
    },
    text: {
      title: 'Micro-Typography & UI Elements',
      subtitle: 'Zero warping or hallucinatory distortion on fine fonts',
      originalLabel: '1080p • Aliased pixel stepping on small font',
      enhancedLabel: '4K • Razor-sharp vector-grade typography',
    },
    motion: {
      title: '60 FPS High-Motion Velocity',
      subtitle: 'Temporal stability across adjacent frames without flickering',
      originalLabel: '60 FPS • Severe motion smear and bitrate choking',
      enhancedLabel: '60 FPS • Keyframe-aligned high bitrate social delivery',
    }
  };

  const currentSample = samples[category];

  return (
    <section id="transformation" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background subtle mesh glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-accent/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/80 text-xs text-foreground-muted mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-zinc-300">Phase 1 Research Engine Active</span>
            <span className="text-zinc-600">|</span>
            <span>Target: Instagram Reels Ingestion</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Make every frame <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              look significantly better.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto font-normal leading-relaxed">
            Engineered AI super-resolution and platform-calibrated processing to push your footage to its highest practical quality before social media compresses it.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartUpload}
              className="w-full sm:w-auto px-6 py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg shadow-lg shadow-accent/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Enhance a Video</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#problem"
              className="w-full sm:w-auto px-6 py-3.5 bg-surface hover:bg-surface-elevated text-zinc-300 hover:text-white text-sm font-medium rounded-lg border border-border transition-colors flex items-center justify-center"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Microcopy Metadata Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10 text-xs font-mono text-foreground-dim mb-6">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">SOURCE:</span>
            <span className="text-zinc-300 bg-surface px-2 py-0.5 rounded border border-border/50">1920×1080 • 60 FPS</span>
          </div>
          <span className="text-accent">→</span>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">PIPELINE:</span>
            <span className="text-zinc-300 bg-surface px-2 py-0.5 rounded border border-border/50">AI SUPER RESOLUTION + UNROUNDED MICRO-CONTRAST</span>
          </div>
          <span className="text-accent">→</span>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">OUTPUT:</span>
            <span className="text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded border border-accent/20">3840×2160 • 60 FPS (28 Mbps)</span>
          </div>
        </div>

        {/* Interactive Comparison Frame */}
        <div className="relative bg-surface rounded-xl border border-border/80 p-2 sm:p-3 shadow-2xl">
          {/* Top toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 px-2 border-b border-border/60">
            {/* Category Selector Tabs */}
            <div className="flex items-center gap-1 bg-surface-elevated p-1 rounded-lg border border-border/50">
              {(['face', 'texture', 'text', 'motion'] as InspectCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded capitalize transition-all ${
                    category === cat
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                      : 'text-foreground-muted hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sub-label & Zoom Toggle */}
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-xs text-foreground-muted">
                {currentSample.subtitle}
              </span>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className={`p-1.5 rounded text-xs border flex items-center gap-1.5 transition-colors ${
                  isZoomed
                    ? 'bg-accent/20 border-accent text-accent'
                    : 'bg-surface-elevated border-border text-foreground-muted hover:text-white'
                }`}
                title="Toggle 2x Macro Inspection Loupe"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">{isZoomed ? '2.0× ZOOM' : '1.0×'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Split View Canvas Container */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className={`relative w-full aspect-[16/9] sm:aspect-[21/9] bg-black rounded-lg overflow-hidden select-none cursor-ew-resize mt-2 ${
              isZoomed ? 'scale-105 transition-transform duration-300' : ''
            }`}
          >
            {/* Background Layer: REELUP 4K ENHANCED (Razor sharp, full high frequency) */}
            <div className="absolute inset-0 w-full h-full bg-[#0A0A0C] flex items-center justify-center">
              {/* Cinematic Visual Representation for Enhanced */}
              <svg className="w-full h-full object-cover" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="enhancedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E1610" />
                    <stop offset="50%" stopColor="#0E0F12" />
                    <stop offset="100%" stopColor="#080809" />
                  </linearGradient>
                  <pattern id="sharpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                  </pattern>
                </defs>

                <rect width="1200" height="600" fill="url(#enhancedGrad)" />
                <rect width="1200" height="600" fill="url(#sharpGrid)" />

                {/* Highly detailed geometric and typography demo */}
                <g transform="translate(600, 300)">
                  {/* High frequency concentric detail */}
                  {[220, 180, 140, 100, 60, 20].map((r, i) => (
                    <circle 
                      key={i} 
                      r={r} 
                      fill="none" 
                      stroke={i % 2 === 0 ? "rgba(232, 89, 12, 0.45)" : "rgba(255, 255, 255, 0.25)"} 
                      strokeWidth="1.2" 
                      strokeDasharray={i % 2 === 0 ? "4 4" : "none"}
                    />
                  ))}
                  
                  {/* Fine micro-lines simulating hair / texture strands */}
                  {Array.from({ length: 48 }).map((_, idx) => {
                    const angle = (idx * 360) / 48;
                    return (
                      <line
                        key={idx}
                        x1="0"
                        y1="0"
                        x2={190 * Math.cos((angle * Math.PI) / 180)}
                        y2={190 * Math.sin((angle * Math.PI) / 180)}
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="0.75"
                      />
                    );
                  })}

                  {/* Razor Sharp Typography */}
                  <text x="0" y="-30" textAnchor="middle" fill="#FFFFFF" fontSize="32" fontWeight="700" letterSpacing="-0.03em">
                    REELUP 4K RECONSTRUCTED
                  </text>
                  <text x="0" y="5" textAnchor="middle" fill="#E8590C" fontSize="15" fontFamily="monospace" fontWeight="600">
                    SUPER RESOLUTION ACTIVE • NO RINGING ARTIFACTS
                  </text>
                  <text x="0" y="32" textAnchor="middle" fill="#A1A1AA" fontSize="12" fontFamily="monospace">
                    VMAF: 96.4 | SSIM: 0.988 | BITRATE: 28.0 Mbps CBR
                  </text>
                </g>
              </svg>

              {/* Tag: Enhanced */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-accent/40 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-white font-medium">REELUP 4K ENHANCED</span>
              </div>
            </div>

            {/* Foreground Layer (Left Side): ORIGINAL 1080p (Softened, compressed, blurred) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden bg-black"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0 w-[1200px] h-full filter blur-[2.4px] contrast-90">
                <svg className="w-full h-full object-cover" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
                  <rect width="1200" height="600" fill="#121214" />
                  <g transform="translate(600, 300)">
                    {[220, 180, 140, 100, 60, 20].map((r, i) => (
                      <circle key={i} r={r} fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3" />
                    ))}
                    <text x="0" y="-30" textAnchor="middle" fill="#A1A1AA" fontSize="32" fontWeight="700" letterSpacing="-0.03em">
                      ORIGINAL 1080P SOURCE
                    </text>
                    <text x="0" y="5" textAnchor="middle" fill="#71717A" fontSize="15" fontFamily="monospace">
                      COMPRESSION BLUR • LOSS OF MICRO-TEXTURE
                    </text>
                    <text x="0" y="32" textAnchor="middle" fill="#52525B" fontSize="12" fontFamily="monospace">
                      VMAF: 81.2 | SSIM: 0.912 | BITRATE: 12.0 Mbps
                    </text>
                  </g>
                </svg>
              </div>

              {/* Tag: Original */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-border text-xs font-mono text-foreground-muted flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                <span>ORIGINAL 1080p</span>
              </div>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute inset-y-0 w-0.5 bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10 cursor-ew-resize flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-7 h-7 -ml-[13px] rounded-full bg-surface border-2 border-white shadow-xl flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-transform">
                <Sliders className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>
          </div>

          {/* Bottom comparison label notes */}
          <div className="mt-3 pt-2 px-2 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground-dim gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Zero artificial plastic smoothing • Strict halo-prevention filter</span>
            </div>
            <div className="font-mono text-zinc-500">
              DRAG SLIDER OR CLICK TO INSPECT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
