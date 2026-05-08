/* =============================================================
   About Page – SteadyBooks
   Design: Warm Precision – personal, trustworthy, editorial
   ============================================================= */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2, ArrowRight, Heart, Award, Users, Clock } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663632058860/JjT2V3R6aeSv6g5ZrmmUKT/hero-bookkeeping-RCQBWfneg44Y6385vaHY2y.webp";

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

const values = [
  { icon: Heart, title: "Genuine Care", desc: "I treat every client's finances as if they were my own. Your stress is my motivation to do great work." },
  { icon: Award, title: "Commitment to Accuracy", desc: "Every number matters. I double-check everything so you can trust your books completely." },
  { icon: Users, title: "Client-First Approach", desc: "You're never just an account number. I take time to understand your unique situation and goals." },
  { icon: Clock, title: "Consistency You Can Count On", desc: "Reliable, on-time delivery every month. No surprises, no excuses — just dependable service." },
];

export default function About() {
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
                About SteadyBooks
              </h1>
              <p className="font-body text-lg text-navy/65 leading-relaxed">
                I'm a dedicated bookkeeping professional with a passion for helping small business owners and freelancers take control of their finances — without the overwhelm.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={HERO_IMG}
                  alt="Professional bookkeeping workspace"
                  className="w-full h-auto object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <span className="section-rule" />
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy leading-tight mb-5">
                  Why I Started SteadyBooks
                </h2>
                <p className="font-body text-base text-navy/65 leading-relaxed mb-4">
                  I started SteadyBooks because I saw how many talented, hardworking business owners were spending their evenings buried in spreadsheets, stressed about receipts, and dreading tax season — when they should have been focusing on what they do best.
                </p>
                <p className="font-body text-base text-navy/65 leading-relaxed mb-4">
                  Bookkeeping doesn't have to be a source of anxiety. With the right system and a trusted partner in your corner, your finances can be a source of clarity and confidence instead.
                </p>
                <p className="font-body text-base text-navy/65 leading-relaxed mb-8">
                  My mission is simple: to give every client clean books, clear reports, and the peace of mind that comes from knowing their finances are in good hands.
                </p>
                <div className="space-y-3">
                  {[
                    "Certified QuickBooks ProAdvisor",
                    "Years of experience in small business bookkeeping",
                    "Specialized in freelancers and entrepreneurs",
                    "Committed to ongoing education and best practices",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-sage shrink-0" />
                      <span className="font-body text-sm text-navy/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="container">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-rule mx-auto" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy leading-tight mb-4">
                What I Stand For
              </h2>
              <p className="font-body text-base text-navy/60 max-w-xl mx-auto">
                These aren't just words on a page — they're the principles that guide every client relationship and every set of books I work on.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-dark card-lift text-center">
                  <div className="w-12 h-12 rounded-2xl bg-sage-pale flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-5.5 h-5.5 text-sage" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-navy mb-2">{v.title}</h3>
                  <p className="font-body text-sm text-navy/60 leading-relaxed">{v.desc}</p>
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
              Ready to Work Together?
            </h2>
            <p className="font-body text-base text-white/65 max-w-lg mx-auto mb-8">
              Let's start with a free, no-pressure consultation to talk about your bookkeeping needs.
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
