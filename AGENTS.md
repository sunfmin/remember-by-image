# 图像记忆 · 私人课程站

这是 Felix 的私人学习项目：AI 家教在辅导 session 里授课，课程沉淀为一个本地 Astro 网站。
不部署、不公开，`npm run dev` 后在本机浏览器学习。

## 角色分工（两类文件，别混）

- **家教工作文件**（仓库根，不是网页）：`MISSION.md` 使命与边界、`NOTES.md` 教学笔记、
  `RESOURCES.md` 查证过的资源清单、`learning-records/` 教学观察档案。
  授课前先读这几个文件；有新观察就更新它们。
- **学习材料**（网站页面）：`src/content/lessons/*.mdx` 课程、`src/pages/glossary.astro` 术语表、
  资源页直接渲染根目录的 `RESOURCES.md`（单一事实来源，改资源只改 md）。

## 教学立场（授课时必须遵守）

- 不用「右脑」话术——左右脑二分是 neuromyth。课程语言统一叫「多存一份画面」（双编码）。
- 每课必有提取练习（默写/测验），不是「再读一遍」。
- 中文授课，每课约 15-30 分钟，按能力阶梯推进，无截止日期。
- 新术语必须登记进术语表（`glossary.astro`），全课程统一叫法。

## 写一节新课

1. 新建 `src/content/lessons/000N-<slug>.mdx`，frontmatter 必填：
   `order`（课号）、`title`、`minutes`、`skill`（技能名）、`skillId`（术语表锚点，可选）、
   `emblem`（路线图上的 emoji 徽记）、`summary`（首页路线卡一句话）。
   最后一课可写 `teaser:`（title/emblem/note）——首页路线尽头的「下一站」预告。
2. 正文可用的组件（从 `../../components/` 导入）：
   - `<WordGrid items={[{ word, pic }]}/>` 词卡网格，pic 为角落小 emoji（双编码示范）
   - `<Storyboard>` 内放 Markdown 有序列表，每项一格「分镜」
   - `<RecallTest items={[...]} ordered placeholder="第 {n} 个"/>` 回忆默写，成绩自动记入进度
   - `<Quiz questions={[{ q, options, answer, explain }]}/>` 选择题，选项字数要相同
   - `<Box title="..." variant="win">` 提示框
3. 课末不用写「完成」按钮和上一课/下一课——布局（`src/layouts/Lesson.astro`）自带
   盖章完成块和相邻课导航。
4. 术语首次出现用 `<span class="term">` 并链去 `/glossary#锚点`，引用来源用
   `<a href="..." class="cite">(作者 年份)</a>`。

## 进度数据

localStorage（`src/scripts/progress.ts`）：每课 `rbi:v1:lesson:<slug>`
（done / recall / quiz / attempts），练习日期 `rbi:v1:days`（算连续天数）。
首页路线图读这些数据显示盖章与成绩。清空浏览器数据 = 进度归零，属预期。

## 开发

```
npm run dev        # 本地学习/预览
npm run build      # 构建检查（改完组件或样式跑一次）
```

设计语言：记忆宫殿路线图 + 朱砂印「记」。色板在 `src/styles/global.css` 顶部
（暮蓝紫/琥珀/朱砂/月白，深浅双模式），改样式先看那里的 token。
