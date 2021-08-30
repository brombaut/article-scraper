import {RequestMaker, RequestMakerAxios, RequestMakerHardCoded} from '../RequestMaker'
import { parse } from 'node-html-parser';

describe('RequestMakerHardCoded', () => {
  it('returns a string', async () => {
    const rm: RequestMaker = new RequestMakerHardCoded();
    await rm.get()
    const result = rm.pageContent();
    expect(result).not.toBeNull();
  });

  it('returns expected HTML', async () => {
    const rm: RequestMaker = new RequestMakerHardCoded();
    await rm.get()
    const result = rm.pageContent();
    const parsedHtml = parse(result);
    const mainTitle = parsedHtml.querySelector('#main-title')?.querySelector('h1')
    ?.text;
    expect(mainTitle).toEqual('A hard coded article title');
    const minRead = parsedHtml.querySelector('#min-read')?.text;
    expect(minRead).toEqual('4');
    const tags = parsedHtml.querySelectorAll('#tags li').map(el => el.text);
    expect(tags).toEqual(['javascript', 'node', 'typescript']);
  })
});

describe('RequestMakerAxios', () => {
  it('successfully makes a request', async() => {
    const url = 'https://dev.to/';
    const rm: RequestMaker = new RequestMakerAxios(url);
    await rm.get();
    expect(rm.pageContent()).not.toBeNull();
  });

  it('parses simple dev.to homepage elements', async () => {
    const url = 'https://dev.to/';
    const rm: RequestMaker = new RequestMakerAxios(url);
    await rm.get();
    const result = rm.pageContent();
    const parsedHtml = parse(result);
    const siteLogo = parsedHtml.querySelector('.site-logo');
    expect(siteLogo).not.toBeNull();
  });
})