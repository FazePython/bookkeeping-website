import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import ConsultLink from "@/components/ConsultLink";
import { ROUTE_SEO } from "@/lib/site";

const seo = ROUTE_SEO.find((route) => route.path === "/how-it-works")!;

const cta =
  "inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-white text-navy px-7 py-4 rounded-lg hover:bg-stone transition-all shadow-md";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <Navbar />
      <section className="pt-32 pb-16 bg-stone">
        <div className="container max-w-3xl">
          <span className="section-rule" />
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-5">
            How it works
          </h1>
          <p className="font-body text-lg text-navy/70 leading-relaxed">
            It's a free 30-minute consult with no pressure and no jargon.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl space-y-10">
          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">1. Book a free consult</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed">
              Not sure which plan fits? We'll figure it out together on a free consult. If your volume grows past your plan's limits, we'll talk before anything changes. There are no surprise charges.
            </p>
          </article>
          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">2. Catch up, if you need it</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed mb-3">
              I'll catch up your books, reconcile your accounts, and hand you clean, tax-preparer-ready year-end reports by February 15.
            </p>
            <ul className="space-y-2 font-body text-sm text-navy/75 leading-relaxed">
              <li>$750 for the year-end tax-ready package</li>
              <li>Plus $150 catch-up add-on for each month your books are behind</li>
              <li>50% upfront to reserve your spot, with the balance due on delivery</li>
              <li>Sign up by Jan 15 to be ready by Feb 15</li>
              <li>Catch-up bookkeeping: $150 for each month behind</li>
              <li>Cleanup, for books that exist but are messy or wrong: $200 per month of records</li>
              <li>Catch-up and cleanup projects have a $500 minimum, with 50% upfront</li>
            </ul>
            <p className="mt-3 font-body text-sm text-navy/70 italic leading-relaxed">
              To hit the Feb 15 date, I need your bank and credit card statements and records promptly. Tax filing is not included.
            </p>
          </article>
          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">3. Stay current each month</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed">
              Every plan includes transaction categorization, bank and credit card reconciliation, and monthly financial reports. Monthly clients also get the year-end package at no extra cost. Starter is $300/month, Growth is $500/month, and Plus is $800/month.
            </p>
          </article>
          <p className="font-body text-sm text-navy/80 italic">
            SteadyBooks provides bookkeeping only. Tax filing and tax advice are not included.
          </p>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="container text-center">
          <ConsultLink className={cta}>
            Book a free consult
            <ArrowRight className="w-4 h-4" />
          </ConsultLink>
        </div>
      </section>
      <Footer />
    </div>
  );
}
