import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import ConsultLink from "@/components/ConsultLink";
import { ROUTE_SEO } from "@/lib/site";

const seo = ROUTE_SEO.find((route) => route.path === "/services")!;

const services = [
  {
    title: "Monthly bookkeeping",
    body: "I categorize your transactions and reconcile your bank and credit card accounts every month.",
  },
  {
    title: "Catch-up and cleanup",
    body: "I get books that are months behind, or set up wrong, back on track.",
  },
  {
    title: "Monthly financial reports",
    body: "You'll know what you earned, what you spent, and where you stand.",
  },
  {
    title: "QuickBooks Online setup and support",
    body: "I set up your QuickBooks the right way from day one.",
  },
  {
    title: "Tax-preparer-ready books",
    body: "Your records are organized and ready to hand to your tax preparer.",
  },
  {
    title: "Payroll support and 1099 preparation",
    body: "I take care of the paperwork side so you don't have to.",
  },
];

const cta =
  "inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-navy text-white px-7 py-4 rounded-lg hover:bg-navy-dark transition-all shadow-md";

export default function Services() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <Navbar />
      <section className="pt-32 pb-16 bg-stone">
        <div className="container max-w-3xl">
          <span className="section-rule" />
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-5">
            What I do
          </h1>
          <p className="font-body text-lg text-navy/70 leading-relaxed">
            Bookkeeping for freelancers, new LLCs, and small businesses from a QuickBooks Certified ProAdvisor.
          </p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl">
          <ul className="space-y-5">
            {services.map((service) => (
              <li key={service.title} className="bg-white border border-stone-dark rounded-2xl p-6 shadow-sm">
                <h2 className="font-display font-semibold text-xl text-navy mb-2">{service.title}</h2>
                <p className="font-body text-sm text-navy/75 leading-relaxed">{service.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-body text-sm text-navy/80 italic">
            SteadyBooks provides bookkeeping only. Tax filing and tax advice are not included.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <ConsultLink className={cta}>
              Book a free consult
              <ArrowRight className="w-4 h-4" />
            </ConsultLink>
            <a
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm border-2 border-navy text-navy px-7 py-4 rounded-lg hover:bg-stone transition-all"
            >
              See pricing
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
