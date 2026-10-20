import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Seo
        title="Page not found | SteadyBooks"
        description="That page is not part of the SteadyBooks site."
        path="/"
      />
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container max-w-xl text-center">
          <h1 className="font-display font-bold text-4xl text-navy mb-4">Page not found</h1>
          <p className="font-body text-base text-navy/70 mb-8">
            That address is not on this site.
          </p>
          <Link
            href="/"
            className="inline-flex font-body font-semibold text-sm bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy-dark"
          >
            Back to home
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
