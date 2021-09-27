import {RequestMakerAxios} from '../RequestMaker';
import {SiteScraper} from '../SiteScraper';
import {SiteScraperDevDotTo} from '../SiteScraperDevDotTo';

describe('SiteScrapperDevDotTo', () => {
  const URL = 'https://dev.to/tris909/before-i-land-a-job-as-a-developer-mistakes-that-i-ve-made-by-learning-how-to-code-by-myself-j2k';

  const EXPECTED_TITLE = `Before I land a job as a developer, mistakes that I've made by learning how to code by myself`;

  const EXPECTED_MINUTE_READ = 7;

  const EXPECTED_TAGS = [
    {
      name: '#advices',
      href: 'https://dev.to/t/advices',
      color: '',
      backgroundColor: ''
    },
    {
      name: '#career',
      href: 'https://dev.to/t/career',
      color: '#FFFFFF',
      backgroundColor: '#2A2566'
    }
  ];

  let devScraper: SiteScraper;

  beforeAll(async () => {
    devScraper = new SiteScraperDevDotTo(URL, new RequestMakerAxios(URL));
    await devScraper.scrapeArticleData();
  });

  it('scrapes title', async () => {
    try {
      expect(devScraper.articleData().hasErrors()).toBeFalsy();
      expect(devScraper.articleData().title).toEqual(EXPECTED_TITLE);
    } catch(e) {
      console.error(devScraper.articleData().errors);
      throw e;
    }
  });

  it('scrapes minute read', async () => {
    try {
      expect(devScraper.articleData().hasErrors()).toBeFalsy();
      expect(devScraper.articleData().minuteRead).toEqual(EXPECTED_MINUTE_READ);
    } catch(e) {
      console.error(devScraper.articleData().errors);
      throw e;
    }
  });

  it('scrapes tags info', async () => {
    try {
      expect(devScraper.articleData().hasErrors()).toBeFalsy();
      expect(devScraper.articleData().tags).toEqual(EXPECTED_TAGS);
    } catch(e) {
      console.error(devScraper.articleData().errors);
      throw e;
    }
  });

  it('contains an error when elements are not found', async () => {
    const WRONG_URL = 'https://axios-http.com/docs/example';
    const devScraper: SiteScraper = new SiteScraperDevDotTo(WRONG_URL, new RequestMakerAxios(WRONG_URL));
    await devScraper.scrapeArticleData();
    expect(devScraper.articleData().hasErrors()).toBeTruthy();
  });
});
