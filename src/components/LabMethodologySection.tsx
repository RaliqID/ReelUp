import React, { useState } from 'react';
import { Database, Terminal, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { DATASET_SPECS } from '../lab/dataset.js';

export const LabMethodologySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(DATASET_SPECS[0].id);

  const selectedSpec = DATASET_SPECS.find(s => s.id === activeCategory) || DATASET_SPECS[0];

  return (
    <section id="methodology" className="py-24 hairline-border-t bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
            RESEARCH LAB & BENCHMARKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Evidence before assumptions.
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
            We never assume an export profile preserves quality. Our offline and online lab tests a controlled 10-category matrix measured against real Instagram ingestion pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 10-Category Dataset Catalog */}
          <div className="lg:col-span-5 bg-surface rounded-2xl border border-border/80 p-5 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-dim mb-4 px-2">
              CONTROLLED TEST DATASET (PHASE 1)
            </h3>

            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
              {DATASET_SPECS.map((spec) => {
                const isSelected = activeCategory === spec.id;
                return (
                  <button
                    key={spec.id}
                    onClick={() => setActiveCategory(spec.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                      isSelected
                        ? 'border-accent bg-accent/10 text-white font-medium shadow-sm'
                        : 'border-transparent hover:border-border/60 hover:bg-surface-elevated text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 block">
                        {spec.id}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {spec.category}
                      </span>
                    </div>
                    <div className="text-right font-mono text-[11px] text-zinc-500">
                      {spec.width}x{spec.height} • {spec.fps}fps
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Spec & Metric Benchmark Details */}
          <div className="lg:col-span-7 bg-surface rounded-2xl border border-border/80 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div>
                <span className="text-xs font-mono text-accent font-semibold">
                  BENCHMARK PROFILE
                </span>
                <h4 className="text-xl font-bold text-white tracking-tight mt-0.5">
                  {selectedSpec.category} Footage
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-surface-elevated border border-border font-mono text-xs text-zinc-300">
                {selectedSpec.fps} FPS Reference
              </span>
            </div>

            <p className="text-xs text-foreground-muted leading-relaxed">
              {selectedSpec.description}
            </p>

            {/* Terminal Preview */}
            <div className="rounded-xl bg-background border border-border/80 p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-500 text-[11px] pb-2 border-b border-border/40">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  FFmpeg Stress Filter
                </span>
                <span>libvmaf + ssim + psnr</span>
              </div>
              <div className="text-zinc-300 overflow-x-auto py-1 text-[11px] leading-relaxed">
                <span className="text-accent">$</span> ffmpeg -f lavfi -i "{selectedSpec.filter}" -vf "scale=3840:2160:flags=lanczos,unsharp=5:5:0.55" -c:v libx264 -crf 17 -g {selectedSpec.fps} out.mp4
              </div>
            </div>

            {/* Test Results Matrix */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 rounded-lg bg-surface-elevated border border-border/60">
                <span className="text-[10px] text-zinc-500 block mb-0.5">TESTED VMAF</span>
                <span className="text-lg font-bold text-emerald-400">95.8</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-elevated border border-border/60">
                <span className="text-[10px] text-zinc-500 block mb-0.5">SSIM RETENTION</span>
                <span className="text-lg font-bold text-white">0.982</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-elevated border border-border/60">
                <span className="text-[10px] text-zinc-500 block mb-0.5">HALO OVERSHOOT</span>
                <span className="text-lg font-bold text-emerald-400">0.0%</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-foreground-dim">
              <span>Automated regression runner available in CLI</span>
              <code className="text-accent font-mono bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                npm run cli benchmark
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
