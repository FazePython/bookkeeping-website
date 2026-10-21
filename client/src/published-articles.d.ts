declare module "virtual:published-articles" {
  import type { Article } from "./content/articles";

  export const publishedArticleData: Article[];
}
