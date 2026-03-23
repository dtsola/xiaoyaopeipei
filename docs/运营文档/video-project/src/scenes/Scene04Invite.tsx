import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

export const Scene04Invite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 15秒 = 450帧
  const totalFrames = 450;

  // GitHub 文字淡入
  const githubOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const githubY = interpolate(frame, [0, 60], [100, 0], { extrapolateRight: "clamp" });

  // 开源声明
  const openSourceOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // Docker 命令出现
  const dockerOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const dockerY = interpolate(frame, [150, 210], [50, 0], { extrapolateRight: "clamp" });

  // GitHub 地址和二维码
  const contactOpacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const contactScale = interpolate(frame, [270, 330], [0.8, 1], { extrapolateRight: "clamp" });

  // 结尾淡出
  const fadeOutOpacity = interpolate(frame, [390, 450], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity: fadeOutOpacity,
          textAlign: "center",
          color: "#fff",
          fontFamily: "sans-serif",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {/* GitHub 标题 */}
        <div style={{ opacity: githubOpacity, transform: `translateY(${githubY}px)` }}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: "bold",
              marginBottom: 20,
              color: "#fff",
            }}
          >
            GitHub
          </h2>
          <p style={{ fontSize: 24, color: "#94a3b8" }}>项目已开源，永久免费</p>
        </div>

        {/* 开源声明 */}
        <div
          style={{
            opacity: openSourceOpacity,
            marginTop: 50,
            padding: "30px 50px",
            backgroundColor: "#1e293b",
            borderRadius: 15,
            border: "2px solid #3b82f6",
          }}
        >
          <p style={{ fontSize: 28, margin: 0, color: "#e2e8f0" }}>
            完全开源 · Docker 一键启动 · 几分钟跑起来
          </p>
        </div>

        {/* Docker 命令 */}
        <div
          style={{
            opacity: dockerOpacity,
            transform: `translateY(${dockerY}px)`,
            marginTop: 50,
            backgroundColor: "#000",
            padding: 25,
            borderRadius: 10,
            fontFamily: "monospace",
            textAlign: "left",
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <code style={{ color: "#22c55e", fontSize: 20 }}>
            $ docker-compose up -d
          </code>
        </div>

        {/* 联系方式 */}
        <div
          style={{
            opacity: contactOpacity,
            transform: `scale(${contactScale})`,
            marginTop: 50,
            display: "flex",
            gap: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* GitHub 地址 */}
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 20, color: "#94a3b8", margin: 0 }}>GitHub</p>
            <p style={{ fontSize: 28, color: "#3b82f6", margin: "10px 0 0 0", fontWeight: "bold" }}>
              github.com/dtsola/xiaoyaopeipei
            </p>
          </div>

          {/* LOGO */}
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 20,
              border: "3px solid #fff",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
