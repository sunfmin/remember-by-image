import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    minutes: z.number(),
    skill: z.string(),
    skillId: z.string().optional(), // 术语表锚点 id
    emblem: z.string(), // 路线图地点桩上的图像徽记（emoji）
    summary: z.string(),
    // 最后一课可以写「下一站」预告，显示在首页路线尽头
    teaser: z
      .object({
        title: z.string(),
        emblem: z.string(),
        note: z.string(),
      })
      .optional(),
  }),
});

export const collections = { lessons };
