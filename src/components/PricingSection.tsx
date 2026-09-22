import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  const tiers = [
    {
      name: 'Free Lab',
      price: '$0',
      period: 'forever',
      desc: 'Test the enhancement engine with your own clips.',
      features: [
        '3 video enhancements per month',
        'Up to 1080p → 4K AI Super Resolution',
        'Standard Instagram delivery profile',
        'Interactive Before/After inspection',
        'Basic quality transparency report'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Creator',
      price: '$19',
      period: 'per month',
      desc: 'For solo creators and videographers publishing daily Reels.',
      features: [
        '50 video enhancements per month',
        '60 FPS high-motion gaming & kinetic profile',
        'Native 4K preservation pipeline',
        'Zero queue wait / Priority GPU processing',
        'Full VMAF, SSIM, and PSNR diagnostics',
        'Direct download master files'
      ],
      cta: 'Get Creator Access',
      popular: true
    },
    {
      name: 'Studio Pro',
      price: '$49',
      period: 'per month',
      desc: 'For agencies and production teams managing multiple client feeds.',
      features: [
        'Unlimited video processing',
        'Apple ProRes 422 & 10-bit HDR input support',
        'Custom delivery profiles for Instagram & TikTok',
        'Batch queue processing (Phase 15)',
        'Team collaboration & shared presets',
        'Dedicated processing node'
      ],
      cta: 'Get Studio Pro',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 hairline-border-t bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
            TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Invest in your visual reputation.
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base">
            No convoluted tokens or hidden compression fees. Pay for high-fidelity processing that preserves your work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                t.popular
                  ? 'bg-surface border-2 border-accent shadow-2xl shadow-accent/10 relative scale-100 md:-translate-y-2'
                  : 'bg-surface border border-border/80 hover:border-zinc-700'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-mono font-semibold px-3 py-0.5 rounded-full uppercase shadow-md">
                  MOST POPULAR FOR CREATORS
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{t.name}</h3>
                </div>
                <p className="text-xs text-foreground-muted mb-6 leading-relaxed">
                  {t.desc}
                </p>

                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-extrabold font-mono text-white">
                    {t.price}
                  </span>
                  <span className="text-xs text-foreground-dim font-mono">
                    /{t.period}
                  </span>
                </div>

                <div className="space-y-3 pt-6 border-t border-border/60">
                  {t.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <button
                  onClick={onSelectTier}
                  className={`w-full py-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    t.popular
                      ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25'
                      : 'bg-surface-elevated hover:bg-zinc-800 text-white border border-border'
                  }`}
                >
                  <span>{t.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
