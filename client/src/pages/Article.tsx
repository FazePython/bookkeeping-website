import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import ArticleBody from "@/content/articleBody";
import { articleJsonLd, articlePath, formatArticleDate, publishedArticles } from "@/content/articles";

export default function Article({ params }: { params: { slug?: string } }) {
  const article = publishedArticles().find((item) => item.slug === params.slug);
  if (!article) return <NotFound />;

  return (
    <div className="min-h-screen bg-warm-white">
      <Seo
        title={`${article.title} | SteadyBooks`}
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
          <p className="mt-10">
            <Link href="/articles" className="font-body text-sm font-semibold text-navy underline decoration-gold underline-offset-4">
              Back to articles
            </Link>
          </p>
        </div>
      </article>
      <Footer />
    </div>
  );
}
