/* =============================================================
   Services Page – SteadyBooks
   Design: Warm Precision – detailed service cards, clean layout
   ============================================================= */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  CalendarCheck, CreditCard, Receipt, TrendingUp, BarChart3,
  Settings, RefreshCw, Clock, FileText, Users, ArrowRight, CheckCircle2,
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

const services = [
  {
    icon: CalendarCheck,
    title: "Monthly Bookkeeping",
    desc: "Consistent, accurate bookkeeping every month so your records are always current and up to date. I categorize every transaction, reconcile accounts, and deliver clean books on a reliable schedule.",
    includes: ["Transaction categorization", "Account reconciliation", "Monthly close process", "Digital record keeping"],
  },
  {
    icon: CreditCard,
    title: "Bank & Credit Card Reconciliation",
    desc: "Every transaction matched and verified against your bank and credit card statements so your books reflect reality — no discrepancies, no surprises.",
    includes: ["Bank statement matching", "Credit card reconciliation", "Discrepancy identification", "Cleared transaction verification"],
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    desc: "All expenses categorized and organized so you always know exactly where your money is going. Proper expense tracking is essential for budgeting, tax deductions, and business decisions.",
    includes: ["Expense categorization", "Receipt management", "Vendor tracking", "Tax deduction identification"],
  },
  {
    icon: TrendingUp,
    title: "Income Tracking",
    desc: "Every dollar of revenue recorded clearly and accurately so you can see your business growth, identify your best income streams, and plan for the future.",
    includes: ["Revenue recording", "Invoice tracking", "Payment reconciliation", "Income trend analysis"],
  },
  {
    icon: BarChart3,
    title: "Financial Reports",
    desc: "Easy-to-understand profit & loss statements, balance sheets, and cash flow reports delivered monthly so you always know where your business stands financially.",
    includes: ["Profit & Loss statement", "Balance sheet", "Cash flow report", "Custom reporting"],
  },
  {
    icon: Settings,
    title: "QuickBooks Setup & Support",
    desc: "Get set up correctly from day one, or let me clean up and optimize an existing QuickBooks account. Proper setup saves hours of frustration down the road.",
    includes: ["Initial account setup", "Chart of accounts customization", "Bank feed connection", "Ongoing support & training"],
  },
  {
    icon: RefreshCw,
    title: "Bookkeeping Cleanup",
    desc: "Messy, disorganized, or inaccurate books transformed into clean, organized, accurate records. Perfect for businesses that have fallen behind or inherited a bookkeeping mess.",
    includes: ["Full account review", "Error correction", "Transaction reclassification", "Reconciliation catch-up"],
  },
  {
    icon: Clock,
    title: "Catch-Up Bookkeeping",
    desc: "Months or even years behind on your bookkeeping? I'll get you caught up quickly and accurately so you have a complete financial picture and can move forward with confidence.",
    includes: ["Historical data entry", "Multi-month reconciliation", "Tax year preparation", "Backlog elimination"],
  },
  {
    icon: FileText,
    title: "Tax-Ready Organization",
    desc: "Year-end records organized, categorized, and ready to hand off to your tax preparer. Make tax season stress-free with properly organized small business bookkeeping.",
    includes: ["Year-end close", "1099 preparation support", "Tax document organization", "CPA-ready reports"],
  },
  {
    icon: Users,
    title: "Payroll Support",
    desc: "Payroll recorded and reconciled accurately in your books so your team is paid correctly and your records reflect every payroll transaction.",
    includes: ["Payroll transaction recording", "Payroll reconciliation", "Payroll liability tracking", "Year-end W-2 support"],
  },
];

export default function Services() {
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
                Bookkeeping Services
              </h1>
              <p className="font-body text-lg text-navy/65 leading-relaxed mb-6">
                From monthly bookkeeping to one-time cleanup projects, I offer comprehensive bookkeeping help designed to keep your finances organized, accurate, and stress-free.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-body font-semibold text-sm bg-navy text-white px-6 py-3.5 rounded-lg hover:bg-navy-dark transition-all shadow-sm"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 60}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-stone-dark card-lift h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-sage-pale flex items-center justify-center shrink-0">
                      <service.icon className="w-5 h-5 text-sage" />
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-xl text-navy mb-1">{service.title}</h2>
                    </div>
                  </div>
                  <p className="font-body text-sm text-navy/65 leading-relaxed mb-5">{service.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span className="font-body text-xs text-navy/60">{item}</span>
                      </div>
                    ))}
                  </div>
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
              Not Sure Which Service You Need?
            </h2>
            <p className="font-body text-base text-white/65 max-w-lg mx-auto mb-8">
              Let's talk. A free consultation is the best way to figure out exactly what your books need and how I can help.
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
