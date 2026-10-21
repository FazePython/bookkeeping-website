import type { Article } from "../articles";

/**
 * Testing-only sample. `draft: true` keeps it out of the production pages,
 * prerendered HTML, and sitemap. Publish a real article by adding a new file
 * with `draft: false` after the text is approved. Do not publish this sample.
 */
export const article: Article = {
  slug: "sample-remote-bookkeeping",
  title: "Sample article for testing only",
  description:
    "100% remote, serving clients across the US. Draft sample for the articles system. Not published.",
  author: "Faizan Qureshi",
  publishDate: "2026-10-21",
  datePublished: "2026-10-21",
  dateModified: "2026-10-21",
  draft: true,
  body: `This file is a draft sample for testing the article system. It is not published, and it is not approved copy.

SteadyBooks is 100% remote, serving clients across the US. Bookkeeping for freelancers, new LLCs, and small businesses stays with the person you hired.`,
};
