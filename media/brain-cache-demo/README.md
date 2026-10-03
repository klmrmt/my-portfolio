# Brain Cache product loop

An editable, silent 12-second Remotion composition. The loop starts and ends on the same unmodified library screenshot, opens the existing “Small ideas worth keeping” note in Focus Lens, and returns to the library. There are no title cards or invented features.

## Source assets

`public/library.png`, `public/note-editor.png`, and `public/quick-capture.png` are copied from Brain Cache's documented synthetic-data screenshots. This composition uses the first two. The quick-capture asset remains available for a future capture sequence.

The Focus Lens layer crops the existing editor screenshot at its panel bounds. Only its entrance, exit, backdrop and a demonstration pointer are animated. Note contents and interface controls come directly from the source images.

## Preview and render

Run these commands from this directory after installing the pinned Remotion dependencies declared in `package.json`:

```sh
npm install
npm run studio
npm run render
npm run gif
```

The composition is `BrainCacheDemo`: 1200×800 pixels, 30 fps, 360 frames. Its 3:2 canvas preserves the screenshots' aspect ratio. The MP4 has no audio track. The render and conversion scripts place `brain-cache-demo.mp4` and `brain-cache-demo.gif` in the portfolio's `public/` directory.

The GIF script uses FFmpeg bundled with Remotion, so no system FFmpeg installation is needed. It produces a looping 900×600 GIF at 15 fps with a 128-color palette. It runs after `npm run render`.

Remotion normally downloads its own browser on the first render. To reuse an installed compatible browser, pass its absolute path to the render command: `npm run render -- --browser-executable="/absolute/path/to/browser"`. This environment uses the cached Playwright Chrome headless shell at `/Users/kyle/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`.

## Timing and editing

- Frames 0–79: library hold, pointer selects the note's existing Open control.
- Frames 80–98: Focus Lens enters.
- Frames 99–255: readable note hold, pointer reaches the existing close control.
- Frames 256–276: Focus Lens closes.
- Frames 277–359: library hold with the pointer fading away.

Edit `src/BrainCacheDemo.tsx` to adjust timing, pointer coordinates or panel crop. `src/Root.tsx` declares the output settings. The first and last frames contain the same library image, so replay has no visual jump.
