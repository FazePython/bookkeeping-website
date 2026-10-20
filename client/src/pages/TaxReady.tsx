import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { ROUTE_SEO } from "@/lib/site";

const seo = ROUTE_SEO.find((route) => route.path === "/tax-ready")!;

const steps = [
  {
    title: "Free consult",
    body: "We look at where your books stand and whether this package fits. It's a free 30-minute consult with no pressure.",
  },
  {
    title: "Send statements",
    body: "You send the bank and credit card statements and records for the months we're catching up.",
  },
  {
    title: "I catch up and reconcile",
    body: "I categorize the transactions, reconcile the accounts, and get the year organized.",
  },
  {
    title: "Tax-preparer-ready reports by Feb 15",
    body: "You get clean year-end books you can hand to your tax preparer by February 15.",
  },
];

const needed = [
  "Bank and credit card statements for the period we're catching up",
  "Access to QuickBooks Online, if you already use it",
  "Notes or receipts for charges that aren't clear from the statement",
  "Prompt replies, so the February 15 delivery stays realistic",
];

export default function TaxReady() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <Navbar />

      <section className="pt-32 pb-16 bg-stone">
        <div className="container max-w-3xl">
          <span className="section-rule" />
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-5">
            Catch-up and clean, tax-preparer-ready books by Feb 15.
          </h1>
          <p className="font-body text-lg text-navy/70 leading-relaxed">
            I'll catch up the months you're behind, reconcile your accounts, and hand you organized year-end books by February 15.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container max-w-3xl">
          <h2 className="font-display font-semibold text-2xl text-navy mb-4">The offer</h2>
          <ul className="space-y-3">
            {[
              "$750 for the year-end package",
              "$150 for each month your books are behind",
              "50% upfront to reserve, with the balance due on delivery",
              "Book early to make sure your books are ready by Feb 15.",
            ].map((item) => (
              <li
                key={item}
                className="bg-white border border-stone-dark rounded-xl px-4 py-3 font-body text-sm text-navy/85"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-body text-sm text-navy/70 italic leading-relaxed">
            To hit the Feb 15 date, I need your statements and records promptly.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-stone">
        <div className="container max-w-3xl">
          <h2 className="font-display font-semibold text-2xl text-navy mb-6">How it works</h2>
          <ol className="space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-white border border-stone-dark rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-semibold text-xl text-navy mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="font-body text-sm text-navy/75 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container max-w-3xl">
          <h2 className="font-display font-semibold text-2xl text-navy mb-4">What I need from you</h2>
          <ul className="space-y-3 font-body text-sm text-navy/75 leading-relaxed">
            {needed.map((item) => (
              <li key={item} className="bg-white border border-stone-dark rounded-xl px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-body text-sm text-navy/80 italic leading-relaxed">
            SteadyBooks provides bookkeeping only. Tax filing and tax advice are not included.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-sage-pale">
        <div className="container max-w-3xl">
          <h2 className="font-display font-semibold text-2xl text-navy mb-3">Book a free consult</h2>
          <p className="font-body text-base text-navy/75 leading-relaxed mb-6">
            Tell me how far behind the books are. We'll see if this package is the right fit.
          </p>
          <CalendlyEmbed />
          <p className="mt-4 font-body text-sm text-navy/60 inline-flex items-center gap-1">
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
            The link above works even if the scheduler does not load on this page.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
