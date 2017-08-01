import { IntervalPage } from './app.po';

describe('interval App', () => {
  let page: IntervalPage;

  beforeEach(() => {
    page = new IntervalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
