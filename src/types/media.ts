export type VerificationStatus = 'VERIFIED' | 'ESTIMATED' | 'UNVERIFIED';

export interface VideoMetadata {
  width: number;
  height: number;
  aspectRatio: string;
  fps: number;
  durationSeconds: number;
  codec: string;
  bitrateBps: number;
  pixelFormat: string;
  colorSpace: string;
  colorPrimaries?: string;
  colorTransfer?: string;
  hasAudio: boolean;
  fileSizeBytes: number;
  fileName: string;
  gopSize?: number;
}

export type EnhancementMode = 'fast' | 'balanced' | 'maximum';
export type TargetResolution = '1080p' | '1440p' | '4k';

export interface DeliveryProfile {
  id: string;
  name: string;
  targetPlatform: 'instagram' | 'tiktok' | 'youtube_shorts' | 'generic';
  targetWidth: number;
  targetHeight: number;
  maxFps: number;
  codec: 'h264' | 'hevc' | 'av1';
  profile: string;
  level: string;
  targetBitrateKbps: number;
  maxBitrateKbps: number;
  gopIntervalSeconds: number;
  pixelFormat: string;
  colorMatrix: 'bt709';
  crf?: number;
  preset: string;
  description: string;
  version: string;
}

export interface AnalysisRecommendation {
  source: VideoMetadata;
  suggestedProfile: DeliveryProfile;
  suggestedResolution: TargetResolution;
  isAlreadyHighQuality4K: boolean;
  needsSuperResolution: boolean;
  needsDenoising: boolean;
  needsDeinterlacing: boolean;
  suggestedMode: EnhancementMode;
  reasoning: string[];
}

export interface ProcessingMetrics {
  vmaf?: number;
  ssim?: number;
  psnrDb?: number;
  temporalStabilityScore?: number; // 0-100
  edgeSharpnessDelta?: number;
  processingDurationMs: number;
  verificationStatus: VerificationStatus;
}

export type JobStep = 
  | 'analyzing'
  | 'preparing_enhancement'
  | 'super_resolution'
  | 'detail_enhancement'
  | 'encoding'
  | 'validating';

export interface ProcessingJob {
  id: string;
  status: 'idle' | 'queued' | 'processing' | 'completed' | 'failed';
  currentStep: JobStep;
  progressPercent: number; // 0 - 100
  stepMessage: string;
  source: VideoMetadata;
  targetResolution: TargetResolution;
  mode: EnhancementMode;
  profile: DeliveryProfile;
  metrics?: ProcessingMetrics;
  inputUrl: string;
  outputUrl?: string;
  originalThumbnailUrl?: string;
  enhancedThumbnailUrl?: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
}
