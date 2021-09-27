import { HTMLElement } from "node-html-parser";
import { Tag } from "./ArticleMetaData";
import { SiteScraper } from "./SiteScraper";

class SiteScraperDevDotTo extends SiteScraper {
  private  _devToBaseUrl = "https://dev.to";
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
  protected scrapeTags(): void {
    const query = '#main-title .spec__tags a';
    try {
      const tagEls = this.queryAllHtmlElement(query);
      tagEls.forEach(te => {
        const name = te.text.trim();
        const relHref = te.attributes.href;
        const href = `${this._devToBaseUrl}${relHref}`;
        const stylesString: string = te.attributes.style || "";
        const stylesArray: string[] = stylesString.split(";");
        let color = "";
        let backgroundColor = "";
        stylesArray.forEach((styleString: string) => {
          const [name, value] = styleString.split(":");
          if (name === "color") {
            color = value;
          }
          if (name === "background-color") {
            backgroundColor = value;
          }
        });
        const tagObject: Tag = {
          name,
          href,
          color,
          backgroundColor,
        };
        this._articleData.tags.push(tagObject);
      });
    } catch (e) {
      const estring = `Could not find --title-- element that matches query: ${query}`;
      this._articleData.addError(estring);
    }
  }
}

export {SiteScraperDevDotTo}