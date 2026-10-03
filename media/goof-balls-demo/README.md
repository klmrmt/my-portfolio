# Goof Balls gameplay demo

An editable, silent Remotion composition built entirely from screenshots of actual guest solo casual gameplay. `GoofBallsDemo` preserves the full game viewport, including its controls. It adds no arena graphics, players, scores, captions or fabricated gameplay events.

## Capture assets

The actual browser captures live in `public/footage/`. Its manifest records each JPEG's timestamp within the selected take:

```json
{
  "width": 1280,
  "height": 720,
  "durationMs": 14000,
  "frames": [
    {"file": "frame-000.jpg", "atMs": 0},
    {"file": "frame-001.jpg", "atMs": 100}
  ]
}
```

This is a schema example, not captured footage. Save the actual manifest as `public/footage/manifest.json`. Filenames are relative to that directory. Timestamps start at zero and increase strictly. `durationMs` determines the rendered length; a 12–16-second selected take suits the portfolio.

The composition holds each real screenshot until its next captured timestamp. It does not interpolate new game states. The final 0.4 seconds gently crossfade back to the first actual capture, so the last and first video frames match when the GIF replays. The output is 1280×720 at 30 fps, and its visible motion cadence comes from the captures. The full screenshot is contained without cropping, so game controls remain visible if the recorded viewport differs in aspect ratio.

## Preview and render

Run these commands from this directory:

```sh
npm install
npm run studio
npm run render
npm run gif
```

The render and conversion scripts write `goof-balls-demo.mp4` and `goof-balls-demo.gif` to the portfolio's `public/` directory. The MP4 is 1280×720 at 30 fps; the GIF is 800×450 at 12 fps with a 64-color palette to keep its size down. Both run for 14 seconds. The GIF uses FFmpeg bundled with Remotion, so a system FFmpeg installation is not required. The video has no audio track.

Remotion normally downloads a browser on its first render. A compatible installed browser can be supplied with `npm run render -- --browser-executable="/absolute/path/to/browser"`. This environment can reuse `/Users/kyle/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`.

## Editing

`src/GoofBallsDemo.tsx` displays the captured footage. `src/footage.ts` validates timestamps and selects the latest captured frame at each point in the video. `src/Root.tsx` loads the manifest and derives the composition's duration. To change the take, replace the source JPEGs and manifest, then repeat the render and GIF commands.
