import React from 'react';
import { JobStep } from '../types/media.js';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

interface ProcessingModalProps {
  currentStep: JobStep;
  progressPercent: number;
  stepMessage: string;
}

export const ProcessingModal: React.FC<ProcessingModalProps> = ({
  currentStep,
  progressPercent,
  stepMessage
}) => {
  const steps: { id: JobStep; label: string }[] = [
    { id: 'analyzing', label: 'Probing footage & color profile' },
    { id: 'preparing_enhancement', label: 'Calculating sub-pixel transformation matrix' },
    { id: 'super_resolution', label: 'AI Super Resolution & Edge Reconstruction' },
    { id: 'detail_enhancement', label: 'Micro-contrast & halo-suppression filter' },
    { id: 'encoding', label: 'Encoding for Instagram Reels (CRF 17, GOP 1s)' },
    { id: 'validating', label: 'Computing VMAF / SSIM & validating compliance' }
  ];

  const stepOrder: JobStep[] = [
    'analyzing',
    'preparing_enhancement',
    'super_resolution',
    'detail_enhancement',
    'encoding',
    'validating'
  ];

  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="max-w-xl mx-auto bg-surface rounded-2xl border border-border/80 p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-border mx-auto flex items-center justify-center text-accent mb-4">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Processing Video
        </h3>
        <p className="text-xs text-foreground-muted mt-1 font-mono">
          {stepMessage}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-border/60 mb-8">
        <div 
          className="bg-accent h-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(232,89,12,0.8)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Pipeline Steps List */}
      <div className="space-y-3.5">
        {steps.map((step, idx) => {
          const isDone = idx < currentIndex || progressPercent >= 100;
          const isCurrent = idx === currentIndex && progressPercent < 100;

          return (
            <div 
              key={step.id} 
              className={`flex items-center justify-between p-3 rounded-lg border text-xs font-mono transition-colors ${
                isCurrent 
                  ? 'bg-accent/10 border-accent/40 text-white'
                  : isDone
                  ? 'bg-surface-elevated/60 border-border/50 text-zinc-400'
                  : 'bg-transparent border-transparent text-zinc-600'
              }`}
            >
              <div className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-accent animate-spin shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-zinc-700 shrink-0" />
                )}
                <span className={isCurrent ? 'font-semibold text-white' : ''}>
                  {step.label}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase">
                {isDone ? 'DONE' : isCurrent ? 'ACTIVE' : 'WAITING'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
