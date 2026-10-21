# SteadyBooks

Marketing site for SteadyBooks. The production build prerenders each route to static HTML and writes `dist/public`.

## Add an article

Articles live in `client/src/content/articles/`, one TypeScript file per article. Export a named `article` object:

- `slug`: lowercase words separated by hyphens. This becomes `/articles/<slug>/`.
- `title`
- `description`: the meta description. Lead with “100% remote, serving clients across the US”.
- `datePublished` and `dateModified`: `YYYY-MM-DD`
- `body`: plain text. A blank line starts a new paragraph.
- `draft`: set `true` until the text is approved.

`draft: true` files stay in the repo and are skipped. They are not listed, not prerendered, and not added to the sitemap. `client/src/content/articles/sample-remote-bookkeeping.ts` is that kind of sample. Do not publish it.

To publish an approved article, add a new file with `draft: false` (or omit `draft`). Then run:

```bash
pnpm run build
```

The build renders `/articles/<slug>/` with its own title, description, canonical URL, `og:type=article`, share tags, and Article structured data. The sitemap is generated from the site routes plus published articles. With no published articles, `/articles/` shows “Articles coming soon.”
