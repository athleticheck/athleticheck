import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#editProfile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}
export const editProfilePage = new EditProfilePage();
