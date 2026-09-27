#!/usr/bin/env node
/**
 * Fetches the ReelUp benchmark dataset.
 *
 * The clips are large binaries and are deliberately kept out of git history
 * (see .gitignore). They live as release assets so the benchmark stays
 * reproducible without bloating the repository.
 *
 * Usage:
 *   node scripts/fetch-dataset.mjs
 */

import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const datasetDir = join(root, "experiments", "dataset");

const DATASET_TAG = "dataset-v1";
const REPO = "RaliqID/ReelUp";

/** Files the benchmark expects, in the order they are reported. */
const FILES = [
  "CLIP-A-CINEMATIC.mp4",
  "CLIP-B-GAMING.mp4",
  "CLIP-C-DARKSCENE.mp4",
];

/** Resolves the direct download URL for one release asset. */
function assetUrl(name) {
  return `https://github.com/${REPO}/releases/download/${DATASET_TAG}/${name}`;
}

/** Reads the repository name to use, allowing an env override for forks. */
async function resolveRepo() {
  try {
    const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
    if (pkg.dataset?.repo) return pkg.dataset.repo;
  } catch {
    // Fall back to the hard-coded upstream repository.
  }
  return REPO;
}

async function download(url, destination) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok || !response.body) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  await pipeline(response.body, createWriteStream(destination));
}

async function main() {
  const repo = await resolveRepo();
  mkdirSync(datasetDir, { recursive: true });

  let failures = 0;
  for (const name of FILES) {
    const destination = join(datasetDir, name);
    if (existsSync(destination)) {
      console.log(`skip    ${name} (already present)`);
      continue;
    }
    const url = `https://github.com/${repo}/releases/download/${DATASET_TAG}/${name}`;
    process.stdout.write(`fetch   ${name} ... `);
    try {
      await download(url, destination);
      console.log("ok");
    } catch (error) {
      failures += 1;
      console.log(`failed (${error.message})`);
    }
  }

  if (failures > 0) {
    console.error(
      `\n${failures} file(s) could not be downloaded. ` +
        `Check that release "${DATASET_TAG}" exists at https://github.com/${repo}/releases`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(`\nDataset ready in experiments/dataset/`);
}

main();
