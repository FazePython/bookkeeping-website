/* =============================================================
   Home Page – SteadyBooks
   Design: Warm Precision – editorial financial wellness
   Sections: Hero, Benefits Bar, Problem, Solution, Services,
             Why Choose Me, Process, Testimonials, CTA, Contact
   ============================================================= */
import React, { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  CheckCircle2,
  FileText,
  CreditCard,
  TrendingUp,
  BarChart3,
  Settings,
  RefreshCw,
  Clock,
  Receipt,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
  Shield,
  HeartHandshake,
  MessageCircle,
  Lock,
  CalendarCheck,
  Lightbulb,
  AlertCircle,
  Loader2,
} from "lucide-react";

/* ── Image URLs ─────────────────────────────────────────────── */
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663632058860/JjT2V3R6aeSv6g5ZrmmUKT/hero-bookkeeping-RCQBWfneg44Y6385vaHY2y.webp";
const ABSTRACT_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663632058860/JjT2V3R6aeSv6g5ZrmmUKT/hero-abstract-bg-dFzyAz2avqBxKtApvvRXbR.webp";
const BOOKS_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663632058860/JjT2V3R6aeSv6g5ZrmmUKT/books-organized-7CtWrYng2fMZsVTFC6Z77e.webp";
const CTA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663632058860/JjT2V3R6aeSv6g5ZrmmUKT/consultation-cta-8tuTjq59PQEV62Wfjb7GbJ.webp";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx5LWeh3QLYzAAPf-w_VCsFDCFcnYtr5mw3tSjiSn2e2quhLY1Jcs6be5NK7RSLWuCg/exec";

/* ── Scroll-reveal wrapper ──────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Benefit items ──────────────────────────────────────────── */
const benefits = [
  { icon: CheckCircle2, label: "Accurate Monthly Bookkeeping" },
  { icon: FileText, label: "Clear Financial Reports" },
  { icon: Receipt, label: "Stress-Free Expense Tracking" },
  { icon: CalendarCheck, label: "Tax-Ready Records" },
];

/* ── Pain points ────────────────────────────────────────────── */
const painPoints = [
  "Falling behind on receipts and expenses",
  "Not knowing where the money is going",
  "Messy spreadsheets that never balance",
  "Bank accounts that haven't been reconciled in months",
  "Feeling unprepared and anxious at tax season",
  "Spending too much time managing the books alone",
];

/* ── Services ───────────────────────────────────────────────── */
const services = [
  {
    icon: CalendarCheck,
    title: "Monthly Bookkeeping",
    desc: "Consistent, accurate bookkeeping every month so your records are always current.",
  },
  {
    icon: CreditCard,
    title: "Bank & Credit Card Reconciliation",
    desc: "Every transaction matched and verified so your books reflect reality.",
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    desc: "All expenses categorized and organized so you always know where money is going.",
  },
  {
    icon: TrendingUp,
    title: "Income Tracking",
    desc: "Every dollar of revenue recorded clearly so you can see your business growth.",
  },
  {
    icon: BarChart3,
    title: "Financial Reports",
    desc: "Easy-to-understand profit & loss, balance sheets, and cash flow reports.",
  },
  {
    icon: Settings,
    title: "QuickBooks Setup & Support",
    desc: "Get set up correctly from day one, or let me clean up an existing account.",
  },
  {
    icon: RefreshCw,
    title: "Bookkeeping Cleanup",
    desc: "Messy books transformed into clean, organized, accurate records.",
  },
  {
    icon: Clock,
    title: "Catch-Up Bookkeeping",
    desc: "Months or years behind? I'll get you caught up quickly and accurately.",
  },
  {
    icon: FileText,
    title: "Tax-Ready Organization",
    desc: "Year-end records organized and ready so tax season is stress-free.",
  },
  {
    icon: Users,
    title: "Payroll Support",
    desc: "Payroll recorded and reconciled so your team is paid accurately every time.",
  },
];

