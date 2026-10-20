import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Headshot from "@/components/Headshot";
import ConsultLink from "@/components/ConsultLink";
import { ROUTE_SEO } from "@/lib/site";

const seo = ROUTE_SEO.find((route) => route.path === "/about")!;

const cta =
  "inline-flex items-center justify-center gap-2 font-body font-semibold text-sm bg-navy text-white px-7 py-4 rounded-lg hover:bg-navy-dark transition-all shadow-md";

export default function About() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Headshot />
            <div>
              <span className="section-rule" />
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-5">
                Hi, I'm Faizan Qureshi.
              </h1>
              <p className="font-body text-base text-navy/75 leading-relaxed mb-4">
                I'm a QuickBooks Certified ProAdvisor, and I started SteadyBooks in October 2026 to help small business owners feel in control of their numbers.
              </p>
              <p className="font-body text-base text-navy/75 leading-relaxed mb-4">
                I started SteadyBooks because small business owners pour everything into their work, and too many of them lose sleep over their books. I want to use what I know about numbers to give them clarity, confidence, and a lot less stress, so they can get back to doing what they love.
              </p>
              <p className="font-body text-base text-navy/75 leading-relaxed mb-8">
                I'm based in Allen, Texas, and I work with freelancers, new LLCs, and small businesses remotely, anywhere in the U.S. When you work with me, you work with me directly.
              </p>
              <ConsultLink className={cta}>
                Book a free consult with me
                <ArrowRight className="w-4 h-4" />
              </ConsultLink>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
