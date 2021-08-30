import { HTMLElement } from "node-html-parser";
import { Tag } from "./ScrappedArticleData";
import { SiteScrapper } from "./SiteScrapper";

class SiteScrapperDevDotTo extends SiteScrapper {

  protected scrapeTitle(): void {
    const query = '#main-title h1';
    try {
      const title = this.queryHtmlElement(query).text.trim();
      this._articleData.title = title;
    } catch (e) {
      const estring = `Could not find --title-- element that matches query: ${query}`;
      this._articleData.addError(estring);
    }
  }
  protected scrapeMinuteRead(): void {
    const query = '#main-title time';
    try {
      const timeEls: HTMLElement[] = this.queryAllHtmlElement(query);
      let minuteRead = -1;
      timeEls.forEach((timeEl: HTMLElement) => {
        const minReadEl = timeEl.nextElementSibling;
        if(!minReadEl) {
          return;
        }
        if (minReadEl.text.includes("min read")) {
          [minuteRead] = (minReadEl.text.match(/\d+/g) || ["0"]).map(Number);
        }
      });
      if (minuteRead < 0) {
        throw new Error();
      }
      this._articleData.minuteRead = minuteRead;
    } catch (e) {
      const estring = `Could not find --minuteRead-- element that matches query: ${query}`;
      this._articleData.addError(estring);
    }
  }
  protected scrapeTags(): Tag[] {
    throw new Error("Method not implemented.");
  }
}

export {SiteScrapperDevDotTo}