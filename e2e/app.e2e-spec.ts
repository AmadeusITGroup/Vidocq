import { TheDProjectPage } from './app.po';

describe('the-d-project App', () => {
  let page: TheDProjectPage;

  beforeEach(() => {
    page = new TheDProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
