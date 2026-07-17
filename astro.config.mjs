// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { rehypeBaseLinks } from './src/plugins/rehype-base-links.mjs';

const base = '/remember-by-image';

// https://astro.build/config
export default defineConfig({
  site: 'https://sunfmin.com',
  base,
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeBaseLinks(base)],
  },
});
