import { localized } from "@/lib/i18n";
import type { LocalizedText, LocalizedValue } from "@/types/content";

export const githubUser = "thedavidweng";
export const resumeHref = "https://thedavidweng.github.io/resume.html";

type Language = "Rust" | "TypeScript" | "Go";

export type SoftwareProject = {
  repo: string;
  language: Language;
  stars: number;
  pushedAt: string;
  description: LocalizedText;
  tags: LocalizedValue<string[]>;
  links?: { label: LocalizedText; href: string }[];
  points?: { title: LocalizedText; body: LocalizedText }[];
};

export type SoftwareTool = {
  repo: string;
  stars: number;
  docs?: string;
  description: LocalizedText;
};

export type Contribution = {
  owner: string;
  repo: string;
  description: LocalizedText;
};

export const repoUrl = (repo: string) => `https://github.com/${githubUser}/${repo}`;

export const softwarePageContent = {
  eyebrow: localized("Open source on GitHub", "GitHub 上的开源项目"),
  title: localized("Software", "软件"),
  lede: localized(
    "I build open source desktop apps and command line tools, mostly for music, with the heavy AI work done on your own computer.",
    "我开发开源桌面应用与命令行工具，多数与音乐有关，繁重的 AI 运算都在你自己的电脑上完成。"
  ),
  githubLabel: localized("GitHub", "GitHub"),
  resumeLabel: localized("Resume", "简历"),
  seeProjectsLabel: localized("See projects", "查看项目"),
  stats: {
    repos: { value: 41, label: localized("original repositories", "个原创仓库") },
    stars: { value: 157, label: localized("stars on GitHub", "个 GitHub 星标") },
    prs: { value: 120, label: localized("merged pull requests upstream", "个被合并的上游 PR") },
    upstream: { value: "20+", label: localized("projects contributed to", "个参与贡献的项目") }
  },
  stems: {
    title: localized("OpenKara stem separation", "OpenKara 音轨分离"),
    label: localized(
      "Animation of a song split into vocals, drums, bass, and other, the way OpenKara separates it on your computer.",
      "一首歌被拆分为人声、鼓、贝斯与其他音轨的动画，正如 OpenKara 在你电脑上的处理方式。"
    ),
    stems: localized(["vocals", "drums", "bass", "other"], ["人声", "鼓", "贝斯", "其他"]),
    caption: localized("Demucs v4 through ONNX Runtime, running on your computer.", "Demucs v4 经 ONNX Runtime 在本机运行。"),
    scrubHint: localized(" Hover to scrub.", " 悬停可拖动进度。")
  },
  projects: {
    kicker: "01",
    title: localized("Projects", "项目"),
    intro: localized(
      "Mostly software for music, with the heavy AI work done on your own computer.",
      "多数是音乐软件，繁重的 AI 运算都在你自己的电脑上完成。"
    )
  },
  tools: {
    kicker: "02",
    title: localized("Tools", "工具"),
    intro: localized(
      "Command line tools written in Go. They print stable JSON and ask before changing anything, so people and AI agents can both use them safely.",
      "用 Go 编写的命令行工具。输出稳定的 JSON，修改前先确认，人和 AI 代理都能放心使用。"
    ),
    docsLabel: localized("docs", "文档")
  },
  contributions: {
    kicker: "03",
    title: localized("Contributions", "开源贡献"),
    intro: localized(
      "merged pull requests to projects by other people, from Rust GUI toolkits and agent frameworks to Homebrew.",
      "个 PR 被合并进他人的项目，从 Rust GUI 工具包、代理框架到 Homebrew。"
    ),
    allLabel: localized("All merged pull requests", "全部已合并的 PR"),
    allHref: `https://github.com/pulls?q=is%3Apr+is%3Amerged+author%3A${githubUser}+-user%3A${githubUser}`
  },
  roles: {
    kicker: "04",
    title: localized("Roles", "职位"),
    intro: localized("Current roles, and the full resume.", "目前的职位，以及完整简历。")
  },
  pushedLabel: localized("Pushed {time} to {repo}", "{time}推送至 {repo}"),
  updatedLabel: localized("updated {time}", "{time}更新"),
  starsLabel: localized("Stars", "星标")
};

