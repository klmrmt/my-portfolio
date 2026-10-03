import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const DEMO_WIDTH = 1200;
export const DEMO_HEIGHT = 800;
export const DEMO_FPS = 30;
export const DEMO_DURATION = 360;

const easing = Easing.inOut(Easing.cubic);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Bounds of the actual Focus Lens panel in the 2880×1920 screenshot,
// expressed at the composition's 1200×800 scale. The UI itself is unaltered.
const panel = {left: 183.75, top: 149.375, width: 832.5, height: 541.875};
const openButton = {x: 457, y: 690};
const closeButton = {x: 982, y: 175};

const easeBetween = (frame: number, start: number, end: number, from = 0, to = 1) =>
  interpolate(frame, [start, end], [from, to], {...clamp, easing});

const DemoPointer = ({frame}: {frame: number}) => {
  const opening = frame < 130;
  const start = opening ? 46 : 225;
  const click = opening ? 78 : 252;
  const end = opening ? 107 : 282;
  const target = opening ? openButton : closeButton;
  const origin = opening ? {x: 582, y: 752} : {x: 916, y: 213};
  const progress = easeBetween(frame, start + 3, click - 3);
  const opacity =
    easeBetween(frame, start, start + 7) * (1 - easeBetween(frame, click + 17, end));
  const pulse = interpolate(frame, [click, click + 13], [0, 1], clamp);
  const ringOpacity = frame >= click && frame <= click + 13 ? (1 - pulse) * 0.8 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: origin.x + (target.x - origin.x) * progress,
        top: origin.y + (target.y - origin.y) * progress,
        opacity,
        zIndex: 3,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 12 + pulse * 28,
          height: 12 + pulse * 28,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '2px solid #e8b54d',
          opacity: ringOpacity,
        }}
      />
      <svg width="22" height="28" viewBox="0 0 22 28" aria-hidden="true">
        <path
          d="M2 2 L2 22 L7.2 17.5 L11.1 26 L14.7 24.3 L10.7 15.8 L18.2 15.2 Z"
          fill="#f8f6ef"
          stroke="#181816"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const BrainCacheDemo = () => {
  const frame = useCurrentFrame();
  const open = easeBetween(frame, 80, 98);
  const close = easeBetween(frame, 256, 276);
  const modalOpacity = open * (1 - close);
  const scale = 0.96 + open * 0.04 - close * 0.025;
  const translateY = (1 - open) * 12 + close * 7;

  return (
    <AbsoluteFill style={{backgroundColor: '#090a08', overflow: 'hidden'}}>
      <Img
        src={staticFile('library.png')}
        style={{
          width: DEMO_WIDTH,
          height: DEMO_HEIGHT,
          filter: `blur(${modalOpacity * 2.5}px) brightness(${1 - modalOpacity * 0.42})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: panel.left,
          top: panel.top,
          width: panel.width,
          height: panel.height,
          overflow: 'hidden',
          borderRadius: 8,
          opacity: modalOpacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          transformOrigin: '50% 50%',
          boxShadow: `0 14px 36px rgba(0,0,0,${modalOpacity * 0.45})`,
        }}
      >
        <Img
          src={staticFile('note-editor.png')}
          style={{
            position: 'absolute',
            left: -panel.left,
            top: -panel.top,
            width: DEMO_WIDTH,
            height: DEMO_HEIGHT,
            maxWidth: 'none',
          }}
        />
      </div>
      <DemoPointer frame={frame} />
    </AbsoluteFill>
  );
};
