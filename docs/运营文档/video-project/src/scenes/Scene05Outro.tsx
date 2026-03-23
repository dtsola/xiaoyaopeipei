import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

export const Scene05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 10秒 = 300帧
  const totalFrames = 300;

  // 代码界面淡入
  const codeOpacity = interpolate(frame, [0, 30], [0, 0.3], { extrapolateRight: "clamp" });

  // 文字依次出现
  const text1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const text2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const text3Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  // Logo 缩放进入
  const logoScale = spring({
    frame: frame - 180,
    fps,
    config: { damping: 15, stiffness: 50 },
  });
  const logoOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // 最终淡出
  const fadeOutOpacity = interpolate(frame, [240, 300], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOutOpacity,
      }}
    >
      {/* 代码背景 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: codeOpacity,
          backgroundColor: "#1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 120,
          color: "#334155",
          fontWeight: "bold",
        }}
      >
        {"</>"}
      </div>

      <div
        style={{
          textAlign: "center",
          color: "#fff",
          fontFamily: "sans-serif",
          maxWidth: 900,
        }}
      >
        {/* 第一段文字 */}
        <p
          style={{
            fontSize: 28,
            opacity: text1Opacity,
            color: "#cbd5e1",
            margin: 0,
          }}
        >
          这个项目是技术实践
        </p>

        {/* 第二段文字 */}
        <p
          style={{
            fontSize: 28,
            opacity: text2Opacity,
            color: "#cbd5e1",
            margin: "20px 0 0 0",
          }}
        >
          也希望能帮到有需要的同行
        </p>

        {/* 第三段文字 */}
        <p
          style={{
            fontSize: 32,
            opacity: text3Opacity,
            color: "#3b82f6",
            margin: "40px 0 0 0",
            fontWeight: 600,
          }}
        >
          欢迎交流技术话题或合作机会
        </p>

        {/* Logo 和 GitHub */}
        {frame >= 180 && (
          <div
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              marginTop: 80,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 30,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              {/* Logo */}
              <Img
                src={staticFile("logo.png")}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 30,
                  border: "3px solid #3b82f6",
                }}
              />
              {/* 二维码 */}
              <Img
                src={staticFile("个人二维码.png")}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                  border: "3px solid #3b82f6",
                }}
              />
            </div>
            <p style={{ fontSize: 24, color: "#94a3b8", margin: 0 }}>
              github.com/dtsola/xiaoyaopeipei
            </p>
            <p style={{ fontSize: 20, color: "#64748b", marginTop: 10 }}>
              微信：dtsola（备注：小遥配配）
            </p>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
