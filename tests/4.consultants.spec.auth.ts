import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('consultants', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/consultants');
  });

  test('sets page title', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/consultants');
    await expect(page).toHaveTitle(/^Consultants/);
  });

  test('create a new consultant', async ({ page }) => {
    await page.getByTestId('add').click();

    const saveButton = page.locator('.tst-save-consultant');
    await expect(saveButton).toBeDisabled();

    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName() + '_' + faker.date.recent().valueOf(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    };

    await page.getByPlaceholder('Voornaam').fill(user.firstName);
    await page.getByRole('textbox', { name: 'Naam', exact: true }).fill(user.lastName);
    await expect(saveButton).toBeEnabled();

    // https://playwright.dev/docs/other-locators
    const emailInput = page.locator('input:below(:text("E-mail"))').first();
    await emailInput.fill(user.email);

    const phoneComponent = page.locator('_react=PhoneInput');
    const textBoxes = page.getByRole('textbox');
    const phoneInput = phoneComponent.locator(textBoxes);
    await phoneInput.fill(user.phone);

    await phoneInput.focus();
    await page.keyboard.press('Tab'); // focuses phone button
    await page.keyboard.press('Tab');
    const accountingCodeCol = page.locator('_react=Col[key = "accountingCode"]');
    const accountingCodeInput = accountingCodeCol.locator(textBoxes);
    await expect(accountingCodeInput).toBeFocused();

    // Type Dropdown
    await page.locator('.react-select__input-container').click();
    await page.locator('.react-select__option').filter({hasText: 'Externe consultant'}).click();

    await saveButton.click();
    await expect(page).toHaveTitle(/Consultants/);
  });
});