/* ── Why choose me ──────────────────────────────────────────── */
const whyChoose = [
  {
    icon: Shield,
    title: "Reliable & Detail-Oriented",
    desc: "Every number is checked twice. Accuracy isn't optional — it's the standard.",
  },
  {
    icon: MessageCircle,
    title: "Easy Communication",
    desc: "Clear, timely responses. No confusing jargon, just plain language you understand.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Support",
    desc: "You're not a ticket number. I take time to understand your unique business needs.",
  },
  {
    icon: Lock,
    title: "Confidential & Secure",
    desc: "Your financial information is handled with complete discretion and care.",
  },
  {
    icon: BarChart3,
    title: "Organized Monthly Reporting",
    desc: "Consistent reports delivered on schedule so you always know where you stand.",
  },
  {
    icon: Lightbulb,
    title: "Help Understanding the Numbers",
    desc: "I don't just record transactions — I help you understand what they mean.",
  },
];

/* ── Testimonials ───────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "Working with this bookkeeping service helped me feel organized and completely prepared for tax season. For the first time in years, I wasn't stressed in April.",
    name: "Sarah M.",
    role: "Freelance Designer",
    stars: 5,
  },
  {
    quote:
      "My books are finally clean and I actually understand my numbers now. I know exactly where my money is going every month. It's been a game-changer for my business.",
    name: "James T.",
    role: "Small Business Owner",
    stars: 5,
  },
  {
    quote:
      "I have so much more time to focus on growing my business instead of worrying about receipts and reports. The monthly reports are clear and easy to read.",
    name: "Priya K.",
    role: "Entrepreneur",
    stars: 5,
  },
];

/* ── Contact Form ───────────────────────────────────────────── */
function ContactForm() {
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    setIsSending(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          message: formData.message,
          interests: [],
          source: "Home page form",
        }),
      });

      toast.success("Thank you! Your message has been sent.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-navy mb-1.5">
            Full Name *
          </label>
          <input
            required
            type="text"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium text-navy mb-1.5">
            Email Address *
          </label>
          <input
            required
            type="email"
            placeholder="jane@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-navy mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="(555) 000-0000"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium text-navy mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Your Business LLC"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block font-body text-sm font-medium text-navy mb-1.5">
          Message *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Tell me a little about your bookkeeping needs..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="w-full font-body font-semibold text-sm bg-navy text-white py-3.5 rounded-lg hover:bg-navy-dark transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Home Component
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${ABSTRACT_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-warm-white via-warm-white/90 to-sage-pale/40" />

        <div className="container relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sage-pale text-sage font-body text-xs font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-slide-up">
                <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
                Professional Bookkeeping Services
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight mb-6 animate-fade-slide-up delay-100">
                Bookkeeping That Gives You{" "}
                <span className="italic text-sage">Clarity,</span>{" "}
                <span className="italic text-gold">Confidence,</span> and More
                Time Back
              </h1>
              <p className="font-body text-lg text-navy/65 leading-relaxed mb-8 max-w-xl animate-fade-slide-up delay-200">
                I help individuals and small business owners stay organized,
                track expenses, clean up their books, and understand their
                finances — without the stress.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 animate-fade-slide-up delay-300">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-navy text-white px-7 py-4 rounded-lg hover:bg-navy-dark transition-all shadow-md hover:shadow-lg"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm border-2 border-navy text-navy px-7 py-4 rounded-lg hover:bg-stone transition-all"
                >
                  View Services
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-5 mt-10 animate-fade-slide-up delay-400">
                {[
                  "QuickBooks Certified",
                  "100% Confidential",
                  "Free Consultation",
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5 text-navy/60">
                    <CheckCircle2 className="w-4 h-4 text-sage" />
                    <span className="font-body text-xs font-medium">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative animate-fade-slide-up delay-200">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={HERO_IMG}
                  alt="Professional bookkeeping workspace with organized financial records"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/10 to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl p-4 border border-stone-dark max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-sage-pale flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-sage" />
                  </div>
                  <span className="font-body text-xs text-navy/60 font-medium">
                    Monthly Reports
                  </span>
                </div>
                <p className="font-display font-bold text-2xl text-navy">100%</p>
                <p className="font-body text-xs text-navy/50">
                  Delivered on time
                </p>
              </div>

              {/* Floating accuracy card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-stone-dark">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-navy/60 font-medium">
                      Accuracy Rate
                    </p>
                    <p className="font-display font-bold text-lg text-navy leading-tight">
                      99.9%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BENEFITS BAR ─────────────────────────────────── */}
      <section className="bg-navy py-10">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <Reveal key={b.label} delay={i * 80}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <b.icon className="w-4.5 h-4.5 text-gold-light" />
                  </div>
                  <span className="font-body text-sm font-medium text-white/85">
                    {b.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROBLEM SECTION ──────────────────────────────── */}
      <section id="problem" className="py-20 lg:py-28 bg-stone">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div>
                <span className="section-rule" />
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                  Bookkeeping Shouldn't Keep You Up at Night
                </h2>
                <p className="font-body text-base text-navy/65 leading-relaxed mb-8">
                  If any of these sound familiar, you're not alone. Thousands of
                  small business owners and freelancers struggle with the same
                  bookkeeping challenges every day.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm text-sage hover:text-sage/80 transition-colors"
                >
                  Let's fix this together <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <div className="space-y-3">
              {painPoints.map((point, i) => (
                <Reveal key={point} delay={i * 70}>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-stone-dark card-lift">
                    <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <p className="font-body text-sm text-navy/75 leading-relaxed">
                      {point}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SOLUTION SECTION ─────────────────────────────── */}
      <section id="solution" className="py-20 lg:py-28 bg-warm-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <Reveal className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={BOOKS_IMG}
                  alt="Organized financial documents and bookkeeping materials"
                  className="w-full h-auto object-cover"
                />
              </div>
            </Reveal>

            {/* Copy */}
            <Reveal delay={100} className="order-1 lg:order-2">
              <span className="section-rule" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Clean Books. Clear Reports. Less Stress.
              </h2>
              <p className="font-body text-base text-navy/65 leading-relaxed mb-6">
                I help clients organize their financial records, reconcile
                accounts, track income and expenses, and provide
                easy-to-understand reports — so you can make better decisions
                with confidence.
              </p>
              <p className="font-body text-base text-navy/65 leading-relaxed mb-8">
                Whether you're a freelancer just starting out, an entrepreneur
                scaling up, or a small business owner who's fallen behind, I'll
                meet you where you are and get your books in order.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-navy text-white px-6 py-3.5 rounded-lg hover:bg-navy-dark transition-all shadow-sm"
                >
                  Get Your Books Organized
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm text-navy hover:text-sage transition-colors"
                >
                  See all services <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. SERVICES SECTION ─────────────────────────────── */}
      <section id="services" className="py-20 lg:py-28 bg-stone">
        <div className="container">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-rule mx-auto" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-4">
                Bookkeeping Services Tailored to You
              </h2>
              <p className="font-body text-base text-navy/60 max-w-2xl mx-auto">
                From monthly bookkeeping to one-time cleanup projects, I offer
                the bookkeeping help your business needs to stay organized and
                financially clear.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 50}>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-dark card-lift h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center mb-4 shrink-0">
                    <service.icon className="w-5 h-5 text-sage" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-navy mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-navy/60 leading-relaxed flex-1">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="text-center mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-body font-semibold text-sm bg-navy text-white px-7 py-4 rounded-lg hover:bg-navy-dark transition-all shadow-md hover:shadow-lg"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE ME ────────────────────────────────── */}
      <section id="why" className="py-20 lg:py-28 bg-warm-white">
        <div className="container">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-rule mx-auto" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-4">
                Why Clients Choose My Bookkeeping Services
              </h2>
              <p className="font-body text-base text-navy/60 max-w-2xl mx-auto">
                Bookkeeping is about more than numbers — it's about trust,
                clarity, and having someone in your corner who genuinely cares
                about your financial wellbeing.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="group p-6 rounded-2xl border border-stone-dark bg-white hover:border-sage/40 hover:shadow-md transition-all duration-300 card-lift">
                  <div className="w-11 h-11 rounded-xl bg-navy/5 group-hover:bg-sage-pale flex items-center justify-center mb-4 transition-colors">
                    <item.icon className="w-5 h-5 text-navy group-hover:text-sage transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-navy/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PROCESS SECTION ──────────────────────────────── */}
      <section id="process" className="py-20 lg:py-28 bg-navy">
        <div className="container">
          <Reveal>
            <div className="text-center mb-14">
              <span className="block w-12 h-0.5 bg-gold mx-auto mb-4" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
                How It Works
              </h2>
              <p className="font-body text-base text-white/60 max-w-xl mx-auto">
                Getting started is simple. Three easy steps to clean books and
                financial peace of mind.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-white/10" />

            {[
              {
                step: "01",
                title: "Free Consultation",
                desc: "We talk about your current bookkeeping needs and what is causing stress. No pressure, just a friendly conversation.",
                icon: MessageCircle,
              },
              {
                step: "02",
                title: "Organize & Clean Up",
                desc: "I review your records, categorize transactions, reconcile accounts, and get everything organized and accurate.",
                icon: RefreshCw,
              },
              {
                step: "03",
                title: "Ongoing Support",
                desc: "You receive accurate books, clear monthly reports, and continued support every month — so you're never behind again.",
                icon: TrendingUp,
              },
            ].map((step, i) => (
              <Reveal key={step.step} delay={i * 120}>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="font-display font-bold text-5xl text-white/10 leading-none">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                      <step.icon className="w-5 h-5 text-gold-light" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-body font-semibold text-sm bg-white text-navy px-7 py-4 rounded-lg hover:bg-stone transition-all shadow-md"
              >
                Start with a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ─────────────────────────────────── */}
      <section id="testimonials" className="py-20 lg:py-28 bg-stone">
        <div className="container">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-rule mx-auto" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-4">
                What Clients Are Saying
              </h2>
              <p className="font-body text-base text-navy/60 max-w-xl mx-auto">
                Real results from real clients who finally have the financial
                clarity they deserve.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-stone-dark card-lift h-full flex flex-col">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="testimonial-accent font-body text-base text-navy/75 leading-relaxed italic flex-1 mb-6">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-pale flex items-center justify-center">
                      <span className="font-display font-bold text-sage text-sm">
                        {t.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm text-navy">
                        {t.name}
                      </p>
                      <p className="font-body text-xs text-navy/50">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CTA_IMG})` }}
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="container relative z-10 text-center">
          <Reveal>
            <span className="block w-12 h-0.5 bg-gold mx-auto mb-6" />
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
              Ready to Get Your Books Organized?
            </h2>
            <p className="font-body text-lg text-white/70 max-w-xl mx-auto mb-10">
              Let's simplify your bookkeeping so you can feel confident about
              your finances and get back to doing what you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-white text-navy px-8 py-4 rounded-lg hover:bg-stone transition-all shadow-lg"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm border-2 border-white/40 text-white px-8 py-4 rounded-lg hover:border-white hover:bg-white/10 transition-all"
              >
                View Services
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 10. CONTACT SECTION ─────────────────────────────── */}
      <section id="contact" className="py-20 lg:py-28 bg-warm-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Info */}
            <Reveal>
              <div>
                <span className="section-rule" />
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy leading-tight mb-4">
                  Let's Talk About Your Books
                </h2>
                <p className="font-body text-base text-navy/65 leading-relaxed mb-8">
                  Fill out the form and I'll get back to you within one business
                  day. Or, if you prefer, book a free 30-minute consultation call
                  to discuss your bookkeeping needs.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Free 30-minute consultation", icon: CalendarCheck },
                    { label: "No commitment required", icon: Shield },
                    { label: "Response within 1 business day", icon: Clock },
                    { label: "Confidential and secure", icon: Lock },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sage-pale flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-sage" />
                      </div>
                      <span className="font-body text-sm text-navy/70">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: Form */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-dark">
                <h3 className="font-display font-semibold text-xl text-navy mb-6">
                  Send a Message
                </h3>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}