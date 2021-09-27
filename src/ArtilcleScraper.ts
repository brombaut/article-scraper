import { ArticleMetaData } from "./ArticleMetaData";
import { SiteScraper } from "./SiteScraper";
import { SiteScraperFactory } from "./SiteScraperFactory";

class ArticleScraper {
  private siteScraper: SiteScraper;
  constructor(url: string) {
    this.siteScraper = new SiteScraperFactory(url).siteScraper();
  }

  async scrape() {
    await this.siteScraper.scrapeArticleData();
  }

  articleMetaData(): ArticleMetaData {
    return this.siteScraper.articleData();
  }

} 

export { ArticleScraper };