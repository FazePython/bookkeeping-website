/** Shared site facts. Visible copy lives in the pages; this file is addresses, SEO, and links. */

export const SITE_URL = "https://www.steady-books.com";
export const CONTACT_EMAIL = "faizan@steady-books.com";
export const CALENDLY_URL = "https://calendly.com/faizan-steady-books/30min";
export const STREET_ADDRESS = "1400 Andrew Parkway";
export const CITY_LINE = "Allen, TX 75002";

/**
 * Headshot slot. Replace this file with a real photo of Faizan.
 * Do not point this at the logo.
 */
export const HEADSHOT_SRC = "/images/faizan-headshot.svg";

/**
 * Free form endpoint. No API key is stored in the repo.
 * The address owner must open FormSubmit's one-time activation email
 * before a submission is actually delivered. The form only reports
 * success when that service returns success.
 */
export const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export const HOME_TITLE =
  "SteadyBooks | QuickBooks Certified ProAdvisor in Allen, TX";

export const HOME_DESCRIPTION =
  "Remote bookkeeping for freelancers, new LLCs & small businesses. Catch-up, cleanup & monthly books from Allen, TX. Get tax-ready by Feb 15. Free consult.";

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
      "Faizan Qureshi is a QuickBooks Certified ProAdvisor in Allen, TX. He started SteadyBooks in October 2026 and works with clients remotely across the U.S.",
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
    title: "Contact SteadyBooks | Allen, TX",
    description:
      "Email faizan@steady-books.com or book a free 30-minute consult. SteadyBooks is at 1400 Andrew Parkway, Allen, TX 75002.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | SteadyBooks",
    description:
      "How SteadyBooks collects, uses, and deletes the name, email, phone number, and business name you send through the contact form. Last updated October 20, 2026.",
  },
];

export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SteadyBooks",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: STREET_ADDRESS,
    addressLocality: "Allen",
    addressRegion: "TX",
    postalCode: "75002",
    addressCountry: "US",
  },
  areaServed: "US",
};
