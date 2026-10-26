import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X } from "lucide-react";
import ConsultLink from "@/components/ConsultLink";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Tax-Ready", href: "/tax-ready/" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How It Works", href: "/how-it-works/" },
  { label: "Articles", href: "/articles/" },
  { label: "Contact", href: "/contact/" },
];

function pathForActive(href: string) {
  const path = href.split("#")[0];
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

const ctaClass =
  "btn-fill font-body text-sm font-semibold bg-navy text-white px-5 py-2.5 rounded-lg hover:bg-navy-dark transition-colors shadow-sm hover:shadow-md";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200"
          : "bg-warm-white/90 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center shadow-sm">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-lg text-navy tracking-tight">
              Steady<span className="text-sage">Books</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => {
              const path = pathForActive(link.href);
              const active =
                path === "/"
                  ? location === "/"
                  : path === "/articles"
                    ? location === "/articles" || location.startsWith("/articles/")
                    : location === path;
              const className = `font-body text-sm font-medium transition-colors ${
                active ? "text-navy" : "text-navy/60 hover:text-navy"
              }`;
              if (link.href.startsWith("/#")) {
                return (
                  <a key={link.href} href={link.href} className={className}>
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={link.href} href={link.href} className={className}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact/"
              className="font-body text-sm font-medium text-navy/70 hover:text-navy transition-colors"
            >
              Get in Touch
            </Link>
            <ConsultLink className={ctaClass}>Book a Free Consultation</ConsultLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-stone transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-stone-200 shadow-lg">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-sm font-medium px-3 py-2.5 rounded-lg text-navy/70 hover:bg-stone hover:text-navy"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm font-medium px-3 py-2.5 rounded-lg text-navy/70 hover:bg-stone hover:text-navy"
                >
                  {link.label}
                </Link>
              ),
            )}
            <div className="pt-3 mt-2 border-t border-stone-200">
              <ConsultLink className="block w-full text-center font-body text-sm font-semibold bg-navy text-white px-5 py-3 rounded-lg hover:bg-navy-dark transition-colors">
                Book a Free Consultation
              </ConsultLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
