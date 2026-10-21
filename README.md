# SteadyBooks

Marketing site for SteadyBooks. The production build prerenders each route to static HTML and writes `dist/public`.

## Add an article

Articles live in `client/src/content/articles/`, one TypeScript file per article. Export a named `article` object:

- `slug`: lowercase words separated by hyphens. This becomes `/articles/<slug>/`.
- `title`
- `description`: the meta description, copied verbatim from the approved article.
- `author`: name used for the author meta tags and Article structured data
- `datePublished` and `dateModified`: `YYYY-MM-DD`
- `body`: the article text. Blank lines separate paragraphs. Headings, lists, bold, links, and a markdown table are rendered in the page. A `**About the author**` section is shown in an author box.
- `draft`: set `true` until the text is approved.

`draft: true` files stay in the repo and are skipped. They are not listed, not prerendered, and not added to the sitemap. `client/src/content/articles/sample-remote-bookkeeping.ts` is that kind of sample. Do not publish it.

To publish an approved article, add a new file with `draft: false` (or omit `draft`). Then run:

```bash
pnpm run build
```

The build renders `/articles/<slug>/` with its own title, description, canonical URL, `og:type=article`, share tags, and Article structured data. The sitemap is generated from the site routes plus published articles. With no published articles, `/articles/` shows “Articles coming soon.”
