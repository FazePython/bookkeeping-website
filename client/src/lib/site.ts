/** Shared site facts. Visible copy lives in the pages; this file is addresses, SEO, and links. */

export const SITE_URL = "https://www.steady-books.com";
export const CONTACT_EMAIL = "faizan@steady-books.com";
export const CALENDLY_URL = "https://calendly.com/faizan-steady-books/30min";
/** GoatCounter site code. VITE_GOATCOUNTER_CODE overrides this when set. */
export const GOATCOUNTER_CODE = "steadybooks";

export const HOME_TITLE =
  "SteadyBooks | QuickBooks Certified ProAdvisor | 100% Remote, Serving Clients Across the US";

export const HOME_DESCRIPTION =
  "100% remote, serving clients across the US. Bookkeeping for freelancers, new LLCs, and small businesses. Catch-up, cleanup, and monthly books. Get tax-ready by Feb 15. Free consult.";

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
    title: "About Faizan Qureshi | SteadyBooks",
    description:
      "Faizan Qureshi is a QuickBooks Certified ProAdvisor. He started SteadyBooks in October 2026. SteadyBooks is 100% remote, serving clients across the US.",
  },
  {
    path: "/services",
    title: "Bookkeeping Services | SteadyBooks",
    description:
      "Monthly bookkeeping, catch-up and cleanup, financial reports, QuickBooks Online setup, tax-preparer-ready books, and payroll support. Tax filing is not included.",
  },
  {
    path: "/how-it-works",
    title: "How Bookkeeping with SteadyBooks Works",
    description:
      "Book a free consult, then catch-up, cleanup, or a flat monthly plan. SteadyBooks provides bookkeeping only. Tax filing and tax advice are not included.",
  },
  {
    path: "/contact",
    title: "Contact SteadyBooks | Remote Bookkeeping",
    description:
      "Email faizan@steady-books.com or book a free 30-minute consult.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | SteadyBooks",
    description:
      "How SteadyBooks collects, uses, and deletes the name, email, phone number, and business name you send through the contact form. Last updated October 20, 2026.",
  },
  {
    path: "/tax-ready",
    title: "Tax-Ready Books by Feb 15 | SteadyBooks",
    description:
      "Catch-up bookkeeping and clean, tax-preparer-ready year-end books by February 15. $750 for the year-end package, plus $150 for each month behind. Book a free consult.",
  },
  {
    path: "/1099",
    title: "Form 1099-NEC Explained | SteadyBooks",
    description:
      "Plain-language bookkeeping notes on Form 1099-NEC for small businesses and freelancers who pay contractors: who generally files, the late-January deadline, and W-9s.",
  },
  {
    path: "/articles",
    title: "Articles | SteadyBooks",
    description:
      "100% remote, serving clients across the US. Bookkeeping notes from SteadyBooks for freelancers, new LLCs, and small businesses.",
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
