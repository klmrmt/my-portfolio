import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {capturedFrameAt, type FootageManifest} from './footage';

export const DEMO_WIDTH = 1280;
export const DEMO_HEIGHT = 720;
export const DEMO_FPS = 30;

export type GoofBallsDemoProps = {manifest: FootageManifest};

export const GoofBallsDemo = ({manifest}: GoofBallsDemoProps) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const captured = capturedFrameAt(manifest.frames, (frame / fps) * 1000);
  const firstCapture = manifest.frames[0];
  const loopFadeFrames = Math.max(2, Math.round(fps * 0.4));
  const loopFade = interpolate(frame, [durationInFrames - loopFadeFrames, durationInFrames - 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#f6f3e9', overflow: 'hidden'}}>
      <Img
        src={staticFile(`footage/${captured.file}`)}
        alt="Actual Goof Balls solo casual gameplay"
        style={{width: '100%', height: '100%', objectFit: 'contain'}}
      />
      <Img
        src={staticFile(`footage/${firstCapture.file}`)}
        alt=""
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: loopFade}}
      />
    </AbsoluteFill>
  );
};
