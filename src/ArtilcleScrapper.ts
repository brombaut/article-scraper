import { SiteScrapper } from "./SiteScrapper";

class ArticleScrapper {
  constructor(private url: string) {

  }

  siteScrapperFactory(): SiteScrapper {
    throw new Error("Method not implemented.");
  }
} 