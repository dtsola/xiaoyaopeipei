import {
  AbsoluteFill,
  useCurrentFrame,
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";
import { Scene01Hook } from "./Scene01Hook";
import { Scene02Background } from "./Scene02Background";
import { Scene03Demo } from "./Scene03Demo";
import { Scene04Invite } from "./Scene04Invite";
import { Scene05Outro } from "./Scene05Outro";

export const XiaoyaopeipeiPromo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 配音音频 - 从头播放到尾 */}
      <Audio
        src={staticFile("audio/narration.mp3")}
        volume={1.0}
      />

      {/* 背景音乐（可选）- 音量调低 */}
      <Audio
        src={staticFile("audio/bgm.mp3")}
        volume={0.15}
      />

      {/* 场景1: 0-300帧 (10秒) */}
      <Sequence from={0} durationInFrames={300}>
        <Scene01Hook />
      </Sequence>

      {/* 场景2: 300-750帧 (15秒) - 包含技术架构 */}
      <Sequence from={300} durationInFrames={450}>
        <Scene02Background />
      </Sequence>

      {/* 场景3: 750-1950帧 (40秒) */}
      <Sequence from={750} durationInFrames={1200}>
        <Scene03Demo />
      </Sequence>

      {/* 场景4: 1950-2400帧 (15秒) */}
      <Sequence from={1950} durationInFrames={450}>
        <Scene04Invite />
      </Sequence>

      {/* 场景5: 2400-2700帧 (10秒) */}
      <Sequence from={2400} durationInFrames={300}>
        <Scene05Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
