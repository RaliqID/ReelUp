import { DeliveryProfile, TargetResolution } from '../types/media.js';

export const DELIVERY_PROFILES: Record<string, DeliveryProfile> = {
  'instagram_standard': {
    id: 'instagram_standard',
    name: 'Instagram Standard (1080p)',
    targetPlatform: 'instagram',
    targetWidth: 1080,
    targetHeight: 1920,
    maxFps: 30,
    codec: 'h264',
    profile: 'high',
    level: '4.2',
    targetBitrateKbps: 12000,
    maxBitrateKbps: 14000,
    gopIntervalSeconds: 1,
    pixelFormat: 'yuv420p',
    colorMatrix: 'bt709',
    crf: 19,
    preset: 'slow',
    description: 'Conservative profile matching default mobile player baseline. Guarantees playback compatibility.',
    version: '1.2.0'
  },
  'instagram_high_quality_60fps': {
    id: 'instagram_high_quality_60fps',
    name: 'Instagram High Quality (1080p 60FPS)',
    targetPlatform: 'instagram',
    targetWidth: 1080,
    targetHeight: 1920,
    maxFps: 60,
    codec: 'h264',
    profile: 'high',
    level: '4.2',
    targetBitrateKbps: 16000,
    maxBitrateKbps: 20000,
    gopIntervalSeconds: 1,
    pixelFormat: 'yuv420p',
    colorMatrix: 'bt709',
    crf: 18,
    preset: 'slow',
    description: 'Optimized for high-motion gaming and kinetic footage at 60 FPS with keyframe alignment.',
    version: '1.2.0'
  },
  'instagram_upscale_4k': {
    id: 'instagram_upscale_4k',
    name: 'Instagram 4K Enhanced Delivery',
    targetPlatform: 'instagram',
    targetWidth: 2160,
    targetHeight: 3840,
    maxFps: 60,
    codec: 'h264',
    profile: 'high',
    level: '5.2',
    targetBitrateKbps: 28000,
    maxBitrateKbps: 35000,
    gopIntervalSeconds: 1,
    pixelFormat: 'yuv420p',
    colorMatrix: 'bt709',
    crf: 17,
    preset: 'slow',
    description: 'AI Super-Resolution enhanced master. Engineered to retain micro-contrast and fine detail after server transcoding.',
    version: '2.0.1'
  },
  'instagram_4k_preserve': {
    id: 'instagram_4k_preserve',
    name: 'Instagram 4K Source Preservation',
    targetPlatform: 'instagram',
    targetWidth: 2160,
    targetHeight: 3840,
    maxFps: 60,
    codec: 'h264',
    profile: 'high',
    level: '5.2',
    targetBitrateKbps: 32000,
    maxBitrateKbps: 40000,
    gopIntervalSeconds: 1,
    pixelFormat: 'yuv420p',
    colorMatrix: 'bt709',
    crf: 16,
    preset: 'slower',
    description: 'Targeted for native 4K cinema cameras. Preserves original dynamic range and grain structure with minimal quantization.',
    version: '2.0.1'
  }
};

export function getResolutionDimensions(target: TargetResolution, isVertical: boolean): { width: number; height: number } {
  if (isVertical) {
    switch (target) {
      case '1080p': return { width: 1080, height: 1920 };
      case '1440p': return { width: 1440, height: 2560 };
      case '4k': return { width: 2160, height: 3840 };
    }
  } else {
    switch (target) {
      case '1080p': return { width: 1920, height: 1080 };
      case '1440p': return { width: 2560, height: 1440 };
      case '4k': return { width: 3840, height: 2160 };
    }
  }
}
