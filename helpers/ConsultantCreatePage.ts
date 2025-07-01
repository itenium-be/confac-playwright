import { Page } from '@playwright/test';

type ConsultantKeys = 'firstName' | 'name';

export class ConsultantCreatePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/consultants/create');
  }

  async fill(key: ConsultantKeys, value: string) {
    await this.page.getByTestId(key).fill(value);
  }

  async save() {
    await this.page.locator('.tst-save-consultant').click();
  }
}
