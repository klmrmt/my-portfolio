import {Composition, staticFile, type CalculateMetadataFunction} from 'remotion';
import {DEMO_FPS, DEMO_HEIGHT, DEMO_WIDTH, GoofBallsDemo, type GoofBallsDemoProps} from './GoofBallsDemo';
import {validateManifest, type FootageManifest} from './footage';

const calculateMetadata: CalculateMetadataFunction<GoofBallsDemoProps> = async () => {
  const response = await fetch(staticFile('footage/manifest.json'));
  if (!response.ok) {
    throw new Error(`Could not load captured Goof Balls gameplay: ${response.status}`);
  }
  const manifest = validateManifest((await response.json()) as FootageManifest);
  return {
    durationInFrames: Math.max(1, Math.round((manifest.durationMs / 1000) * DEMO_FPS)),
    props: {manifest},
  };
};

export const RemotionRoot = () => (
  <Composition
    id="GoofBallsDemo"
    component={GoofBallsDemo}
    durationInFrames={14 * DEMO_FPS}
    fps={DEMO_FPS}
    width={DEMO_WIDTH}
    height={DEMO_HEIGHT}
    defaultProps={{manifest: {width: DEMO_WIDTH, height: DEMO_HEIGHT, durationMs: 14000, frames: []}}}
    calculateMetadata={calculateMetadata}
  />
);
