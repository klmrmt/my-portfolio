import {Composition} from 'remotion';
import {BrainCacheDemo, DEMO_DURATION, DEMO_FPS, DEMO_HEIGHT, DEMO_WIDTH} from './BrainCacheDemo';

export const RemotionRoot = () => (
  <Composition
    id="BrainCacheDemo"
    component={BrainCacheDemo}
    durationInFrames={DEMO_DURATION}
    fps={DEMO_FPS}
    width={DEMO_WIDTH}
    height={DEMO_HEIGHT}
  />
);
