import React from 'react';
import { ArrowRight, AlertTriangle, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';

export const SocialQualitySection: React.FC = () => {
  return (
    <section id="problem" className="py-24 hairline-border-t bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
            THE ROOT PROBLEM
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Your video shouldn’t look worse after upload.
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
            You shoot in 4K, export at 80 Mbps, and spend hours grading. But when Instagram's ingestion pipeline processes your file, it aggressively recompresses it into muddy, blurred frames.
          </p>
        </div>

        {/* Side-by-side Pipeline Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Upload Flow */}
          <div className="bg-surface rounded-2xl border border-red-900/30 p-8 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-red-950/80 text-red-400 border border-red-800/40">
                  STANDARD UPLOAD WORKFLOW
                </span>
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>

              <div className="space-y-4 font-mono text-xs text-zinc-400">
                <div className="p-3.5 rounded-lg bg-background border border-border">
                  <div className="text-white font-semibold">1. High Bitrate Export (50-100 Mbps)</div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">Arbitrary GOP cadence, unconditioned color matrix</div>
                </div>

                <div className="flex justify-center text-zinc-600">↓</div>

                <div className="p-3.5 rounded-lg bg-background border border-border">
                  <div className="text-white font-semibold">2. Instagram Server Ingestion</div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">Heavy re-quantization down to ~3.8 Mbps</div>
                </div>

                <div className="flex justify-center text-zinc-600">↓</div>

                <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-800/40 text-red-200">
                  <div className="font-semibold text-red-400">3. End Result: Severe Quality Loss</div>
                  <div className="text-[11px] mt-1 text-red-300/80">
                    Blurred facial hair, smudged skin pores, aliased micro-text, and macroblock flickering during fast motion.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 text-xs text-zinc-500 font-mono">
              STATUS: UNCONTROLLED TRANSCODING
            </div>
          </div>

          {/* ReelUp Pre-Engineered Flow */}
          <div className="bg-surface rounded-2xl border border-accent/40 p-8 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-accent/5">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent/15 text-accent border border-accent/30">
                  REELUP DELIVERY PIPELINE
                </span>
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>

              <div className="space-y-4 font-mono text-xs text-zinc-400">
                <div className="p-3.5 rounded-lg bg-background border border-border">
                  <div className="text-white font-semibold">1. AI Super-Resolution & Micro-Contrast</div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">Reconstructs true sub-pixel edges without halo artifacts</div>
                </div>

                <div className="flex justify-center text-accent">↓</div>

                <div className="p-3.5 rounded-lg bg-background border border-border">
                  <div className="text-white font-semibold">2. Calibrated Delivery Profile Encoding</div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">Keyframes locked at 1.0s interval, Rec.709 color matrix, VBV buffer-capped</div>
                </div>

                <div className="flex justify-center text-accent">↓</div>

                <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                  <div className="font-semibold text-emerald-400">3. End Result: Maximum Retained Detail</div>
                  <div className="text-[11px] mt-1 text-emerald-300/80">
                    Engineered to preserve facial texture, clean typography, and motion stability through social media transcoding.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 text-xs text-accent font-mono">
              STATUS: MEASURED & EXPERIMENTALLY VALIDATED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
