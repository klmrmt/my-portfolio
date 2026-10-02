"use client";

import Image from "next/image";
import { useId, useState, useSyncExternalStore } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const serverMotionPreference = { reduced: true };
let motionPreferenceSnapshot = serverMotionPreference;

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(reducedMotionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getMotionPreference() {
  const reduced = window.matchMedia(reducedMotionQuery).matches;
  if (motionPreferenceSnapshot.reduced !== reduced) {
    motionPreferenceSnapshot = { reduced };
  }
  return motionPreferenceSnapshot;
}

// Render a still image before hydration, when the browser preference is unknown.
function getServerMotionPreference() {
  return serverMotionPreference;
}

interface ProductDemoProps {
  src: string;
  poster: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export default function ProductDemo({
  src,
  poster,
  width,
  height,
  alt,
  caption,
}: ProductDemoProps) {
  const imageId = useId();
  const motionPreference = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );
  const [playbackOverride, setPlaybackOverride] = useState<{
    playing: boolean;
    preference: typeof motionPreference;
  } | null>(null);

  // A changed OS preference takes effect immediately, without an effect that
  // could briefly leave animation running. Manual playback is still available.
  const isPlaying =
    playbackOverride?.preference === motionPreference
      ? playbackOverride.playing
      : !motionPreference.reduced;

  return (
    <figure className="min-w-0 px-6 sm:px-8">
      <Image
        id={imageId}
        src={isPlaying ? src : poster}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className="h-auto w-full"
      />
      <figcaption className="mt-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-1 text-sm leading-relaxed text-[var(--text-muted)]">
        <p className="max-w-[55ch] py-2.5">{caption}</p>
        <button
          type="button"
          aria-controls={imageId}
          aria-label={isPlaying ? "Pause gameplay demo" : "Play gameplay demo"}
          onClick={() =>
            setPlaybackOverride({
              playing: !isPlaying,
              preference: motionPreference,
            })
          }
          className="min-h-11 shrink-0 py-2.5 font-medium text-[var(--text-primary)] underline underline-offset-4 hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          {isPlaying ? "Pause demo" : "Play demo"}
        </button>
      </figcaption>
    </figure>
  );
}
