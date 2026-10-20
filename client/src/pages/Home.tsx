import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  FileText,
  RefreshCw,
  Settings,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import ConsultLink from "@/components/ConsultLink";
import Headshot from "@/components/Headshot";
import SignupDeadline from "@/components/SignupDeadline";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/site";

const HERO_IMG = "/images/hero-workspace.svg";

const facts = [
  "QuickBooks Certified ProAdvisor",
  "Based in Allen, TX",
  "Remote, nationwide",
];

const services = [
  {
    icon: CalendarCheck,
    title: "Monthly bookkeeping",
    body: "I categorize your transactions and reconcile your bank and credit card accounts every month.",
  },
  {
    icon: RefreshCw,
    title: "Catch-up and cleanup",
    body: "I get books that are months behind, or set up wrong, back on track.",
  },
  {
    icon: BarChart3,
    title: "Monthly financial reports",
    body: "You'll know what you earned, what you spent, and where you stand.",
  },
  {
    icon: Settings,
    title: "QuickBooks Online setup and support",
    body: "I set up your QuickBooks the right way from day one.",
  },
  {
    icon: FileText,
    title: "Tax-preparer-ready books",
    body: "Your records are organized and ready to hand to your tax preparer.",
  },
  {
    icon: Users,
    title: "Payroll support and 1099 preparation",
    body: "I take care of the paperwork side so you don't have to.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$300/month",
    transactions: "Up to 75",
    accounts: "Up to 3",
    reports: "✔",
    yearEnd: "Included",
    review: "",
  },
  {
    name: "Growth",
    price: "$500/month",
    transactions: "Up to 200",
    accounts: "Up to 6",
    reports: "✔",
    yearEnd: "Included",
    review: "",
  },
  {
    name: "Plus",
    price: "$800/month",
    transactions: "Up to 400",
    accounts: "Up to 10",
    reports: "✔",
    yearEnd: "Included",
    review: "✔",
  },
];

const primaryCta =
  "inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-navy text-white px-7 py-4 rounded-lg hover:bg-navy-dark transition-all shadow-md hover:shadow-lg";
const secondaryCta =
  "inline-flex items-center justify-center gap-2 font-body font-semibold text-sm border-2 border-navy text-navy px-7 py-4 rounded-lg hover:bg-stone transition-all";
