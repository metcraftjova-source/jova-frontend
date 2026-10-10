// Run from the project root (the folder with package.json):
//   npm i -D sharp
//   winget install Gyan.FFmpeg        (once; then reopen the terminal)
//   node optimize-assets.mjs
//
// 1. Converts big PNG/JPG images in src/assets to high-quality WebP
// 2. Re-encodes the heavy videos with ffmpeg at near-lossless quality
// 3. Rewrites every import in src/ to point at the new files
// Originals are moved to ./_originals (nothing is deleted).
//
// SAFE TO RE-RUN / RECOVERS FROM INTERRUPTIONS:
//  - videos are written to a temp file and only renamed when finished,
//    so a Ctrl+C can never leave a half-written video behind
//  - an incomplete video from an earlier run is detected and re-encoded
//  - images/videos that are already converted are re-linked, not skipped

import sharp from 'sharp';
import { execFileSync } from 'child_process';
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, renameSync, existsSync, unlinkSync } from 'fs';
import { join, extname, basename, dirname, relative } from 'path';

const ASSETS = 'src/assets';
const BACKUP = '_originals';
const MIN_IMAGE_BYTES = 200 * 1024;      // leave small logos alone
const kb = (n) => Math.round(n / 1024) + ' KB';

// ---- QUALITY SETTINGS (lower CRF = better quality, bigger file) ----
const IMG_MAX_WIDTH = 2400;    // 2x retina for a 1200px card; never upscaled
const IMG_QUALITY = 92;        // WebP 92 is visually indistinguishable from PNG
const VIDEO_CRF = 20;          // 18-22 = visually lossless; 28+ looks soft
const VIDEO_MAX_HEIGHT = 1080; // never upscaled

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const backup = (file) => {
  if (!existsSync(file)) return;
  const dest = join(BACKUP, relative('.', file));
  mkdirSync(dirname(dest), { recursive: true });
  renameSync(file, dest);
};

// old file name -> new file name. Only added once the NEW file really exists.
const renames = new Map();

/* ---------- 1. images ---------- */
for (const f of walk(ASSETS)) {
  const ext = extname(f).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
  if (statSync(f).size < MIN_IMAGE_BYTES) continue;
  const out = f.slice(0, -ext.length) + '.webp';
  if (!existsSync(out)) {
    const before = statSync(f).size;
    const buf = await sharp(f)
      .resize({ width: IMG_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: IMG_QUALITY, effort: 6 })
      .toBuffer();
    writeFileSync(out, buf);
    console.log(`IMG  ${basename(f)}  ${kb(before)} -> ${kb(statSync(out).size)}`);
  } else {
    console.log(`IMG  ${basename(f)}  already converted - re-linking`);
  }
  renames.set(basename(f), basename(out));
  backup(f);
}

/* ---------- 2. videos ---------- */
// the scrubbed about video needs frequent keyframes (-g) so seeking stays smooth
const scaleFilter = `scale=-2:min(${VIDEO_MAX_HEIGHT}\\,ih)`;
const VIDEOS = [
  {
    src: 'WinChamp_CNC_Laser_Cutting_Machine_High-Speed_Precision_Fiber_Laser_by_Winarc.mp4',
    out: 'winchamp-opt.mp4',
    args: ['-vf', scaleFilter, '-crf', String(VIDEO_CRF)],
  },
  {
    src: 'about-hero.mp4',
    out: 'about-hero-opt.mp4',
    args: ['-vf', scaleFilter, '-crf', String(VIDEO_CRF), '-g', '6'],
  },
];

let haveFfmpeg = true;
try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  execFileSync('ffprobe', ['-version'], { stdio: 'ignore' });
} catch { haveFfmpeg = false; }
if (!haveFfmpeg) console.log('\n! ffmpeg not found - skipping videos. Install it, reopen the terminal, run again.\n');

const isValidVideo = (file) => {
  try {
    const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' });
    return parseFloat(out) > 0;
  } catch { return false; }
};

for (const v of haveFfmpeg ? VIDEOS : []) {
  const src = join(ASSETS, v.src);
  const out = join(ASSETS, v.out);
  const part = join(ASSETS, v.out.replace(/\.mp4$/, '.part.mp4'));

  if (existsSync(part)) unlinkSync(part);                      // leftover from an interrupted run
  if (existsSync(out) && !isValidVideo(out)) {
    console.log(`VID  ${v.out} is incomplete (interrupted earlier run) - deleting and re-encoding`);
    unlinkSync(out);
  }

  if (!existsSync(out)) {
    if (!existsSync(src)) { console.log(`VID  ${v.src.slice(0, 40)} not found - skipped`); continue; }
    const before = statSync(src).size;
    console.log(`VID  encoding ${v.src.slice(0, 40)} (${kb(before)}) - takes several minutes, do NOT press Ctrl+C`);
    try {
      execFileSync(
        'ffmpeg',
        ['-y', '-hide_banner', '-loglevel', 'error', '-stats', '-i', src, ...v.args,
         '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-an',
         '-movflags', '+faststart', part],
        { stdio: ['ignore', 'inherit', 'inherit'] }
      );
      renameSync(part, out);                                   // only now does the real file appear
    } catch {
      if (existsSync(part)) unlinkSync(part);
      console.log(`\nVID  encoding of ${v.src.slice(0, 40)} failed - original kept, imports unchanged`);
      continue;
    }
    console.log(`\nVID  ${v.out}  ${kb(before)} -> ${kb(statSync(out).size)}`);
  } else {
    console.log(`VID  ${v.out} already encoded - re-linking`);
  }
  renames.set(v.src, v.out);
  backup(src);
}

/* ---------- 3. rewrite imports ---------- */
let touched = 0;
for (const f of walk('src')) {
  if (!/\.(jsx?|css|html)$/.test(f)) continue;
  let s = readFileSync(f, 'utf8');
  let changed = false;
  for (const [from, to] of renames) {
    if (s.includes(from)) { s = s.split(from).join(to); changed = true; }
  }
  if (changed) { writeFileSync(f, s); touched++; console.log('EDIT ' + f); }
}

console.log(`\nDone. ${renames.size} files linked, ${touched} source files updated. Originals are in ./${BACKUP}`);
console.log('Next: npm run dev and compare against ./_originals.');
console.log('Too big? raise VIDEO_CRF (20 -> 23) or lower IMG_QUALITY (92 -> 85). Then add "_originals" to .gitignore and push.');
