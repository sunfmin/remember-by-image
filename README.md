# 图像记忆 · 多存一份画面

私人图像记忆术（visual mnemonics）课程站。AI 家教授课，课程沉淀为本地 Astro 网站：
记忆宫殿式的课程路线图、交互默写测验、朱砂印盖章进度（localStorage）。

```sh
npm install
npm run dev    # http://localhost:4321
```

- 课程：`src/content/lessons/*.mdx`（MDX 内容集合，frontmatter 驱动路线图与导航）
- 术语表 / 资源库：`src/pages/glossary.astro`、`/resources`（直接渲染根目录 `RESOURCES.md`）
- 家教工作文件（非网页）：`MISSION.md`、`NOTES.md`、`RESOURCES.md`、`learning-records/`
- 授课与写新课的约定：见 `AGENTS.md`

不部署、不公开。进度存在本机浏览器 localStorage。
