import { renderToString } from "react-dom/server";
import App from "./App";
import { articleJsonLd, articlePath, publishedArticles } from "./content/articles";
import { canonicalUrl, ROUTE_SEO } from "./lib/site";

export type PrerenderRoute = {
  path: string;
  /** Head canonical when it should differ from the rendered path. 404 keeps the homepage canonical. */
  canonicalPath?: string;
  title: string;
  description: string;
  ogType: "website" | "article";
  jsonLd?: unknown;
  noindex?: boolean;
  file: string;
};

function pageFile(path: string) {
  if (path === "/") return "index.html";
  return `${path.replace(/^\//, "")}/index.html`;
}

export function prerenderRoutes(): PrerenderRoute[] {
  const pages: PrerenderRoute[] = ROUTE_SEO.map((route) => ({
    path: route.path,
    title: route.title,
    description: route.description,
    ogType: "website",
    file: pageFile(route.path),
  }));

  const articles: PrerenderRoute[] = publishedArticles().map((article) => ({
    path: articlePath(article.slug),
    title: `${article.title} | SteadyBooks`,
    description: article.description,
    ogType: "article",
    jsonLd: articleJsonLd(article),
    file: pageFile(articlePath(article.slug)),
  }));

  return [
    ...pages,
    ...articles,
    {
      path: "/404",
      canonicalPath: "/",
      title: "Page not found | SteadyBooks",
      description: "That page is not part of the SteadyBooks site.",
      ogType: "website",
      noindex: true,
      file: "404.html",
    },
  ];
}

export function sitemapXml() {
  const urls = [
    ...ROUTE_SEO.map((route) => canonicalUrl(route.path)),
    ...publishedArticles().map((article) => canonicalUrl(articlePath(article.slug))),
  ];
  const body = urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function render(url: string) {
  const pathname = url.split("?")[0].split("#")[0];
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname || "/";
  return renderToString(<App ssrPath={normalized} />);
}
