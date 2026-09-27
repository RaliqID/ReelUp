# ReelUp

Short-form video enhancement pipeline with an interactive analysis UI. ReelUp takes source clips, measures their visual quality, and produces enhanced output while showing you exactly how it reached its decisions.

## What It Does

- **Upload & process** â€” drop in a video, run it through the enhancement engine, compare before/after side by side
- **Quality analysis** â€” the engine scores input and output across measurable metrics rather than guessing
- **Research-driven** â€” the feature set is grounded in written problem briefs and user personas (see `docs/research/`)
- **Benchmark lab** â€” a reproducible test runner with a fixed dataset and stored benchmark results

## Features

- Before/after comparison views for source vs. enhanced output
- Analysis panel surfacing the engine's measured quality metrics
- Processing history drawer with past runs
- CLI entry point for batch/scripted use
- Processing modal with live progress

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- Node-based enhancement engine with a CLI front end

## Project Structure

```
src/
  components/     # Navbar, UploadDropzone, AnalysisPanel, ResultComparison, ProcessingModal, ...
  engine/         # analyzer, metrics, processor, profiles
  lab/            # dataset + test_runner (benchmark harness)
  cli/            # command-line entry point
docs/research/    # customer problem brief, quality methodology, user personas
experiments/
  dataset/        # sample clips (cinematic, gaming, dark scene)
  output/         # enhanced 4K results
  data/           # benchmark_results.json
```

## Getting Started

```bash
npm install
npm run dev
```

## Quality Measurement

Quality is assessed with explicit metrics and a stored methodology, not subjective scoring. The benchmark dataset is fixed (`experiments/dataset/`) so results stay comparable across runs, and each run writes to `experiments/data/benchmark_results.json`.

**Author:** Raliq Hidayat BM3
