import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 10秒 = 300帧
  const opacity = interpolate(frame, [0, 30, 270, 300], [0, 1, 1, 0]);
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 10,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: "bold",
            margin: 0,
            textShadow: "0 4px 20px rgba(255,255,255,0.3)",
          }}
        >
          24小时接单
        </h1>
        <h1
          style={{
            fontSize: 80,
            fontWeight: "bold",
            margin: 0,
            marginTop: 20,
            color: "#3b82f6",
          }}
        >
          可能吗？
        </h1>
      </div>
    </AbsoluteFill>
  );
};
