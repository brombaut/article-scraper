import { SiteScraper } from "./SiteScraper";

class ArticleScraper {
  constructor(private url: string) {

  }

  siteScrapperFactory(): SiteScraper {
    throw new Error("Method not implemented.");
  }
} 