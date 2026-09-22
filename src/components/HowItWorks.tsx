import React from 'react';
import { Upload, Search, Wand2, ArrowDownToLine } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Upload,
      title: 'Upload',
      desc: 'Drop your source video. Supports 720p, 1080p, 1440p, or 4K in MP4, ProRes MOV, or WebM formats.'
    },
    {
      num: '02',
      icon: Search,
      title: 'Analyze',
      desc: 'The media engine probes resolution, FPS, codec profile, compression noise, and color space characteristics.'
    },
    {
      num: '03',
      icon: Wand2,
      title: 'Enhance',
      desc: 'AI Super-Resolution reconstructs sub-pixel contours and fine textures with zero plastic-smoothing artifacts.'
    },
    {
      num: '04',
      icon: ArrowDownToLine,
      title: 'Export',
      desc: 'Encode with calibrated GOP cadence and bitrate capping, ready for upload to Instagram Reels with maximum visual retention.'
    }
  ];

  return (
    <section id="workflow" className="py-24 hairline-border-t bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
            THE WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Four steps from source to social delivery
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base">
            No complex codec configuration or manual CRF tuning. The engine determines what can be improved and applies the optimal pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-surface rounded-xl border border-border/80 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold font-mono text-zinc-600 group-hover:text-accent transition-colors">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 text-[10px] font-mono text-zinc-600 uppercase">
                  AUTOMATED PIPELINE
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
