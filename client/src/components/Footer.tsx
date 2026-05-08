/* =============================================================
   Footer – SteadyBooks
   Design: Warm Precision – dark navy background, warm accents
   ============================================================= */
import { Link } from "wouter";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-lg text-white tracking-tight">
                Steady<span className="text-sage-light">Books</span>
              </span>
            </Link>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-sm">
              Professional bookkeeping services for individuals, freelancers, and small business owners. 
              Clean books, clear reports, and less stress — every month.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <a href="mailto:hello@steadybooks.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-gold-light" />
                team@steadybooks.com
              </a>
              <a href="tel:+7735170631" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-gold-light" />
                (773) 517-0631
              </a>
              <span className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-gold-light" />
                Available Remotely · Nationwide
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Monthly Bookkeeping",
                "Bank Reconciliation",
                "Expense Tracking",
                "Financial Reports",
                "QuickBooks Support",
                "Bookkeeping Cleanup",
                "Catch-Up Bookkeeping",
                "Tax-Ready Organization",
              ].map((s) => (
                <li key={s}>
                  <Link href="/services" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block font-body text-sm font-semibold bg-sage text-white px-4 py-2.5 rounded-lg hover:bg-sage/90 transition-colors"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} SteadyBooks. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Professional Bookkeeping Services · Small Business Bookkeeping
          </p>
        </div>
      </div>
    </footer>
  );
}
