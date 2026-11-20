import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import ArticleBody from "@/content/articleBody";
import {
  articleDocumentTitle,
  articleJsonLd,
  articlePath,
  formatArticleDate,
  publishedArticles,
  type Article as ArticleRecord,
} from "@/content/articles";

const TAX_SEASON = new Set([
  "catch-up-bookkeeping-before-tax-time",
  "year-end-bookkeeping-checklist",
  "bookkeeping-for-freelancers-1099-contractors",
]);

function relatedArticles(article: ArticleRecord) {
  const bySlug = new Map(publishedArticles().map((item) => [item.slug, item]));
  return (article.relatedSlugs ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((item): item is ArticleRecord => Boolean(item));
}

export default function Article({ params }: { params: { slug?: string } }) {
  const article = publishedArticles().find((item) => item.slug === params.slug);
  if (!article) return <NotFound />;
  const related = relatedArticles(article);

  return (
    <div className="min-h-screen bg-warm-white">
      <Seo
        title={articleDocumentTitle(article.title)}
        description={article.description}
        path={articlePath(article.slug)}
        ogType="article"
        author={article.author}
        publishedTime={article.datePublished}
        modifiedTime={article.dateModified}
        jsonLd={articleJsonLd(article)}
      />
      <Navbar />
      <article className="pt-32 pb-20">
        <div className="container max-w-3xl">
          <span className="section-rule" />
          <p className="font-body text-sm text-navy/60 mb-4">
            <time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time>
            {article.dateModified !== article.datePublished ? (
              <span> · Updated {formatArticleDate(article.dateModified)}</span>
            ) : null}
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy leading-tight mb-6">
            {article.title}
          </h1>
          <ArticleBody markdown={article.body} />
          {related.length > 0 ? (
            <section className="mt-12 border-t border-stone-dark pt-8">
              <h2 className="font-display font-semibold text-2xl text-navy mb-4">Related articles</h2>
              <ul className="space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`${articlePath(item.slug)}/`}
                      className="font-body text-base font-semibold text-navy underline decoration-gold underline-offset-4"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="mt-10 rounded-2xl border border-stone-dark bg-stone p-6">
            <h2 className="font-display font-semibold text-xl text-navy mb-3">Want help with your books?</h2>
            <p className="font-body text-base text-navy/80 leading-relaxed">
              SteadyBooks is 100% remote, serving clients across the US.
              {TAX_SEASON.has(article.slug) ? (
                <>
                  {" "}
                  If the books are behind, see{" "}
                  <Link href="/tax-ready/" className="font-semibold text-navy underline decoration-gold underline-offset-4">
                    tax-ready books by Feb 15
                  </Link>
                  .
                </>
              ) : null}{" "}
              <Link href="/contact/" className="font-semibold text-navy underline decoration-gold underline-offset-4">
                Send a message
              </Link>{" "}
              or book a free consult.
            </p>
          </section>
          <p className="mt-10">
            <Link href="/articles/" className="font-body text-sm font-semibold text-navy underline decoration-gold underline-offset-4">
              Back to articles
            </Link>
          </p>
        </div>
      </article>
      <Footer />
    </div>
  );
}