export const softwareProjects: SoftwareProject[] = [
  {
    repo: "OpenKara",
    language: "Rust",
    stars: 31,
    pushedAt: "2026-09-29T11:50:27Z",
    description: localized(
      "Karaoke from the music you already own. Vocals are separated on your computer, with synced lyrics.",
      "用你已有的音乐唱 K。人声在本机分离，并配有同步歌词。"
    ),
    tags: localized(
      ["Tauri 2", "Rust", "React 19", "TypeScript", "ONNX Runtime"],
      ["Tauri 2", "Rust", "React 19", "TypeScript", "ONNX Runtime"]
    ),
    links: [
      { label: localized("Website", "网站"), href: "https://thedavidweng.github.io/OpenKara/" },
      { label: localized("Releases", "下载"), href: "https://github.com/thedavidweng/OpenKara/releases" }
    ],
    points: [
      {
        title: localized("Separation on your computer.", "在本机分离音轨。"),
        body: localized("Demucs v4 through ONNX Runtime. Nothing is uploaded.", "Demucs v4 经 ONNX Runtime 运行，不上传任何文件。")
      },
      {
        title: localized("A native app.", "原生应用。"),
        body: localized("Tauri 2 and Rust, with a React 19 and TypeScript interface.", "Tauri 2 与 Rust，界面使用 React 19 与 TypeScript。")
      },
      {
        title: localized("Your own library.", "你自己的曲库。"),
        body: localized(
          "Works with the files you already have, plus synced lyrics from the web.",
          "直接使用你已有的音乐文件，并从网络获取同步歌词。"
        )
      }
    ]
  },
  {
    repo: "OpenLoop",
    language: "TypeScript",
    stars: 1,
    pushedAt: "2026-09-28T11:27:07Z",
    description: localized(
      "Make music on your computer from a prompt and lyrics, with full controls, playback, and export.",
      "在本机用提示词和歌词生成音乐，支持完整参数控制、播放与导出。"
    ),
    tags: localized(["Tauri", "Music generation"], ["Tauri", "音乐生成"])
  },
  {
    repo: "strudel-tui",
    language: "TypeScript",
    stars: 1,
    pushedAt: "2026-09-27T14:26:11Z",
    description: localized(
      "Live code music with Strudel in the terminal, with an AI agent to play along.",
      "在终端里用 Strudel 现场编写音乐，还有 AI 代理一起演奏。"
    ),
    tags: localized(["Terminal", "Live coding"], ["终端", "现场编程"])
  },
  {
    repo: "lyric-romanizer",
    language: "TypeScript",
    stars: 2,
    pushedAt: "2026-09-29T23:12:43Z",
    description: localized(
      "Detects the writing system of song lyrics and romanizes them locally, from Japanese and Korean to Cyrillic and Thai.",
      "识别歌词的书写系统并在本地转写为罗马字，涵盖日文、韩文、西里尔字母与泰文。"
    ),
    tags: localized(["Library", "Unicode"], ["程序库", "Unicode"])
  },
  {
    repo: "sdf-flash-gui",
    language: "Rust",
    stars: 9,
    pushedAt: "2026-09-29T23:13:40Z",
    description: localized(
      "Dump and flash firmware on MT1959 optical drives, on macOS, Windows, and Linux.",
      "在 macOS、Windows 与 Linux 上读取并刷写 MT1959 光驱固件。"
    ),
    tags: localized(["egui", "Hardware"], ["egui", "硬件"])
  }
];

