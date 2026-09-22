import path from 'path';
import { probeVideoFile, generateRecommendation } from '../engine/analyzer.js';
import { processVideoPipeline } from '../engine/processor.js';
import { DELIVERY_PROFILES } from '../engine/profiles.js';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const fileArg = args[1];

  console.log(`\n=== REELUP SOCIAL VIDEO ENGINE CLI (v0.1.0) ===\n`);

  if (!command || command === '--help' || command === '-h') {
    console.log('Usage:');
    console.log('  tsx src/cli/index.ts analyze <video_path>');
    console.log('  tsx src/cli/index.ts enhance <video_path> [output_path]');
    console.log('  tsx src/cli/index.ts upscale <video_path> --target [1080p|1440p|4k]');
    console.log('  tsx src/cli/index.ts process <video_path> --profile [profile_id]');
    console.log('  tsx src/cli/index.ts benchmark');
    console.log('\nAvailable Profiles:');
    Object.values(DELIVERY_PROFILES).forEach(p => {
      console.log(`  - ${p.id}: ${p.name}`);
    });
    return;
  }

  if (command === 'analyze') {
    if (!fileArg) {
      console.error('Error: specify a video path to analyze.');
      process.exit(1);
    }
    const meta = await probeVideoFile(fileArg);
    const rec = generateRecommendation(meta);

    console.log('FOOTAGE METADATA:');
    console.log(`  Resolution:   ${meta.width}x${meta.height} (${meta.aspectRatio})`);
    console.log(`  Framerate:    ${meta.fps} FPS`);
    console.log(`  Duration:     ${meta.durationSeconds.toFixed(1)}s`);
    console.log(`  Codec:        ${meta.codec.toUpperCase()}`);
    console.log(`  Bitrate:      ${(meta.bitrateBps / 1000000).toFixed(2)} Mbps`);
    console.log(`  Pixel Format: ${meta.pixelFormat} (${meta.colorSpace})`);
    console.log(`  Has Audio:    ${meta.hasAudio ? 'Yes' : 'No'}`);
    console.log('\nRECOMMENDATION:');
    console.log(`  Target:       ${rec.suggestedResolution.toUpperCase()}`);
    console.log(`  Super Res:    ${rec.needsSuperResolution ? 'RECOMMENDED' : 'BYPASS (Source is native 4K)'}`);
    console.log(`  Profile:      ${rec.suggestedProfile.name}`);
    console.log('  Reasoning:');
    rec.reasoning.forEach(r => console.log(`    * ${r}`));
    return;
  }

  if (command === 'enhance' || command === 'upscale' || command === 'process') {
    if (!fileArg) {
      console.error('Error: specify an input video file.');
      process.exit(1);
    }

    const defaultOut = path.join(path.dirname(fileArg), `reelup_enhanced_${path.basename(fileArg)}`);
    const outputPath = args[2] && !args[2].startsWith('--') ? args[2] : defaultOut;

    let targetResolution: any = '4k';
    const targetIdx = args.indexOf('--target');
    if (targetIdx !== -1 && args[targetIdx + 1]) {
      targetResolution = args[targetIdx + 1];
    }

    let profileId = 'instagram_upscale_4k';
    const profIdx = args.indexOf('--profile');
    if (profIdx !== -1 && args[profIdx + 1]) {
      profileId = args[profIdx + 1];
    }

    console.log(`[ReelUp] Processing: ${fileArg}`);
    console.log(`[ReelUp] Target Resolution: ${targetResolution.toUpperCase()}`);
    console.log(`[ReelUp] Delivery Profile:  ${profileId}`);
    console.log(`[ReelUp] Output File:       ${outputPath}\n`);

    const job = await processVideoPipeline({
      inputPath: fileArg,
      outputPath,
      targetResolution,
      mode: 'balanced',
      profileId,
      onProgress: (step, percent, msg) => {
        console.log(`[${percent}%] ${step.toUpperCase()}: ${msg}`);
      }
    });

    console.log('\nSUCCESS! Video ready for social delivery.');
    console.log(`Output: ${job.outputUrl}`);
    if (job.metrics) {
      console.log(`VMAF Score:  ${job.metrics.vmaf}`);
      console.log(`SSIM:        ${job.metrics.ssim}`);
      console.log(`PSNR:        ${job.metrics.psnrDb} dB`);
      console.log(`Status:      ${job.metrics.verificationStatus}`);
    }
    return;
  }

  if (command === 'benchmark') {
    const { exec } = await import('child_process');
    exec('npx tsx src/lab/test_runner.ts', (err, stdout, stderr) => {
      console.log(stdout);
      if (stderr) console.error(stderr);
    });
    return;
  }

  console.error(`Unknown command: ${command}`);
}

main().catch(console.error);
