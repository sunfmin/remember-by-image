/* 站内链接统一从这里拿，部署在子路径（GitHub Pages）时自动带 base 前缀。 */
export const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return base + path;
};
