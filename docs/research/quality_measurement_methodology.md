# Quality Measurement Methodology & Decision Framework

## 1. Principles
1. **Evidence Before Claims**: Never claim a profile produces "uncompressed" or "lossless" results on Instagram. All platform results must be designated `VERIFIED`, `ESTIMATED`, or `UNVERIFIED`.
2. **Beyond Simple Resizing**: A file with 3840×2160 container dimensions is not 4K unless high-frequency spatial gradients and micro-textures are measurably present.
3. **Artifact Penalization**: Enhancements that increase raw sharpness at the expense of halos, ringing, temporal flickering, or waxy textures receive a score penalty.

---

## 2. Objective Metric Stack

| Metric | Target | Toolchain | Interpretation |
| :--- | :--- | :--- | :--- |
| **VMAF** (Video Multi-Method Assessment Fusion) | >= 92.0 | `ffmpeg -lavfi libvmaf` | Best overall correlation with human subjective quality. Scores < 85 indicate noticeable degradation. |
| **SSIM** (Structural Similarity Index) | >= 0.965 | `ffmpeg -lavfi ssim` | Measures structural distortion, luminance, and contrast retention. |
| **PSNR** (Peak Signal-to-Noise Ratio) | >= 38.0 dB | `ffmpeg -lavfi psnr` | Measures pixel-level variance and compression noise. |

---

## 3. Human Visual Inspection Rubric (Scale 1–5)

To prevent models from optimizing for synthetic metrics at the cost of perceptual realism, each test run is evaluated on 6 perceptual axes:

1. **Edge Sharpness & Halos**: Are edges crisp without white/dark overshoot boundaries?
2. **Texture & Micro-Detail**: Are fabric, hair strands, and foliage natural, or blurred into smeared patches?
3. **Skin & Face Realism**: Does human skin retain pores and natural tones, or resemble plastic wax?
4. **Text & Geometric Line Clarity**: Are small fonts, UI symbols, and straight lines razor-sharp without warping?
5. **Temporal Consistency**: When played at native FPS (24/30/60), is there frame-to-frame shimmer or flickering?
6. **Artifact Suppression**: Are source macroblocking and banding removed rather than sharpened?

---

## 4. Controlled Instagram Delivery Matrix

To experimentally test how Instagram transcodes different ingest configurations, we establish 5 primary delivery profiles:

- `IG-STD-1080P`: Standard baseline 1080×1920 (9:16), 30fps, H.264 High Profile, Level 4.2, 12 Mbps CBR, GOP=30 (1s), YUV420p Rec.709.
- `IG-HQ-1080P-60`: Smooth motion profile 1080×1920, 60fps, H.264 High, Level 4.2, 16 Mbps, GOP=60 (1s), YUV420p Rec.709.
- `IG-ENH-4K-UPSCALE`: Super-resolution reconstructed 2160×3840 (9:16), 30/60fps, H.264 High Profile Level 5.2, 28 Mbps, GOP=60, YUV420p.
- `IG-4K-PRESERVE`: 4K source preservation profile with adaptive CRF 17-19, VBV buffer cap 35 Mbps to avoid server-side hard truncation.
- `IG-AV1-NEXTGEN`: Experimental AV1 encoding profile for platforms rolling out next-gen hardware decoders.
