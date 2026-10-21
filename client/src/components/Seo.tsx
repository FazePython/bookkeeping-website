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

function removeMeta(attr: "name" | "property", key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
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
  ogType = "website",
  author,
  publishedTime,
  modifiedTime,
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: object;
}) {
  useEffect(() => {
    const url = canonicalUrl(path);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", ogType);
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

    if (author && publishedTime && modifiedTime) {
      upsertMeta("name", "author", author);
      upsertMeta("property", "article:author", author);
      upsertMeta("property", "article:published_time", publishedTime);
      upsertMeta("property", "article:modified_time", modifiedTime);
    } else {
      removeMeta("name", "author");
      removeMeta("property", "article:author");
      removeMeta("property", "article:published_time");
      removeMeta("property", "article:modified_time");
    }

    const id = "page-jsonld";
    const existing = document.getElementById(id);
    if (!jsonLd) {
      existing?.remove();
      return;
    }
    const script = existing ?? document.createElement("script");
    script.id = id;
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(jsonLd);
    if (!existing) document.head.appendChild(script);
  }, [title, description, path, ogType, author, publishedTime, modifiedTime, jsonLd]);

  return null;
}
