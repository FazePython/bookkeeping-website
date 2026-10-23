import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { CONTACT_EMAIL, ROUTE_SEO } from "@/lib/site";

const seo = ROUTE_SEO.find((route) => route.path === "/privacy")!;

export default function Privacy() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <Navbar />
      <article className="pt-32 pb-20">
        <div className="container max-w-3xl">
          <span className="section-rule" />
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-navy/60 mb-10">Last updated: October 22, 2026</p>

          <div className="space-y-8 font-body text-base text-navy/75 leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-2xl text-navy mb-2">What I collect.</h2>
              <p>
                When you fill out the contact form, I collect your name, email address, phone number, and business name.
              </p>
            </section>
            <section>
              <h2 className="font-display font-semibold text-2xl text-navy mb-2">Why I collect it.</h2>
              <p>
                I use it only to answer your inquiry, schedule a consult, and talk with you about working together.
              </p>
            </section>
            <section>
              <h2 className="font-display font-semibold text-2xl text-navy mb-2">What I don't do.</h2>
              <p>
                I don't sell, rent, or trade your information. I don't add you to a mailing list unless you ask to be added.
              </p>
            </section>
            <section>
              <h2 className="font-display font-semibold text-2xl text-navy mb-2">Who else sees it.</h2>
              <p>
                Messages sent through the contact form are delivered by email through Web3Forms (a third-party form service) to{" "}
                <a className="underline text-navy" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
                , and used only to reply to the inquiry. Your information may also be stored by the tools I use to run the website, my email, and scheduling (for example, my website host and Calendly). They store it on my behalf.
              </p>
            </section>
            <section>
              <h2 className="font-display font-semibold text-2xl text-navy mb-2">How long I keep it.</h2>
              <p>
                I keep it only as long as I need it to respond to you and work with you. You can ask me to delete it at any time.
              </p>
            </section>
            <section>
              <h2 className="font-display font-semibold text-2xl text-navy mb-2">Your choices.</h2>
              <p>
                To see, correct, or delete your information, email{" "}
                <a className="underline text-navy" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
            <section>
              <h2 className="font-display font-semibold text-2xl text-navy mb-2">Contact.</h2>
              <p>
                <a className="underline text-navy" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>
          </div>

          <p className="mt-10">
            <Link href="/" className="font-body text-sm text-sage hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </article>
      <Footer />
    </div>
  );
}
