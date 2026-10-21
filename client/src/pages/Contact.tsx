import { ArrowRight, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import ContactForm from "@/components/ContactForm";
import ConsultLink from "@/components/ConsultLink";
import { CONTACT_EMAIL, ROUTE_SEO } from "@/lib/site";

const seo = ROUTE_SEO.find((route) => route.path === "/contact")!;

export default function Contact() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <Navbar />
      <section className="pt-32 pb-16 bg-stone">
        <div className="container max-w-3xl">
          <span className="section-rule" />
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-5">
            Contact SteadyBooks
          </h1>
          <p className="font-body text-lg text-navy/70 leading-relaxed">
            It's a free 30-minute consult with no pressure and no jargon.
          </p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-sage" />
                </div>
                <div>
                  <p className="font-body text-xs text-navy/50 mb-0.5">Email</p>
                  <p className="font-body text-sm font-medium text-navy group-hover:text-sage">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </a>
              <ConsultLink className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-navy text-white px-6 py-3.5 rounded-lg hover:bg-navy-dark transition-all shadow-sm">
                Book a free consult
                <ArrowRight className="w-4 h-4" />
              </ConsultLink>
              <p className="font-body text-sm text-navy/70 italic">
                SteadyBooks provides bookkeeping only. Tax filing and tax advice are not included.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-dark">
                <h2 className="font-display font-semibold text-xl text-navy mb-6">Send a message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
