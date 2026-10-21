const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type Publishable = {
  slug?: string;
  title?: string;
  publishDate: string;
  datePublished?: string;
  draft?: boolean;
};

/** Calendar date in America/Chicago. This does not use the UTC date. */
export function chicagoDate(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;
  const year = value("year");
  const month = value("month");
  const day = value("day");
  if (!year || !month || !day) {
    throw new Error("Could not resolve the America/Chicago calendar date.");
  }
  return `${year}-${month}-${day}`;
}

/**
 * Date used to decide which articles ship.
 * `BUILD_DATE` overrides the clock for a local or test build. Production leaves it unset.
 */
export function resolvePublishToday(buildDate = process.env.BUILD_DATE, now = new Date()): string {
  const override = buildDate?.trim();
  if (override) {
    if (!ISO_DATE.test(override)) {
      throw new Error(`BUILD_DATE must be YYYY-MM-DD, received "${override}".`);
    }
    return override;
  }
  return chicagoDate(now);
}

export function comparePublished<T extends Publishable>(a: T, b: T): number {
  return (
    b.publishDate.localeCompare(a.publishDate) ||
    (b.datePublished ?? "").localeCompare(a.datePublished ?? "") ||
    (a.title ?? "").localeCompare(b.title ?? "")
  );
}

/** Articles whose publishDate is on or before `today`, newest first. Drafts are omitted. */
export function selectPublished<T extends Publishable>(articles: readonly T[], today: string): T[] {
  if (!ISO_DATE.test(today)) {
    throw new Error(`Publish cutoff must be YYYY-MM-DD, received "${today}".`);
  }
  return articles
    .filter((article) => {
      if (article.draft === true) return false;
      if (!ISO_DATE.test(article.publishDate)) {
        throw new Error(`Article "${article.slug ?? "?"}" needs a YYYY-MM-DD publishDate.`);
      }
      return article.publishDate <= today;
    })
    .sort(comparePublished);
}
