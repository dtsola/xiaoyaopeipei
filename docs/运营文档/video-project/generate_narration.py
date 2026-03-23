"""
小遥配配视频配音生成脚本
使用 Edge TTS 生成解说音频（分段生成后合成）
"""

import edge_tts
import asyncio
import os
from pathlib import Path
from pydub import AudioSegment

# 各场景配音文案
SCENE_NARRATIONS = {
    "scene01": """24小时接单，可能吗？""",

    "scene02": """很多电脑店老板都有一个头疼的问题。客户随时来问，不可能一直守着手机，回复慢一点，客户就跑了。
于是我用 FastAPI、Vue 3 和通义千问，做了一个 AI 对话式导购助手。核心思路很简单——用 AI 帮小商家 24 小时自动接单。""",

    "scene03": """客户扫码进入对话页，自然语言描述需求。
AI 自动识别意图，推荐高配、中配、性价比三套方案。
还可以多方案对比，配置差异一目了然。
客户留下联系方式，商家收到通知及时跟进。
商家后台能看到完整的访问量、线索量趋势。
以及所有客户线索和对话历史。
配置 SKU 也是增删改查，管理很方便。
生成专属推广二维码，随时分享获客。""",

    "scene04": """项目已经开发完成，我决定完全开源，永久免费。
Docker 一键启动，几分钟就能跑起来。
GitHub 链接在简介，欢迎试用和反馈。""",

    "scene05": """这个项目是技术实践，也希望能帮到有需要的同行。
欢迎交流技术话题或合作机会。"""
}

# 可选的语音配置
VOICES = {
    "女声": "zh-CN-XiaoxiaoNeural",
    "男声": "zh-CN-YunyangNeural",
}

# 场景间停顿时长（毫秒）
SCENE_PAUSE_MS = 500

# 句子间停顿时长（毫秒）- 用于场景3内部
SENTENCE_PAUSE_MS = 300

# 默认配置
DEFAULT_VOICE = VOICES["女声"]
OUTPUT_DIR = Path("public/audio/scenes")
FINAL_OUTPUT = Path("public/audio/narration.mp3")


async def generate_scene_audio(
    scene_name: str,
    text: str,
    voice: str,
    output_dir: Path,
    rate: str = "+0%",
    volume: str = "+0%"
):
    """
    生成单个场景的音频

    Args:
        scene_name: 场景名称
        text: 配音文案
        voice: 语音选择
        output_dir: 输出目录
        rate: 语速调整
        volume: 音量调整
    """
    output_file = output_dir / f"{scene_name}.mp3"

    print(f"正在生成 {scene_name} 配音...")
    print(f"  文案: {text[:50]}...")

    communicate = edge_tts.Communicate(
        text=text,
        voice=voice,
        rate=rate,
        volume=volume
    )

    await communicate.save(str(output_file))

    # 获取文件大小
    size = output_file.stat().st_size
    print(f"  已生成: {output_file} ({size / 1024:.1f} KB)")

    return output_file


def merge_audio_files(
    scene_files: list[Path],
    output_file: Path,
    scene_pause_ms: int = SCENE_PAUSE_MS
):
    """
    合并所有场景音频文件

    Args:
        scene_files: 场景音频文件列表（按顺序）
        output_file: 输出文件路径
        scene_pause_ms: 场景间停顿时长（毫秒）
    """
    print(f"\n正在合并音频文件...")

    # 创建空的音频段
    combined = AudioSegment.empty()

    for i, audio_file in enumerate(scene_files):
        print(f"  合并: {audio_file.name}")
        # 加载音频文件
        audio = AudioSegment.from_mp3(audio_file)
        # 添加到合并段
        combined += audio

        # 在场景之间添加停顿（除了最后一个场景）
        if i < len(scene_files) - 1:
            combined += AudioSegment.silent(duration=scene_pause_ms)

    # 导出合并后的音频
    combined.export(str(output_file), format="mp3")

    # 获取文件信息
    size = output_file.stat().st_size
    duration = len(combined) / 1000  # 转换为秒

    print(f"\n[OK] 合并完成!")
    print(f"  输出文件: {output_file}")
    print(f"  文件大小: {size / 1024:.1f} KB")
    print(f"  音频时长: {duration:.1f} 秒")


async def generate_all_scenes(
    narrations: dict,
    voice: str,
    output_dir: Path,
    rate: str,
    volume: str
):
    """
    生成所有场景的音频

    Args:
        narrations: 场景配音文案字典
        voice: 语音选择
        output_dir: 输出目录
        rate: 语速调整
        volume: 音量调整
    """
    # 确保输出目录存在
    output_dir.mkdir(parents=True, exist_ok=True)

    scene_files = []

    for scene_name, text in narrations.items():
        audio_file = await generate_scene_audio(
            scene_name=scene_name,
            text=text,
            voice=voice,
            output_dir=output_dir,
            rate=rate,
            volume=volume
        )
        scene_files.append(audio_file)

    return scene_files


async def generate_narration(
    voice: str = DEFAULT_VOICE,
    output: str = str(FINAL_OUTPUT),
    rate: str = "+0%",
    volume: str = "+0%"
):
    """
    生成完整配音文件（分段生成后合成）

    Args:
        voice: 语音选择
        output: 输出文件路径
        rate: 语速调整
        volume: 音量调整
    """
    print("=" * 60)
    print("小遥配配 - 视频配音生成")
    print("=" * 60)
    print(f"语音: {voice}")
    print(f"语速: {rate}")
    print(f"音量: {volume}")
    print()

    # 生成所有场景音频
    scene_files = await generate_all_scenes(
        narrations=SCENE_NARRATIONS,
        voice=voice,
        output_dir=OUTPUT_DIR,
        rate=rate,
        volume=volume
    )

    # 合并所有场景音频
    merge_audio_files(
        scene_files=scene_files,
        output_file=Path(output)
    )


def main():
    """主函数"""
    import argparse

    parser = argparse.ArgumentParser(description="生成视频配音（分段生成后合成）")
    parser.add_argument(
        "--voice",
        choices=["女声", "男声"],
        default="女声",
        help="选择语音"
    )
    parser.add_argument(
        "--output",
        default=str(FINAL_OUTPUT),
        help="输出文件路径"
    )
    parser.add_argument(
        "--rate",
        default="+0%",
        help="语速调整（如 +10%% 或 -10%%）"
    )
    parser.add_argument(
        "--volume",
        default="+0%",
        help="音量调整（如 +10%% 或 -10%%）"
    )

    args = parser.parse_args()

    # 运行生成
    asyncio.run(generate_narration(
        voice=VOICES[args.voice],
        output=args.output,
        rate=args.rate,
        volume=args.volume
    ))


if __name__ == "__main__":
    main()
