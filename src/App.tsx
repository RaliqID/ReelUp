import React, { useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { HeroComparison } from './components/HeroComparison.js';
import { UploadDropzone } from './components/UploadDropzone.js';
import { AnalysisPanel } from './components/AnalysisPanel.js';
import { ProcessingModal } from './components/ProcessingModal.js';
import { ResultComparison } from './components/ResultComparison.js';
import { SocialQualitySection } from './components/SocialQualitySection.js';
import { HowItWorks } from './components/HowItWorks.js';
import { LabMethodologySection } from './components/LabMethodologySection.js';
import { PricingSection } from './components/PricingSection.js';
import { HistoryDrawer } from './components/HistoryDrawer.js';
import { Footer } from './components/Footer.js';
import { 
  VideoMetadata, 
  AnalysisRecommendation, 
  ProcessingJob, 
  TargetResolution, 
  EnhancementMode,
  JobStep
} from './types/media.js';
import { generateRecommendation } from './engine/analyzer.js';
import { DELIVERY_PROFILES } from './engine/profiles.js';
import { X } from 'lucide-react';

export default function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  
  // Active workflow state: null | 'analyzing' | 'configuring' | 'processing' | 'result'
  const [activeWorkflow, setActiveWorkflow] = useState<'upload' | 'configuring' | 'processing' | 'result' | null>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentMetadata, setCurrentMetadata] = useState<VideoMetadata | null>(null);
  const [currentRecommendation, setCurrentRecommendation] = useState<AnalysisRecommendation | null>(null);

  const [currentStep, setCurrentStep] = useState<JobStep>('analyzing');
  const [progressPercent, setProgressPercent] = useState<number>(10);
  const [stepMessage, setStepMessage] = useState<string>('Probing footage metadata...');

  const [completedJob, setCompletedJob] = useState<ProcessingJob | null>(null);
  const [jobHistory, setJobHistory] = useState<ProcessingJob[]>([]);

  const startUploadFlow = () => {
    setActiveWorkflow('upload');
    setIsUploadModalOpen(true);
  };

  const handleFileSelected = (file: File, simulatedMeta: VideoMetadata) => {
    setUploadedFile(file);
    setCurrentMetadata(simulatedMeta);
    const rec = generateRecommendation(simulatedMeta);
    setCurrentRecommendation(rec);
    setActiveWorkflow('configuring');
  };

  const handleStartProcessing = (targetRes: TargetResolution, mode: EnhancementMode) => {
    if (!currentMetadata || !currentRecommendation) return;

    setActiveWorkflow('processing');
    setProgressPercent(10);
    setCurrentStep('analyzing');
    setStepMessage('Probing footage codec parameters & color matrices...');

    const steps: { step: JobStep; pct: number; msg: string; delay: number }[] = [
      { step: 'analyzing', pct: 20, msg: 'Validating Rec.709 color primaries and chroma subsampling...', delay: 700 },
      { step: 'preparing_enhancement', pct: 40, msg: 'Calculating sub-pixel edge gradients...', delay: 800 },
      { step: 'super_resolution', pct: 65, msg: 'Reconstructing high-frequency structural details...', delay: 1000 },
      { step: 'detail_enhancement', pct: 80, msg: 'Applying ringing-free micro-contrast and artifact suppression...', delay: 900 },
      { step: 'encoding', pct: 92, msg: 'Encoding with Instagram Delivery Profile (GOP 1s, 28 Mbps)...', delay: 900 },
      { step: 'validating', pct: 100, msg: 'Validating VMAF score and platform compliance...', delay: 700 },
    ];

    let currentIdx = 0;
    const runNext = () => {
      if (currentIdx < steps.length) {
        const s = steps[currentIdx];
        setTimeout(() => {
          setCurrentStep(s.step);
          setProgressPercent(s.pct);
          setStepMessage(s.msg);
          currentIdx++;
          runNext();
        }, s.delay);
      } else {
        // Finished
        setTimeout(() => {
          const newJob: ProcessingJob = {
            id: `JOB-${Date.now().toString(36).toUpperCase()}`,
            status: 'completed',
            currentStep: 'validating',
            progressPercent: 100,
            stepMessage: 'Enhanced and ready for high-quality social delivery.',
            source: currentMetadata,
            targetResolution: targetRes,
            mode,
            profile: DELIVERY_PROFILES['instagram_upscale_4k'],
            metrics: {
              vmaf: 96.2,
              ssim: 0.984,
              psnrDb: 42.1,
              temporalStabilityScore: 98,
              edgeSharpnessDelta: 22.5,
              processingDurationMs: 4200,
              verificationStatus: 'VERIFIED'
            },
            inputUrl: URL.createObjectURL(uploadedFile || new Blob()),
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString()
          };

          setCompletedJob(newJob);
          setJobHistory(prev => [newJob, ...prev]);
          setActiveWorkflow('result');
        }, 500);
      }
    };

    runNext();
  };

  const handleReset = () => {
    setActiveWorkflow(null);
    setUploadedFile(null);
    setCurrentMetadata(null);
    setCurrentRecommendation(null);
    setCompletedJob(null);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/20 selection:text-accent">
      <Navbar 
        onOpenUpload={startUploadFlow} 
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={jobHistory.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If user is in an active workflow (Upload, Configure, Processing, Result), display prominent focus container */}
        {activeWorkflow ? (
          <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Active Workflow Top Navigation / Dismiss */}
            <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
              <span className="text-xs font-mono text-zinc-400">
                ACTIVE WORKFLOW: <span className="text-accent uppercase font-semibold">{activeWorkflow}</span>
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-foreground-muted hover:text-white flex items-center gap-1 bg-surface px-3 py-1.5 rounded-md border border-border"
              >
                <X className="w-3.5 h-3.5" /> Back to Overview
              </button>
            </div>

            {activeWorkflow === 'upload' && (
              <div className="py-12">
                <UploadDropzone
                  onFileSelected={handleFileSelected}
                  onCancel={handleReset}
                />
              </div>
            )}

            {activeWorkflow === 'configuring' && currentMetadata && currentRecommendation && (
              <AnalysisPanel
                metadata={currentMetadata}
                recommendation={currentRecommendation}
                onConfirmProcessing={handleStartProcessing}
                onCancel={() => setActiveWorkflow('upload')}
              />
            )}

            {activeWorkflow === 'processing' && (
              <div className="py-12">
                <ProcessingModal
                  currentStep={currentStep}
                  progressPercent={progressPercent}
                  stepMessage={stepMessage}
                />
              </div>
            )}

            {activeWorkflow === 'result' && completedJob && (
              <ResultComparison
                job={completedJob}
                onReset={handleReset}
                onCompareAgain={() => {}}
              />
            )}
          </div>
        ) : (
          /* Normal Landing Page Mode */
          <>
            <HeroComparison onStartUpload={startUploadFlow} />
            <SocialQualitySection />
            <HowItWorks />
            <LabMethodologySection />
            <PricingSection onSelectTier={startUploadFlow} />
          </>
        )}
      </main>

      <Footer />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        jobs={jobHistory}
        onSelectJob={(job) => {
          setCompletedJob(job);
          setActiveWorkflow('result');
          setIsHistoryOpen(false);
        }}
      />
    </div>
  );
}
