import axios from "axios";

abstract class RequestMaker {
  protected _html: string = '';
  constructor(protected _url: string) { }
  abstract get(): Promise<void>;
  abstract pageContent(): string;
}

class RequestMakerAxios extends RequestMaker {
  async get(): Promise<void> {
    const response = await axios.get(this._url);
    this._html = response.data;
  }
  pageContent(): string {
    return this._html;
  }
}

class RequestMakerHardCoded extends RequestMaker {
  protected _html = `
  <html>
    <body>
    <header></header>
    <div id='main-title'>
      <h1>A hard coded article title</h1>
    </div>
    <div id='sub-header'>
      <div id='min-read'>4</div>
      <div id='tags'>
        <ul>
          <li>javascript</li>
          <li>node</li>
          <li>typescript</li>
        </ul>
      </div>
    </div>
    <div id='content'></div>
    </body>
  </html>
  `
  constructor() {
    super('');
  }
  async get(): Promise<void> {
  }
  pageContent(): string {
    return this._html;
  }
}

export {RequestMaker, RequestMakerAxios, RequestMakerHardCoded};