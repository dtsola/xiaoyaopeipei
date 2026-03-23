import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene02Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 15秒 = 450帧
  const totalFrames = 450;

  // 文字淡入淡出
  const textOpacity = interpolate(
    frame,
    [0, 30, 150, 180, totalFrames - 60, totalFrames],
    [0, 1, 1, 0, 0, 1]
  );

  // 技术栈卡片动画
  const cardsOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const cardsY = interpolate(frame, [180, 210], [50, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a", justifyContent: "center", alignItems: "center" }}>
      {/* 第一部分：问题场景 */}
      {frame < 180 && (
        <div
          style={{
            opacity: textOpacity,
            textAlign: "center",
            color: "#fff",
            fontFamily: "sans-serif",
            maxWidth: 900,
          }}
        >
          <h2 style={{ fontSize: 36, marginBottom: 30, fontWeight: 300 }}>
            很多电脑店老板都有一个头疼的问题...
          </h2>
          <p style={{ fontSize: 28, color: "#94a3b8" }}>
            客户随时来问，不可能一直守着手机<br />
            回复慢一点，客户就跑了
          </p>
        </div>
      )}

      {/* 第二部分：技术架构 */}
      {frame >= 180 && (
        <div
          style={{
            opacity: cardsOpacity,
            transform: `translateY(${cardsY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: 32, color: "#fff", marginBottom: 40, fontWeight: 300 }}>
            技术架构
          </h2>

          {/* 技术栈卡片 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
              justifyContent: "center",
              flexWrap: "wrap",
              padding: "0 40px",
            }}
          >
            <TechStackCard
              title="前端"
              color="#3b82f6"
              items={["Vue 3.4", "Vite 5", "Ant Design", "Pinia", "ECharts"]}
            />
            <TechStackCard
              title="后端"
              color="#10b981"
              items={["FastAPI", "Python 3.10", "SQLAlchemy", "Uvicorn"]}
            />
            <TechStackCard
              title="AI服务"
              color="#8b5cf6"
              items={["LangChain", "通义千问"]}
            />
            <TechStackCard
              title="存储/部署"
              color="#f59e0b"
              items={["MySQL 8.0", "阿里云OSS", "ECS + Nginx"]}
            />
          </div>

          <p style={{ color: "#94a3b8", marginTop: 40, fontSize: 24 }}>
            用 AI 帮小商家 24 小时自动接单
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};

// 技术栈卡片组件
interface TechStackCardProps {
  title: string;
  color: string;
  items: string[];
}

const TechStackCard: React.FC<TechStackCardProps> = ({ title, color, items }) => {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        borderRadius: 12,
        padding: 20,
        minWidth: 160,
        boxShadow: `0 8px 32px ${color}33`,
        border: `2px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: color,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            fontSize: 14,
            color: "#e2e8f0",
            marginBottom: 6,
            padding: "6px 10px",
            backgroundColor: "#334155",
            borderRadius: 6,
            textAlign: "center",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
