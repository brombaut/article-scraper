import { SiteScraperFactory } from '../SiteScraperFactory';
import { SiteScraper } from "../SiteScraper";
import { SiteScraperDevDotTo } from '../SiteScraperDevDotTo';

describe('SiteScraperFactory', () => {
  it('throws an error when handed an unknown url', () => {
    const url = 'https://stackoverflow.com/';
    const factory: SiteScraperFactory = new SiteScraperFactory(url);
    expect(() => {
      factory.siteScraper();
    }).toThrow("Unknown blogging site");
  });

  it('returns a SiteScraperDevDotTo when handed a dev.to url', () => {
    const url = 'https://dev.to/tris909/before-i-land-a-job-as-a-developer-mistakes-that-i-ve-made-by-learning-how-to-code-by-myself-j2k';
    const factory: SiteScraperFactory = new SiteScraperFactory(url);
    const siteScraper: SiteScraper = factory.siteScraper();
    expect(siteScraper).toBeInstanceOf(SiteScraperDevDotTo);
  });
});