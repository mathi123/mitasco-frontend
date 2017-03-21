import { MitascoFrontendPage } from './app.po';

describe('mitasco-frontend App', () => {
  let page: MitascoFrontendPage;

  beforeEach(() => {
    page = new MitascoFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
