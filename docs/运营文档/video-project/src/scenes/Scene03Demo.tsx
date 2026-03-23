import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

export const Scene03Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 40秒 = 1200帧
  const totalFrames = 1200;

  // 定义每个截图的时间段（每张5秒 = 150帧，8张截图刚好填满1200帧）
  const segments = [
    { start: 0, end: 150, title: "C端 - 智能对话", subtitle: "客户自然语言描述需求", image: "screenshots/c端/01-对话首页.png" },
    { start: 150, end: 300, title: "C端 - 配置推荐", subtitle: "AI推荐三套方案", image: "screenshots/c端/02-配置推荐-01-为您推荐.png" },
    { start: 300, end: 450, title: "C端 - 方案对比", subtitle: "配置差异一目了然", image: "screenshots/c端/02-配置推荐-02-对比方案.png" },
    { start: 450, end: 600, title: "C端 - 线索提交", subtitle: "客户留下联系方式", image: "screenshots/c端/03-线索提交-01-留下联系方式.png" },
    { start: 600, end: 750, title: "B端 - 数据看板", subtitle: "访问量线索量趋势", image: "screenshots/b端/02-首页-数据看板.png" },
    { start: 750, end: 900, title: "B端 - 线索管理", subtitle: "客户线索集中管理", image: "screenshots/b端/04-线索管理-01-线索列表.png" },
    { start: 900, end: 1050, title: "B端 - 配置管理", subtitle: "SKU增删改查", image: "screenshots/b端/03-配置管理-01-SKU列表.png" },
    { start: 1050, end: 1200, title: "B端 - 分享管理", subtitle: "专属推广二维码", image: "screenshots/b端/05-分享管理.png" },
  ];

  // 当前是第几张截图
  const currentSegment = segments.findIndex(
    (seg) => frame >= seg.start && frame < seg.end
  );

  // 截图淡入淡出
  const getImageOpacity = () => {
    if (currentSegment === -1) return 0;
    const seg = segments[currentSegment];
    return interpolate(
      frame,
      [seg.start, seg.start + 30, seg.end - 30, seg.end],
      [0, 1, 1, 0]
    );
  };

  // 缩放效果
  const getScale = () => {
    if (currentSegment === -1) return 1;
    const seg = segments[currentSegment];
    return interpolate(
      frame,
      [seg.start, seg.start + 60, seg.end - 60, seg.end],
      [1, 1.1, 1.1, 1]
    );
  };

  // 标题淡入淡出
  const getTextOpacity = () => {
    if (currentSegment === -1) return 0;
    const seg = segments[currentSegment];
    return interpolate(
      frame,
      [seg.start, seg.start + 15, seg.end - 15, seg.end],
      [0, 1, 1, 0]
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#1e293b", justifyContent: "center", alignItems: "center" }}>
      {/* 产品截图 */}
      {currentSegment !== -1 && (
        <div
          style={{
            width: width * 0.8,
            height: height * 0.75,
            borderRadius: 20,
            overflow: "hidden",
            transform: `scale(${getScale()})`,
            opacity: getImageOpacity(),
            border: "4px solid #475569",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <Img
            src={staticFile(segments[currentSegment].image)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "#fff",
            }}
          />
        </div>
      )}

      {/* 标题和说明 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: getTextOpacity(),
        }}
      >
        <h2
          style={{
            fontSize: 36,
            color: "#fff",
            margin: 0,
            fontWeight: 600,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {currentSegment !== -1 ? segments[currentSegment].title : ""}
        </h2>
        <p
          style={{
            fontSize: 24,
            color: "#cbd5e1",
            marginTop: 10,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {currentSegment !== -1 ? segments[currentSegment].subtitle : ""}
        </p>
      </div>
    </AbsoluteFill>
  );
};
