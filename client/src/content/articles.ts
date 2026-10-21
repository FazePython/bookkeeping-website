import { canonicalUrl, SITE_URL } from "@/lib/site";
import { comparePublished } from "@/content/publishSchedule";
import { publishedArticleData } from "virtual:published-articles";

export type Article = {
  slug: string;
  title: string;
  description: string;
  author: string;
  /** YYYY-MM-DD in America/Chicago. The build omits the article until this date. */
  publishDate: string;
  datePublished: string;
  dateModified: string;
  body: string;
  /** Drafts are omitted from pages, prerendered HTML, and the sitemap. */
  draft?: boolean;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function assertArticle(article: Article, source: string) {
  if (!SLUG.test(article.slug)) {
    throw new Error(`${source} has an invalid slug "${article.slug}"`);
  }
  if (!article.title.trim() || !article.description.trim() || !article.author.trim() || !article.body.trim()) {
    throw new Error(`${source} is missing a title, description, author, or body`);
  }
  if (!ISO_DATE.test(article.publishDate) || !ISO_DATE.test(article.datePublished) || !ISO_DATE.test(article.dateModified)) {
    throw new Error(`${source} dates must be YYYY-MM-DD`);
  }
}

/**
 * Articles selected at build time. Future `publishDate` values are not in this list,
 * so their text is not bundled. Drafts are skipped again here.
 */
export function publishedArticles(): Article[] {
  const published = publishedArticleData.filter((article) => article.draft !== true);
  const seen = new Set<string>();
  for (const article of published) {
    assertArticle(article, article.slug);
    if (seen.has(article.slug)) {
      throw new Error(`Duplicate article slug "${article.slug}"`);
    }
    seen.add(article.slug);
  }
  return published.sort(comparePublished);
}

export function articlePath(slug: string) {
  return `/articles/${slug}`;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatArticleDate(iso: string) {
  const match = ISO_DATE.exec(iso);
  if (!match) return iso;
  const month = MONTHS[Number(iso.slice(5, 7)) - 1];
  if (!month) return iso;
  return `${month} ${Number(iso.slice(8, 10))}, ${iso.slice(0, 4)}`;
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SteadyBooks",
      url: `${SITE_URL}/`,
    },
    mainEntityOfPage: canonicalUrl(articlePath(article.slug)),
    image: `${SITE_URL}/og-image-v2.png`,
  };
}