export const softwareTools: SoftwareTool[] = [
  {
    repo: "monarchmoney-cli",
    stars: 30,
    docs: "https://thedavidweng.github.io/site/monarchmoney-cli/",
    description: localized(
      "Accounts, transactions, and budgets from Monarch Money, in your terminal.",
      "在终端里管理 Monarch Money 的账户、交易与预算。"
    )
  },
  {
    repo: "money",
    stars: 1,
    docs: "https://thedavidweng.github.io/site/money/",
    description: localized(
      "A personal finance backend that keeps your data in encrypted SQLite on your own machine.",
      "个人财务后端，数据保存在你本机的加密 SQLite 中。"
    )
  },
  {
    repo: "jobs-cli",
    stars: 1,
    description: localized("Search and apply for jobs on Indeed and LinkedIn.", "在 Indeed 与 LinkedIn 上搜索并申请职位。")
  },
  {
    repo: "tg-drive-cli",
    stars: 1,
    description: localized(
      "Use a Telegram channel as a file tree you can script and restore.",
      "把 Telegram 频道当作可脚本化、可恢复的文件树。"
    )
  },
  {
    repo: "flickr-cli",
    stars: 0,
    docs: "https://thedavidweng.github.io/site/flickr-cli/",
    description: localized("Manage, upload, and back up your Flickr photos.", "管理、上传并备份你的 Flickr 照片。")
  },
  {
    repo: "zenodo-cli",
    stars: 0,
    docs: "https://thedavidweng.github.io/site/zenodo-cli/",
    description: localized(
      "Manage Zenodo records and file uploads, with full InvenioRDM API access.",
      "管理 Zenodo 记录与文件上传，完整支持 InvenioRDM API。"
    )
  },
  {
    repo: "canvas-cli",
    stars: 0,
    docs: "https://thedavidweng.github.io/site/canvas-cli/",
    description: localized(
      "Canvas LMS from the command line, with automatic paging and an audit log.",
      "在命令行使用 Canvas LMS，自动分页并记录审计日志。"
    )
  },
  {
    repo: "qualtrics-cli",
    stars: 0,
    description: localized(
      "Qualtrics from the command line, plus an offline compiler that turns Markdown into surveys.",
      "在命令行使用 Qualtrics，并附带把 Markdown 离线编译为问卷的工具。"
    )
  }
];

export const contributions: Contribution[] = [
  { owner: "NousResearch", repo: "hermes-agent", description: localized("Extensible AI agent framework", "可扩展的 AI 代理框架") },
  { owner: "emilk", repo: "egui", description: localized("Immediate mode GUI for Rust", "Rust 即时模式 GUI") },
  { owner: "longbridge", repo: "gpui-kit", description: localized("Rust components for GPUI desktop apps", "GPUI 桌面应用的 Rust 组件") },
  { owner: "Homebrew", repo: "homebrew-cask", description: localized("Apple Silicon support and packaging", "Apple Silicon 支持与打包") },
  { owner: "Homebrew", repo: "homebrew-core", description: localized("New formulae and updates", "新增与更新 formula") },
  {
    owner: "projectM-visualizer",
    repo: "projectm",
    description: localized("Music visualization compatible with Milkdrop", "兼容 Milkdrop 的音乐可视化")
  },
  { owner: "apache", repo: "camel-k", description: localized("Integration platform on Kubernetes", "Kubernetes 上的集成平台") },
  {
    owner: "mtkennerly",
    repo: "ludusavi",
    description: localized("Game save backup with Wine and Proton support", "支持 Wine 与 Proton 的游戏存档备份")
  },
  { owner: "getpaseo", repo: "paseo", description: localized("Run coding agents from desktop and mobile", "在桌面与手机上运行编程代理") },
  {
    owner: "mengxi-ream",
    repo: "read-frog",
    description: localized("Browser extension for language learning", "语言学习浏览器扩展")
  },
  { owner: "openclaw", repo: "wacli", description: localized("WhatsApp from the command line", "命令行里的 WhatsApp") },
  { owner: "missuo", repo: "koe", description: localized("Voice input for macOS from a hotkey", "macOS 快捷键语音输入") }
];

export const contributionUrl = ({ owner, repo }: Contribution) =>
  `https://github.com/${owner}/${repo}/pulls?q=is%3Apr+author%3A${githubUser}`;

export const roles = [
  {
    since: localized("Since 2025", "2025 年至今"),
    host: "bc-ai.ca",
    href: "https://bc-ai.ca",
    title: localized("BC + AI Ecosystem", "BC + AI Ecosystem"),
    description: localized(
      "Content operations and graphic design. Visual content for an AI community in British Columbia.",
      "内容运营与平面设计，为不列颠哥伦比亚省的 AI 社区制作视觉内容。"
    )
  },
  {
    since: localized("Since 2025", "2025 年至今"),
    host: "owo.network",
    href: "https://owo.network",
    title: localized("OwO Network", "OwO Network"),
    description: localized(
      "Cofounder. Network acceleration, AI solutions, and IT services for businesses.",
      "联合创始人。为企业提供网络加速、AI 方案与 IT 服务。"
    )
  },
  {
    since: localized("Earlier", "更早"),
    host: "resume.html",
    href: resumeHref,
    title: localized("Resume", "简历"),
    description: localized(
      "Full history, including video production at the Beaty Biodiversity Museum and educational technology at UBC.",
      "完整经历，包括在 Beaty Biodiversity Museum 的视频制作与在 UBC 的教育技术工作。"
    )
  }
];
