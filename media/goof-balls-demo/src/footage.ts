export type CapturedFrame = {
  /** JPEG filename relative to public/footage/. */
  file: string;
  /** Milliseconds from the beginning of the selected gameplay take. */
  atMs: number;
};

export type FootageManifest = {
  width: number;
  height: number;
  durationMs: number;
  frames: CapturedFrame[];
};

export const validateManifest = (manifest: FootageManifest): FootageManifest => {
  if (!Array.isArray(manifest.frames) || manifest.frames.length === 0) {
    throw new Error('The Goof Balls gameplay manifest must contain captured frames.');
  }
  if (!Number.isFinite(manifest.durationMs) || manifest.durationMs <= 0) {
    throw new Error('The Goof Balls gameplay manifest must have a positive durationMs.');
  }
  if (!Number.isFinite(manifest.width) || !Number.isFinite(manifest.height) || manifest.width <= 0 || manifest.height <= 0) {
    throw new Error('The Goof Balls gameplay manifest must record the captured viewport size.');
  }
  if (manifest.frames[0].atMs !== 0) {
    throw new Error('The selected gameplay take must begin with a frame at atMs: 0.');
  }
  for (let index = 0; index < manifest.frames.length; index++) {
    const frame = manifest.frames[index];
    if (!frame.file || frame.file.startsWith('/') || frame.file.includes('..')) {
      throw new Error(`Gameplay frame ${index} must use a filename relative to footage/.`);
    }
    if (!Number.isFinite(frame.atMs) || frame.atMs < 0) {
      throw new Error(`Gameplay frame ${index} must have a finite, nonnegative timestamp.`);
    }
    if (index > 0 && frame.atMs <= manifest.frames[index - 1].atMs) {
      throw new Error('Captured gameplay timestamps must be strictly increasing.');
    }
  }
  return manifest;
};

/** Hold the latest actual screenshot until the next captured timestamp. */
export const capturedFrameAt = (frames: CapturedFrame[], timeMs: number): CapturedFrame => {
  let low = 0;
  let high = frames.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (frames[middle].atMs <= timeMs) low = middle;
    else high = middle - 1;
  }
  return frames[low];
};
