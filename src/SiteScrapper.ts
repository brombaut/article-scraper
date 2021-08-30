import { RequestMaker } from "./RequestMaker";
import { ScrappedArticleData } from "./ScrappedArticleData"
import { HTMLElement, parse } from 'node-html-parser';


abstract class SiteScrapper {
  private _requestMaker: RequestMaker;
  protected _articleData: ScrappedArticleData;
  constructor(url: string, requestMaker: RequestMaker) { 
    this._articleData = new ScrappedArticleData(url);
    this._requestMaker = requestMaker;
  }

  public async scrapeArticleData(): Promise<void> {
    await this.getPageContent();
    this.scrapeTitle();
    this.scrapeMinuteRead();
    this.scrapeTags();
  }

  public articleData(): ScrappedArticleData {
    return this._articleData;
  }

  protected async getPageContent(): Promise<void> {
    await this._requestMaker.get();
  }

  protected queryHtmlElement(query: string): HTMLElement {
    const parsedHtml = parse(this._requestMaker.pageContent());
    const result = parsedHtml.querySelector(query);
    if (!result) {
      throw new Error(`No matching element for query: ${query}`);
    }
    return result;
  }

  protected queryAllHtmlElement(query: string): HTMLElement[] {
    const parsedHtml = parse(this._requestMaker.pageContent());
    const result = parsedHtml.querySelectorAll(query);
    if (!result) {
      throw new Error(`No matching elements for all query: ${query}`);
    }
    return result;
  }

  protected abstract scrapeTitle(): void;
  protected abstract scrapeMinuteRead(): void;
  protected abstract scrapeTags(): void;
}

export {SiteScrapper};