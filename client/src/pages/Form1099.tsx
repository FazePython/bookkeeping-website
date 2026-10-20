import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import ConsultLink from "@/components/ConsultLink";
import { ROUTE_SEO } from "@/lib/site";

const seo = ROUTE_SEO.find((route) => route.path === "/1099")!;

const cta =
  "inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-white text-navy px-7 py-4 rounded-lg hover:bg-stone transition-all shadow-md";

const IRS_1099_URL =
  "https://www.irs.gov/businesses/small-businesses-self-employed/am-i-required-to-file-a-form-1099-or-other-information-return";

export default function Form1099() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <Navbar />

      <section className="pt-32 pb-16 bg-stone">
        <div className="container max-w-3xl">
          <span className="section-rule" />
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-5">
            Form 1099-NEC, for people who pay contractors
          </h1>
          <p className="font-body text-lg text-navy/70 leading-relaxed">
            A plain-language look for small business owners and freelancers. This is bookkeeping information, not tax advice.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container max-w-3xl space-y-10">
          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">What Form 1099-NEC is</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed">
              Form 1099-NEC reports nonemployee compensation. It is the form a business generally uses to tell a contractor, and the IRS, how much it paid that person for services during the year.
            </p>
          </article>

          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">Who generally needs to file one</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed">
              If you pay someone who is not your employee for services in your business, you generally look at Form 1099-NEC. Employees are different: their pay is handled through payroll. Some payments do not go on a 1099-NEC you prepare, including many payments to corporations and payments a card processor or app already reports. Check with your tax preparer for your contractors.
            </p>
          </article>

          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">The reporting threshold</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed mb-3">
              For payments made in 2026, the IRS generally raised the Form 1099-NEC reporting threshold from $600 to $2,000. Years after 2026 may be adjusted for inflation, so the dollar amount is not frozen. If federal income tax was withheld, a form is generally required no matter the amount. This is a general rule with exceptions. Check with your tax preparer before you decide whether a form is required.
            </p>
            <p className="font-body text-sm text-navy/70 leading-relaxed">
              Source:{" "}
              <a
                href={IRS_1099_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gold underline-offset-4"
              >
                IRS, “Am I required to file a Form 1099 or other information return?”
              </a>
            </p>
          </article>

          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">The late-January deadline</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed">
              You generally send Form 1099-NEC to the contractor and file it with the IRS by January 31 of the following year. That is a late-January deadline. Confirm the date for your filing year with your tax preparer.
            </p>
          </article>

          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">Keep W-9s on file</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed">
              Ask each contractor for a Form W-9 before you pay them, and keep it on file. It has the legal name and taxpayer identification number that go on the 1099-NEC. Collecting it at the start is much easier than chasing it in January.
            </p>
          </article>

          <article>
            <h2 className="font-display font-semibold text-2xl text-navy mb-3">How SteadyBooks helps</h2>
            <p className="font-body text-base text-navy/75 leading-relaxed mb-3">
              I prepare 1099-NEC forms from your bookkeeping records. 1099 preparation is $75 plus $15 per form. If you pay employees, payroll support is separate from 1099 preparation.
            </p>
            <p className="font-body text-sm text-navy/80 italic leading-relaxed">
              SteadyBooks provides bookkeeping only. Tax filing and tax advice are not included. I do not decide what you owe or file your tax return.
            </p>
          </article>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display font-bold text-3xl text-white leading-tight mb-4">
            Want help getting contractor payments ready?
          </h2>
          <p className="font-body text-base text-white/75 leading-relaxed mb-8">
            Book a free 30-minute consult and we'll look at what you need to collect.
          </p>
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
