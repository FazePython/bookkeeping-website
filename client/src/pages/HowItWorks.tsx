/* =============================================================
   How It Works Page – SteadyBooks
   Design: Warm Precision – clear process steps, trust-building
   ============================================================= */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  MessageCircle, RefreshCw, TrendingUp, ArrowRight,
  CheckCircle2, Clock, FileText, BarChart3,
} from "lucide-react";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const steps = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Free Consultation",
    desc: "We start with a relaxed, no-pressure conversation about your current bookkeeping situation. I'll ask about your business, your pain points, and what you need most. There's no commitment required — just an honest conversation.",
    details: [
      "30-minute video or phone call",
      "Review of your current bookkeeping setup",
      "Discussion of your goals and challenges",
      "Custom service recommendation",
    ],
  },
  {
    step: "02",
    icon: RefreshCw,
    title: "Organize & Clean Up",
    desc: "Once we agree on a plan, I get to work. I review your financial records, categorize transactions, reconcile accounts, and get everything organized and accurate. If you're behind, I'll catch you up. If your books are a mess, I'll clean them up.",
    details: [
      "Full review of existing records",
      "Transaction categorization and cleanup",
      "Bank and credit card reconciliation",
      "QuickBooks setup or optimization",
    ],
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Ongoing Monthly Support",
    desc: "After the initial setup and cleanup, I provide ongoing monthly bookkeeping support. You receive accurate books, clear financial reports, and a reliable partner who keeps your finances organized every single month.",
    details: [
      "Monthly bookkeeping and reconciliation",
      "Clear financial reports delivered on time",
      "Regular check-ins and communication",
      "Year-end tax-ready organization",
    ],
  },
];

const faqs = [
  {
    q: "How long does the initial cleanup take?",
    a: "It depends on how far behind your books are and the complexity of your business. A simple cleanup might take a few days, while a more complex catch-up project could take 1–2 weeks. I'll give you a clear timeline during our free consultation.",
  },
  {
    q: "Do I need QuickBooks?",
    a: "QuickBooks is the most common bookkeeping software I work with, but it's not required. I can work with your existing setup or help you choose and implement the right software for your business.",
  },
  {
    q: "How do I share my financial information with you?",
    a: "Securely and easily. I use encrypted file sharing and can connect to your bank feeds directly through QuickBooks. Your financial information is always handled with complete confidentiality.",
  },
  {
    q: "What if I'm months or years behind on my bookkeeping?",
    a: "That's exactly what catch-up bookkeeping is for. No matter how far behind you are, I can get your books current and accurate. We'll start with a consultation to assess the scope and create a plan.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the size of your business, the volume of transactions, and the services you need. I offer transparent, flat-rate monthly pricing. Let's talk during a free consultation and I'll give you a clear quote.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-stone">
        <div className="container">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-rule" />
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight mb-5">
                How It Works
              </h1>
              <p className="font-body text-lg text-navy/65 leading-relaxed">
                Getting started is simple. Three straightforward steps from stressed and disorganized to clean books and financial confidence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="container">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <Reveal key={step.step} delay={i * 80}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="font-display font-bold text-6xl text-stone-dark leading-none">{step.step}</span>
                      <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center">
                        <step.icon className="w-5.5 h-5.5 text-white" />
                      </div>
                    </div>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy leading-tight mb-4">
                      {step.title}
                    </h2>
                    <p className="font-body text-base text-navy/65 leading-relaxed mb-6">
                      {step.desc}
                    </p>
                    <div className="space-y-2.5">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                          <span className="font-body text-sm text-navy/70">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`bg-stone rounded-2xl p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-sage" />
                      </div>
                      <h3 className="font-display font-semibold text-lg text-navy">Step {step.step}: {step.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {step.details.map((detail, j) => (
                        <div key={detail} className="flex items-start gap-3 bg-white rounded-xl p-3.5 shadow-sm border border-stone-dark">
                          <div className="w-6 h-6 rounded-full bg-sage-pale flex items-center justify-center shrink-0 mt-0.5">
                            <span className="font-body text-xs font-bold text-sage">{j + 1}</span>
                          </div>
                          <span className="font-body text-sm text-navy/70">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 lg:py-24 bg-stone">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-rule mx-auto" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy leading-tight mb-4">
                What You Get Every Month
              </h2>
              <p className="font-body text-base text-navy/60 max-w-xl mx-auto">
                Ongoing monthly bookkeeping means you always have a clear picture of your finances.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: CheckCircle2, title: "Reconciled Accounts", desc: "Every bank and credit card account matched and verified." },
              { icon: FileText, title: "Financial Reports", desc: "P&L, balance sheet, and cash flow delivered on time." },
              { icon: Clock, title: "On-Time Delivery", desc: "Books closed and reports ready by the agreed date every month." },
              { icon: BarChart3, title: "Clear Communication", desc: "Plain-language explanations of what your numbers mean." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-dark card-lift text-center">
                  <div className="w-11 h-11 rounded-2xl bg-sage-pale flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-sage" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-navy mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-navy/60 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="container max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-rule mx-auto" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy leading-tight mb-4">
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-dark">
                  <h3 className="font-display font-semibold text-base text-navy mb-2">{faq.q}</h3>
                  <p className="font-body text-sm text-navy/65 leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container text-center">
          <Reveal>
            <span className="block w-12 h-0.5 bg-gold mx-auto mb-6" />
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
              Ready to Get Started?
            </h2>
            <p className="font-body text-base text-white/65 max-w-lg mx-auto mb-8">
              Book your free consultation today and take the first step toward clean books and financial peace of mind.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm bg-white text-navy px-7 py-4 rounded-lg hover:bg-stone transition-all shadow-md"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
