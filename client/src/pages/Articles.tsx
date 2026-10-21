import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { articlePath, formatArticleDate, publishedArticles } from "@/content/articles";
import { ROUTE_SEO } from "@/lib/site";

const seo = ROUTE_SEO.find((route) => route.path === "/articles")!;

export default function Articles() {
  const articles = publishedArticles();

  return (
    <div className="min-h-screen bg-warm-white">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <Navbar />
      <section className="pt-32 pb-16 bg-stone">
        <div className="container max-w-3xl">
          <span className="section-rule" />
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-5">
            Articles
          </h1>
          <p className="font-body text-lg text-navy/70 leading-relaxed">
            100% remote, serving clients across the US. Notes on bookkeeping for freelancers, new LLCs, and small businesses.
          </p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl">
          {articles.length === 0 ? (
            <p className="font-body text-xl text-navy leading-relaxed">Articles coming soon.</p>
          ) : (
            <ul className="space-y-6">
              {articles.map((article) => (
                <li key={article.slug} className="bg-white border border-stone-dark rounded-2xl p-6 shadow-sm">
                  <p className="font-body text-sm text-navy/60 mb-2">
                    <time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time>
                  </p>
                  <h2 className="font-display font-semibold text-2xl text-navy mb-2">
                    <Link href={articlePath(article.slug)} className="hover:text-navy-dark">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="font-body text-base text-navy/75 leading-relaxed">{article.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