const lightCta =
  "inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-white text-navy px-7 py-4 rounded-lg hover:bg-stone transition-all shadow-md";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={HOME_TITLE} description={HOME_DESCRIPTION} path="/" />
      <Navbar />

      <section className="pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="inline-flex items-center gap-2 bg-sage-pale text-sage font-body text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
                QuickBooks Certified ProAdvisor
              </p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight mb-6">
                Behind on your books? Get tax-ready by Feb 15.
              </h1>
              <p className="font-body text-lg text-navy/70 leading-relaxed mb-8">
                Bookkeeping for freelancers, new LLCs, and small businesses from a QuickBooks Certified ProAdvisor. I'm based in Allen, TX (Collin County) and serve clients remotely nationwide. Get clarity about your numbers, confidence at tax time, and a lot less stress.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <ConsultLink className={primaryCta}>
                  Book a free consult
                  <ArrowRight className="w-4 h-4" />
                </ConsultLink>
                <a href="#pricing" className={secondaryCta}>
                  See pricing
                </a>
              </div>
            </div>

            <div>
              <img
                src={HERO_IMG}
                alt="Illustration of a notebook and calculator"
                width={960}
                height={640}
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              <ul className="mt-4 grid grid-cols-1 gap-2">
                {facts.map((fact) => (
                  <li
                    key={fact}
                    className="bg-white border border-stone-dark rounded-xl px-4 py-3 font-body text-sm font-medium text-navy shadow-sm"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 lg:py-28 bg-stone scroll-mt-24">
        <div className="container">
          <Reveal>
            <span className="section-rule" />
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-10">
              What I do
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 40}>
                <article className="bg-white rounded-xl p-6 border border-stone-dark shadow-sm h-full">
                  <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-sage" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-navy mb-2">{service.title}</h3>
                  <p className="font-body text-sm text-navy/70 leading-relaxed">{service.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 font-body text-sm text-navy/80 italic">
            SteadyBooks provides bookkeeping only. Tax filing and tax advice are not included.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-navy">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
              Months behind? Let's get you tax-ready by Feb 15.
            </h2>
            <p className="font-body text-base text-white/75 leading-relaxed mb-8">
              I'll catch up your books, reconcile your accounts, and hand you clean, tax-preparer-ready year-end reports by February 15.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "$750 for the year-end tax-ready package",
                "Plus $150 catch-up add-on for each month your books are behind",
                "50% upfront to reserve your spot, with the balance due on delivery",
              ].map((item) => (
                <li key={item} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white/90">
                  {item}
                </li>
              ))}
              <li className="bg-white/5 border border-gold/50 rounded-xl px-4 py-3 font-body text-sm text-white/90">
                <SignupDeadline onDark />
              </li>
            </ul>
            <p className="font-body text-sm text-white/70 italic leading-relaxed mb-8">
              To hit the Feb 15 date, I need your bank and credit card statements and records promptly. Tax filing is not included.
            </p>
            <ConsultLink className={lightCta}>
              Start my catch-up
              <ArrowRight className="w-4 h-4" />
            </ConsultLink>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 lg:py-28 bg-warm-white scroll-mt-24">
        <div className="container">
          <Reveal>
            <span className="section-rule" />
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-4">
              Simple, flat monthly plans
            </h2>
            <p className="font-body text-base text-navy/70 leading-relaxed max-w-3xl mb-10">
              Every plan includes transaction categorization, bank and credit card reconciliation, and monthly financial reports. Monthly clients also get the year-end package at no extra cost.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:hidden gap-4 mb-8">
            {plans.map((plan) => (
              <article key={plan.name} className="border border-stone-dark rounded-2xl p-5 bg-white shadow-sm">
                <h3 className="font-display font-semibold text-2xl text-navy">{plan.name}</h3>
                <p className="font-body font-semibold text-lg text-navy mt-1">{plan.price}</p>
                <dl className="mt-4 space-y-2 font-body text-sm text-navy/75">
                  <div className="flex justify-between gap-4">
                    <dt>Transactions per month</dt>
                    <dd className="font-medium text-navy text-right">{plan.transactions}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Bank and credit card accounts</dt>
                    <dd className="font-medium text-navy text-right">{plan.accounts}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Monthly reconciliation and reports</dt>
                    <dd>{plan.reports}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Year-end package</dt>
                    <dd>{plan.yearEnd}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Monthly review call</dt>
                    <dd>{plan.review || "—"}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto mb-8">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-dark">
                  <th className="py-3 pr-4 font-body text-sm font-medium text-navy/50" scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.name} scope="col" className="py-3 px-4 font-display text-xl text-navy">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-body text-sm text-navy/80">
                <tr className="border-b border-stone-dark">
                  <th scope="row" className="py-3 pr-4 font-medium text-navy text-left">Price</th>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-3 px-4 font-semibold text-navy">{plan.price}</td>
                  ))}
                </tr>
                <tr className="border-b border-stone-dark">
                  <th scope="row" className="py-3 pr-4 font-medium text-navy text-left">Transactions per month</th>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-3 px-4">{plan.transactions}</td>
                  ))}
                </tr>
                <tr className="border-b border-stone-dark">
                  <th scope="row" className="py-3 pr-4 font-medium text-navy text-left">Bank and credit card accounts</th>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-3 px-4">{plan.accounts}</td>
                  ))}
                </tr>
                <tr className="border-b border-stone-dark">
                  <th scope="row" className="py-3 pr-4 font-medium text-navy text-left">Monthly reconciliation and reports</th>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-3 px-4">{plan.reports}</td>
                  ))}
                </tr>
                <tr className="border-b border-stone-dark">
                  <th scope="row" className="py-3 pr-4 font-medium text-navy text-left">Year-end package</th>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-3 px-4">{plan.yearEnd}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="py-3 pr-4 font-medium text-navy text-left">Monthly review call</th>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-3 px-4">
                      {plan.review || <span className="sr-only">Not included</span>}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <ConsultLink className={primaryCta}>
            Book a free consult
            <ArrowRight className="w-4 h-4" />
          </ConsultLink>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            <div>
              <h3 className="font-display font-semibold text-2xl text-navy mb-4">One-time projects</h3>
              <ul className="space-y-3 font-body text-sm text-navy/75 leading-relaxed">
                <li>Catch-up bookkeeping: $150 for each month behind</li>
                <li>Cleanup, for books that exist but are messy or wrong: $200 per month of records</li>
                <li>Catch-up and cleanup projects have a $500 minimum, with 50% upfront</li>
                <li>QuickBooks Online setup: $350, or $250 with a monthly plan</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-2xl text-navy mb-4">Add-ons</h3>
              <ul className="space-y-3 font-body text-sm text-navy/75 leading-relaxed">
                <li>Payroll support: $50/month plus $10 per employee, with a one-time $250 setup fee</li>
                <li>1099 preparation: $75, plus $15 per form</li>
                <li>Year-end package for clients not on a monthly plan: from $750</li>
                <li>Hourly work for anything outside a plan: $85/hour</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 font-body text-sm text-navy/70 italic leading-relaxed max-w-3xl">
            Not sure which plan fits? We'll figure it out together on a free consult. If your volume grows past your plan's limits, we'll talk before anything changes. There are no surprise charges.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-sage-pale">
        <div className="container max-w-3xl">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy leading-tight mb-4">
            Be one of my first clients
          </h2>
          <p className="font-body text-base text-navy/75 leading-relaxed mb-6">
            SteadyBooks is brand new, which means every early client gets my full attention. As a thank-you for trusting me early, founding clients get <strong>15% off monthly fees for their first 6 months.</strong>
          </p>
          <ul className="space-y-2 font-body text-sm text-navy/80 mb-8">
            <li>Starter: <strong>$255/month</strong> (regularly $300)</li>
            <li>Growth: <strong>$425/month</strong> (regularly $500)</li>
            <li>Plus: <strong>$680/month</strong> (regularly $800)</li>
          </ul>
          <ConsultLink className={primaryCta}>
            Claim a founding-client spot
            <ArrowRight className="w-4 h-4" />
          </ConsultLink>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Headshot />
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy leading-tight mb-5">
                Hi, I'm Faizan Qureshi.
              </h2>
              <p className="font-body text-base text-navy/75 leading-relaxed mb-4">
                I'm a QuickBooks Certified ProAdvisor, and I started SteadyBooks in October 2026 to help small business owners feel in control of their numbers.
              </p>
              <p className="font-body text-base text-navy/75 leading-relaxed mb-4">
                I started SteadyBooks because small business owners pour everything into their work, and too many of them lose sleep over their books. I want to use what I know about numbers to give them clarity, confidence, and a lot less stress, so they can get back to doing what they love.
              </p>
              <p className="font-body text-base text-navy/75 leading-relaxed mb-8">
                I'm based in Allen, Texas, and I work with freelancers, new LLCs, and small businesses remotely, anywhere in the U.S. When you work with me, you work with me directly.
              </p>
              <ConsultLink className={primaryCta}>
                Book a free consult with me
                <ArrowRight className="w-4 h-4" />
              </ConsultLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-navy">
        <div className="container text-center max-w-2xl">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
            Let's take a clear look at where your books stand.
          </h2>
          <p className="font-body text-base text-white/75 leading-relaxed mb-8">
            It's a free 30-minute consult with no pressure and no jargon.
          </p>
          <ConsultLink className={lightCta}>
            Book a free consult
            <ArrowRight className="w-4 h-4" />
          </ConsultLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
