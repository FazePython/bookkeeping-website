/** Shared site facts. Visible copy lives in the pages; this file is addresses, SEO, and links. */

export const SITE_URL = "https://www.steady-books.com";
export const CONTACT_EMAIL = "faizan@steady-books.com";
export const CALENDLY_URL = "https://calendly.com/faizan-steady-books/30min";
/** GoatCounter site code. VITE_GOATCOUNTER_CODE overrides this when set. */
export const GOATCOUNTER_CODE = "steadybooks";
/** Web3Forms access key. Public by design. VITE_WEB3FORMS_KEY overrides it when set. */
export const WEB3FORMS_ACCESS_KEY = "1008c8da-6ae6-4058-ab27-139c89aeec6a";

export const HOME_TITLE = "Remote Bookkeeping by a QuickBooks Certified ProAdvisor";

export const HOME_DESCRIPTION =
  "100% remote, serving clients across the US. Bookkeeping for freelancers, new LLCs, and small businesses. Catch-up, monthly books, tax-preparer-ready records.";

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
};

export const ROUTE_SEO: RouteSeo[] = [
  {
    path: "/",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  {
    path: "/about",
    title: "About Faizan Qureshi | QuickBooks Certified ProAdvisor",
    description:
      "Faizan Qureshi is a QuickBooks Certified ProAdvisor. He started SteadyBooks in October 2026. SteadyBooks is 100% remote, serving clients across the US.",
  },
  {
    path: "/services",
    title: "Bookkeeping Services for Small Businesses | SteadyBooks",
    description:
      "Monthly bookkeeping, catch-up and cleanup, reports, and QuickBooks Online setup. Tax-preparer-ready books. 100% remote, serving clients across the US.",
  },
  {
    path: "/how-it-works",
    title: "How Bookkeeping with SteadyBooks Works, 100% Remote",
    description:
      "Book a free consult, then catch-up, cleanup, or a flat monthly plan. SteadyBooks provides bookkeeping only. Tax filing and tax advice are not included.",
  },
  {
    path: "/contact",
    title: "Contact SteadyBooks | 100% Remote Bookkeeping Help",
    description:
      "100% remote, serving clients across the US. Email faizan@steady-books.com or book a free 30-minute consult about monthly books, catch-up, or cleanup.",
  },
  {
    path: "/privacy",
    title: "SteadyBooks Privacy Policy | How Inquiry Details Are Used",
    description:
      "How SteadyBooks collects, uses, and deletes the name, email, phone number, and business name you send through the contact form. Last updated October 22, 2026.",
  },
  {
    path: "/tax-ready",
    title: "Tax-Ready Bookkeeping by February 15 | SteadyBooks",
    description:
      "100% remote, serving clients across the US. Catch-up bookkeeping and tax-preparer-ready year-end books by February 15 for small businesses. Book a free consult.",
  },
  {
    path: "/1099",
    title: "Form 1099-NEC Explained for Small Businesses | SteadyBooks",
    description:
      "Plain-language notes on Form 1099-NEC for small businesses and freelancers who pay contractors: who generally files, the late-January deadline, and W-9s.",
  },
  {
    path: "/articles",
    title: "Bookkeeping Articles for Small Businesses | SteadyBooks",
    description:
      "100% remote, serving clients across the US. Notes on catch-up, monthly books, QuickBooks Online, reconciliations, and tax-preparer-ready records.",
  },
];

export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return `${SITE_URL}${withSlash}`;
}

export const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SteadyBooks",
  url: `${SITE_URL}/`,
  email: CONTACT_EMAIL,
  image: `${SITE_URL}/og-image-v2.png`,
  logo: `${SITE_URL}/favicon.svg`,
  description: HOME_DESCRIPTION,
  areaServed: "United States",
};
