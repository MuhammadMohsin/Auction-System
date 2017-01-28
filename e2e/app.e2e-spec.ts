import { ChatAppPage } from './app.po';

describe('chat-app App', function() {
  let page: ChatAppPage;

  beforeEach(() => {
    page = new ChatAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
