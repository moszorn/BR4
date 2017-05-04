import { BR4Page } from './app.po';

describe('br4 App', () => {
  let page: BR4Page;

  beforeEach(() => {
    page = new BR4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
