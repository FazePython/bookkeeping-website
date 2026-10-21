import { useEffect } from "react";
import { canonicalUrl } from "@/lib/site";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  useEffect(() => {
    const url = canonicalUrl(path);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "SteadyBooks");
    upsertMeta("property", "og:image", "https://www.steady-books.com/og-image-v2.png");
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta(
      "property",
      "og:image:alt",
      "SteadyBooks, QuickBooks Certified ProAdvisor. 100% remote, serving clients across the US. Bookkeeping for freelancers and small businesses.",
    );
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:image", "https://www.steady-books.com/og-image-v2.png");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertCanonical(url);
  }, [title, description, path]);

  return null;
}
