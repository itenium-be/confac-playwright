import { test, expect } from '@playwright/test';

test.describe('POM', () => {
  test('helpers for dropdowns', async ({ page }) => {
    await page.goto('/clients/create');

    // TODO: use this:
    // https://playwright.dev/docs/test-fixtures
  });
});
