# 小遥配配 - 产品发布视频

基于 Remotion 的产品发布视频项目。

## 视频结构

总时长：90秒（2700帧 @ 30fps）

| 场景 | 时长 | 内容 |
|------|------|------|
| Scene01-Hook | 10秒 | 开头钩子 - 问题场景展示 |
| Scene02-Background | 15秒 | 背景故事 - 为什么做这个项目 |
| Scene03-Demo | 40秒 | 产品演示 - 截图展示 |
| Scene04-Invite | 15秒 | 邀请试用 - 开源说明 |
| Scene05-Outro | 10秒 | 征求意见+钩子 |

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 在浏览器中打开
# http://localhost:3000
```

## 渲染视频

```bash
# 渲染完整视频
npx remotion render Xiaoyaopeipei-Promo-Full out.mp4

# 渲染单个场景（用于调试）
npx remotion render Scene01-Hook scene01.mp4
```

## 添加产品截图

产品截图需要放在 `public/screenshots/` 目录下：

```
public/screenshots/
├── c端/
│   ├── 01-对话首页.png
│   ├── 02-配置推荐-01-为您推荐.png
│   ├── 02-配置推荐-02-对比方案.png
│   └── 03-线索提交-01-留下联系方式.png
└── b端/
    ├── 02-首页-数据看板.png
    ├── 04-线索管理-01-线索列表.png
    ├── 03-配置管理-01-SKU列表.png
    └── 05-分享管理.png
```

然后在 `src/scenes/Scene03Demo.tsx` 中引用这些截图：

```tsx
import { Img } from "@remotion/paths";

<Img src="screenshots/c端/01-对话首页.png" />
```

## 添加音频

将背景音乐和配音文件放在 `public/audio/` 目录：

```
public/audio/
├── bgm.mp3          # 背景音乐
├── narration.mp3    # 解说配音
└── sfx/             # 音效
```

使用 Audio 组件添加音频：

```tsx
import { Audio } from "remotion";

<Audio src="audio/bgm.mp3" />
```

## 技术栈

- Remotion - React 视频框架
- TypeScript - 类型安全
- Tailwind CSS v4 - 样式
- @remotion/paths - 图片路径处理

## 注意事项

- 截图分辨率建议：1920x1080 或更高
- 音频格式：MP3 或 WAV
- 视频导出格式：MP4 (H.264)

## 参考文档

- [应用发布宣传视频脚本](../应用发布宣传视频脚本.md)
- [应用发布宣传文档](../应用发布宣传文档.md)

---

## Remotion 原始文档

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).
