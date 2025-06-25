import { Locator, Page } from '@playwright/test';

export class Dropdown {
  private container: Locator;

  /** Returns a single element */
  get value(): Locator {
    return this.container.locator('.react-select__value-container');
  }

  /** May return multiple elements */
  get values(): Locator {
    return this.container.locator('.react-select__single-value')
      .or(this.container.locator('.react-select__multi-value'));
  }

  constructor(page: Page, key: string) {
    const input = page.locator('.react-select__input-container').getByLabel(key);
    this.container = page.locator('.react-select__control').filter({has: input});
  }

  async selectOption(label: string) {
    await this.toggle();

    await this.container
      .locator('..') // xpath parent
      .locator('.react-select__option')
      .getByText(label, {exact: true})
      .click();
  }

  private async toggle() {
    await this.container.locator('.react-select__indicators').click();
  }
}
