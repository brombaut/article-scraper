import { RequestMakerAxios } from "./RequestMaker";
import { SiteScraper } from "./SiteScraper";
import { SiteScraperDevDotTo } from "./SiteScraperDevDotTo";

class SiteScraperFactory {
  constructor(private url: string) {}

  siteScraper(): SiteScraper {
    const DEV_DOT_TOO_STRING = "dev.to";

    if (this.url.includes(DEV_DOT_TOO_STRING)) {
      return new SiteScraperDevDotTo(this.url, new RequestMakerAxios(this.url));
    }

    throw new Error("Unknown blogging site");
  }
}

export {SiteScraperFactory}