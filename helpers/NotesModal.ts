import { Locator, Page } from '@playwright/test';

export class NotesModal {
  public modal: Locator;
  public comments: Locator;

  constructor(private page: Page) {
    this.modal = page.locator('.comments-modal');
    this.comments = this.modal.locator('.table-comments');
  }

  async add(comment: string) {
    await this.modal.getByTestId('add').click();
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.type(comment);
    await this.modal.getByTestId('confirm').click();
  }

  async search(needle: string) {
    await this.modal.getByTestId('search').fill(needle);
  }

  async close() {
    await this.modal.getByTestId('close').click();
  }
}
