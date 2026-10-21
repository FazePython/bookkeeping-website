import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { canonicalUrl } from "./client/src/lib/site";
import { resolvePublishToday, selectPublished } from "./client/src/content/publishSchedule";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

function vitePluginStorageProxy(): Plugin {
  return {
    name: "manus-storage-proxy",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/manus-storage", async (req, res) => {
        const key = req.url?.replace(/^\//, "");
        if (!key) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing storage key");
          return;
        }

        const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

        if (!forgeBaseUrl || !forgeKey) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Storage proxy not configured");
          return;
        }

        try {
          const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
          forgeUrl.searchParams.set("path", key);

          const forgeResp = await fetch(forgeUrl, {
            headers: { Authorization: `Bearer ${forgeKey}` },
          });

          if (!forgeResp.ok) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Storage backend error");
            return;
          }

          const { url } = (await forgeResp.json()) as { url: string };
          if (!url) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Empty signed URL");
            return;
          }

          res.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          res.end();
        } catch {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end("Storage proxy error");
        }
      });
    },
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function applyRouteSeo(
  html: string,
  route: { path: string; canonicalPath?: string; title: string; description: string },
) {
  const url = canonicalUrl(route.canonicalPath ?? route.path);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${url}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${url}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${description}" />`,
    );
}

/** Inject Umami only when both public env vars are real values, never the %VITE_*% placeholder. */
function vitePluginOptionalAnalytics(): Plugin {
  return {
    name: "optional-analytics",
    transformIndexHtml() {
      const mode = process.env.NODE_ENV === "production" ? "production" : "development";
      const fileEnv = loadEnv(mode, PROJECT_ROOT, "VITE_");
      const endpoint = (process.env.VITE_ANALYTICS_ENDPOINT || fileEnv.VITE_ANALYTICS_ENDPOINT || "").trim();
      const websiteId = (process.env.VITE_ANALYTICS_WEBSITE_ID || fileEnv.VITE_ANALYTICS_WEBSITE_ID || "").trim();
      if (!endpoint || !websiteId || endpoint.includes("%") || websiteId.includes("%")) {
        return;
      }
      return [
        {
          tag: "script",
          attrs: {
            defer: true,
            src: `${endpoint.replace(/\/$/, "")}/umami`,
            "data-website-id": websiteId,
          },
          injectTo: "body" as const,
        },
      ];
    },
  };
}

type PrerenderModule = {
  render: (url: string) => string;
  prerenderRoutes: () => Array<{
    path: string;
    canonicalPath?: string;
    title: string;
    description: string;
    ogType: "website" | "article";
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    jsonLd?: unknown;
    noindex?: boolean;
    file: string;
  }>;
  sitemapXml: () => string;
};

/**
 * GitHub Pages serves a directory index for clean URLs, and 404.html for unknown paths.
 * The client build renders each route to static HTML with renderToString, then keeps that
 * route's title, description, canonical, and Open Graph tags. The existing CNAME is copied
 * into the Pages artifact unchanged so a deploy does not drop the custom domain.
 */
function vitePluginGithubPages(): Plugin {
  return {
    name: "github-pages-routes",
    apply: "build",
    async closeBundle() {
      if (this.environment.config.build.ssr) return;

      const outDir = path.resolve(PROJECT_ROOT, "dist/public");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const ssrEntry = path.resolve(PROJECT_ROOT, "dist/ssr/entry-server.js");
      if (!fs.existsSync(ssrEntry)) {
        throw new Error("Missing dist/ssr/entry-server.js. Run the SSR build before the client build.");
      }

      const template = fs.readFileSync(indexPath, "utf8");
      if (!template.includes('<div id="root"></div>')) {
        throw new Error("Built index.html has no empty #root placeholder.");
      }

      const prerender = (await import(pathToFileURL(ssrEntry).href)) as PrerenderModule;
      const routes = prerender.prerenderRoutes();

      for (const route of routes) {
        const markup = prerender.render(route.path);
        if (!markup.includes("<h1")) {
          throw new Error(`Prerender for ${route.path} did not include an h1.`);
        }
        let html = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
        html = applyRouteSeo(html, route);
        if (route.ogType === "article") {
          html = html.replace(
            '<meta property="og:type" content="website" />',
            '<meta property="og:type" content="article" />',
          );
          if (route.author && route.publishedTime && route.modifiedTime) {
            const author = escapeHtml(route.author);
            const published = escapeHtml(route.publishedTime);
            const modified = escapeHtml(route.modifiedTime);
            html = html.replace(
              "</head>",
              `    <meta name="author" content="${author}" />\n    <meta property="article:author" content="${author}" />\n    <meta property="article:published_time" content="${published}" />\n    <meta property="article:modified_time" content="${modified}" />\n  </head>`,
            );
          }
        }
        if (route.jsonLd) {
          const json = JSON.stringify(route.jsonLd).replace(/</g, "\\u003c");
          html = html.replace(
            "</head>",
            `    <script id="page-jsonld" type="application/ld+json">${json}</script>\n  </head>`,
          );
        }
        if (route.noindex) {
          html = html.replace("</head>", '    <meta name="robots" content="noindex" />\n  </head>');
        }
        const file = path.join(outDir, route.file);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
      }

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), prerender.sitemapXml());

      const cnamePath = path.resolve(PROJECT_ROOT, "CNAME");
      if (fs.existsSync(cnamePath)) {
        fs.copyFileSync(cnamePath, path.join(outDir, "CNAME"));
      }
    },
  };
}

const PUBLISHED_ARTICLES_ID = "virtual:published-articles";

type ArticleModule = {
  article?: {
    slug?: string;
    title?: string;
    publishDate: string;
    datePublished?: string;
    draft?: boolean;
  };
};

/**
 * Reads article files in Node, then emits a module containing only articles whose
 * publishDate is on or before today in America/Chicago. Future files are not imported,
 * so their text, titles, and slugs stay out of the client and SSR bundles.
 */
function vitePluginPublishedArticles(): Plugin {
  const resolvedId = `\0${PUBLISHED_ARTICLES_ID}`;
  return {
    name: "published-articles",
    resolveId(id) {
      if (id === PUBLISHED_ARTICLES_ID) return resolvedId;
    },
    async load(id) {
      if (id !== resolvedId) return null;
      const today = resolvePublishToday(process.env.BUILD_DATE);
      const dir = path.resolve(PROJECT_ROOT, "client/src/content/articles");
      const files = fs.readdirSync(dir).filter((name) => name.endsWith(".ts")).sort();
      const loaded: ArticleModule["article"][] = [];
      for (const name of files) {
        const source = fs.readFileSync(path.join(dir, name), "utf8");
        const transformed = await esbuild.transform(source, { loader: "ts", format: "esm" });
        const mod = (await import(
          `data:text/javascript;base64,${Buffer.from(transformed.code).toString("base64")}`
        )) as ArticleModule;
        if (!mod.article) {
          throw new Error(`${name} does not export an article.`);
        }
        loaded.push(mod.article);
      }
      const published = selectPublished(loaded, today);
      return `export const publishedArticleData = ${JSON.stringify(published)};\n`;
    },
  };
}

const plugins = [
  vitePluginPublishedArticles(),
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginManusRuntime(),
  vitePluginManusDebugCollector(),
  vitePluginStorageProxy(),
  vitePluginOptionalAnalytics(),
  vitePluginGithubPages(),
];

export default defineConfig(({ isSsrBuild }) => ({
  base: "/", 
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, isSsrBuild ? "dist/ssr" : "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
