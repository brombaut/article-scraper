# Article Scraper

[![CI](https://github.com/brombaut/article-scraper/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/brombaut/article-scraper/actions/workflows/build_and_test.yml)
[![npm](https://img.shields.io/npm/v/article_scraper)](https://www.npmjs.com/package/article_scraper)
[![Codecov](https://img.shields.io/codecov/c/github/brombaut/article-scraper)](https://app.codecov.io/gh/brombaut/article-scraper)

Package for scraping information from different blogging websites.

### ✅ Currently supported sites

- [dev.to](https://dev.to/)

### 🚧 Planned sites to support:

- [medium.com](https://medium.com/)
- [martinfowler.com](https://martinfowler.com/)

## Installing

<p>

For the latest version:

</p>

```bash
npm i article_scraper
```

## Usage

```typescript
import { ArticleMetaData, ArticleScraper } from "article_scraper";

const url = "https://dev.to/ashish9342/commenting-code-good-practices-3d23";
const scraper: ArticleScraper = new ArticleScraper(url);
await scraper.scrape();
const result: ArticleMetaData = scraper.articleMetaData();
```

The `ArticleMetaData` result will contain information about the article in the following format. Any errors encountered during scraping will be added to the `errors` attribute.

```typescript
ArticleMetaData {
  title: 'Commenting Code | Good Practices',
  minuteRead: 3,
  tags: [
    {
      name: '#programming',
      href: 'https://dev.to/t/programming',
      color: '#ffffff',
      backgroundColor: '#890606'
    },
    {
      name: '#javascript',
      href: 'https://dev.to/t/javascript',
      color: '#000000',
      backgroundColor: '#F7DF1E'
    },
    {
      name: '#codequality',
      href: 'https://dev.to/t/codequality',
      color: '#000000',
      backgroundColor: '#e5fffd'
    },
    {
      name: '#productivity',
      href: 'https://dev.to/t/productivity',
      color: '#C8F7C5',
      backgroundColor: '#2A0798'
    }
  ],
  url: 'https://dev.to/ashish9342/commenting-code-good-practices-3d23',
  errors: []
}
```
