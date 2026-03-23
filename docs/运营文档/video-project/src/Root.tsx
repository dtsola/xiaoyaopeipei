import "./index.css";
import { Composition } from "remotion";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Background } from "./scenes/Scene02Background";
import { Scene03Demo } from "./scenes/Scene03Demo";
import { Scene04Invite } from "./scenes/Scene04Invite";
import { Scene05Outro } from "./scenes/Scene05Outro";
import { XiaoyaopeipeiPromo } from "./scenes/XiaoyaopeipeiPromo";

export const RemotionRoot: React.FC = () => {
  // 30fps
  const fps = 30;

  return (
    <>
      {/* 完整视频 - 合并所有场景 - 总时长 90秒 = 2700帧 */}
      <Composition
        id="Xiaoyaopeipei-Promo-Full"
        component={XiaoyaopeipeiPromo}
        durationInFrames={2700}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ title: "小遥配配 - 产品发布视频" }}
      />

      {/* 单独场景 - 用于预览和调试 */}
      <Composition
        id="Scene01-Hook"
        component={Scene01Hook}
        durationInFrames={300}
        fps={fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="Scene02-Background"
        component={Scene02Background}
        durationInFrames={450}
        fps={fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="Scene03-Demo"
        component={Scene03Demo}
        durationInFrames={1200}
        fps={fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="Scene04-Invite"
        component={Scene04Invite}
        durationInFrames={450}
        fps={fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="Scene05-Outro"
        component={Scene05Outro}
        durationInFrames={300}
        fps={fps}
        width={1920}
        height={1080}
      />
    </>
  );
};
