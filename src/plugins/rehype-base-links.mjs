/* MDX 课程正文里的站内链接写根相对路径（/glossary#...），
   部署到子路径（GitHub Pages）时由这个 rehype 插件统一加 base 前缀，
   课程作者不用关心部署位置。
   两种节点都要处理：Markdown 链接编译成 element，
   原生 <a> 标签在 MDX 里是 mdxJsxTextElement/mdxJsxFlowElement。 */
export function rehypeBaseLinks(base) {
  const prefix = (base || '/').replace(/\/+$/, '');

  const needsPrefix = (href) =>
    typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('//') &&
    href !== prefix &&
    !href.startsWith(`${prefix}/`);

  return () => (tree) => {
    if (!prefix) return;
    (function walk(node) {
      if (node.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        if (needsPrefix(href)) node.properties.href = prefix + href;
      }
      if (
        (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') &&
        node.name === 'a'
      ) {
        for (const attr of node.attributes || []) {
          if (attr.type === 'mdxJsxAttribute' && attr.name === 'href' && needsPrefix(attr.value)) {
            attr.value = prefix + attr.value;
          }
        }
      }
      for (const child of node.children || []) walk(child);
    })(tree);
  };
}
