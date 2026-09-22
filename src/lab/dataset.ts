import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export interface DatasetClipSpec {
  id: string;
  category: string;
  description: string;
  width: number;
  height: number;
  fps: number;
  durationSeconds: number;
  filter: string;
  isDamaged?: boolean;
}

export const DATASET_SPECS: DatasetClipSpec[] = [
  {
    id: 'CLIP-A-CINEMATIC',
    category: 'Cinematic',
    description: 'Slow panning detailed texture gradients with subtle grain',
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 5,
    filter: 'testsrc2=size=1920x1080:rate=30,noise=alls=12:allf=t+u'
  },
  {
    id: 'CLIP-B-GAMING',
    category: 'Gaming',
    description: 'High-motion rapid color shifts and 60fps moving geometry',
    width: 1920,
    height: 1080,
    fps: 60,
    durationSeconds: 5,
    filter: 'mandelbrot=size=1920x1080:rate=60:maxiter=120'
  },
  {
    id: 'CLIP-C-DARKSCENE',
    category: 'Dark Scene',
    description: 'Low-light shadows and dark gradients prone to macroblocking',
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 5,
    filter: 'color=c=black:size=1920x1080:r=30,drawbox=x=400:y=200:w=1120:h=680:color=0x151515@1:t=fill,drawbox=x=600:y=350:w=720:h=380:color=0x252525@1:t=fill,noise=alls=20:allf=t+u'
  },
  {
    id: 'CLIP-D-FINEDETAIL',
    category: 'Fine Detail',
    description: 'High frequency zone plates and fine lines simulating hair and foliage',
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 5,
    filter: 'smptebars=size=1920x1080:rate=30'
  },
  {
    id: 'CLIP-E-VLOG',
    category: 'Vlog / Skin Tones',
    description: 'Organic skin-tone color patches with soft natural motion',
    width: 1080,
    height: 1920,
    fps: 30,
    durationSeconds: 5,
    filter: 'color=c=#D2A180:size=1080x1920:r=30,drawbox=x=200:y=300:w=680:h=800:color=#C58C65@1:t=fill,noise=alls=8:allf=t'
  },
  {
    id: 'CLIP-F-TEXTUI',
    category: 'Text & UI',
    description: 'High-contrast small typography and crisp user interface geometry',
    width: 1080,
    height: 1920,
    fps: 60,
    durationSeconds: 5,
    filter: 'color=c=#0D0D0D:size=1080x1920:r=60,drawbox=x=100:y=200:w=880:h=500:color=#1A1A1A@1:t=fill,drawbox=x=140:y=240:w=800:h=2:color=#E8590C@1:t=fill'
  },
  {
    id: 'CLIP-G-HDR',
    category: 'High Dynamic Range',
    description: 'Wide contrast range from deep black to peak highlights',
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 5,
    filter: 'rgbtestsrc=size=1920x1080:rate=30'
  },
  {
    id: 'CLIP-H-CLEANSTOCK',
    category: 'Clean Reference Stock',
    description: 'Artifact-free master color reference',
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 5,
    filter: 'testsrc=size=1920x1080:rate=30'
  },
  {
    id: 'CLIP-I-DAMAGED',
    category: 'Compression Damaged',
    description: 'Low-bitrate 720p source with severe blocking and blur',
    width: 1280,
    height: 720,
    fps: 24,
    durationSeconds: 5,
    filter: 'testsrc2=size=1280x720:rate=24',
    isDamaged: true
  },
  {
    id: 'CLIP-J-SCREENREC',
    category: 'Screen Recording',
    description: 'Sharp IDE window borders and code syntax text',
    width: 1920,
    height: 1080,
    fps: 60,
    durationSeconds: 5,
    filter: 'color=c=#1E1E1E:size=1920x1080:r=60,drawbox=x=50:y=50:w=1820:h=980:color=#2D2D2D@1:t=fill,drawbox=x=80:y=80:w=600:h=4:color=#007ACC@1:t=fill'
  }
];

export async function generateSyntheticClip(spec: DatasetClipSpec, outputDir: string): Promise<string> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outPath = path.join(outputDir, `${spec.id}.mp4`);
  if (fs.existsSync(outPath)) {
    return outPath;
  }

  const crf = spec.isDamaged ? 38 : 18;
  const bitrate = spec.isDamaged ? '-b:v 1200k -maxrate 1500k' : '-b:v 16M';

  const cmd = `ffmpeg -y -f lavfi -i "${spec.filter}" -t ${spec.durationSeconds} -c:v libx264 -pix_fmt yuv420p -crf ${crf} ${bitrate} -g ${spec.fps} "${outPath}"`;
  
  await execAsync(cmd);
  return outPath;
}
