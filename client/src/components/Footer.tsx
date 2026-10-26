import { Link } from "wouter";
import { BookOpen, Mail } from "lucide-react";
import ConsultLink from "@/components/ConsultLink";
import { CONTACT_EMAIL } from "@/lib/site";

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How It Works", href: "/how-it-works/" },
  { label: "Tax-Ready", href: "/tax-ready/" },
  { label: "1099s", href: "/1099/" },
  { label: "Articles", href: "/articles/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy/" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-lg text-white tracking-tight">
                Steady<span className="text-sage-light">Books</span>
              </span>
            </Link>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              SteadyBooks, bookkeeping for freelancers and small businesses
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-gold-light" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="md:justify-self-end">
            <h2 className="font-display font-semibold text-white text-base mb-4">Pages</h2>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/#") ? (
                    <a
                      href={link.href}
                      className="font-body text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ConsultLink className="inline-block mt-6 font-body text-sm font-semibold bg-sage text-white px-4 py-2.5 rounded-lg hover:bg-sage/90 transition-colors">
              Book a Free Consultation
            </ConsultLink>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-3">
          <p className="font-body text-sm text-white/60">
            SteadyBooks provides bookkeeping services only. Tax filing is not included.
          </p>
          <p className="font-body text-xs text-white/45">
            <Link href="/privacy/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true"> · </span>
            <span>© 2026 SteadyBooks</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
