import { test, expect } from '@playwright/test';

// Create an invoice and download the CSV
// https://playwright.dev/docs/downloads

test.describe('invoice list', () => {
  test('download invoice csv', async ({ page }) => {
    await page.goto('/invoices');

    const csvPromise = page.waitForEvent('download');
    await page.locator('.tst-download-excel').click();
    const download = await csvPromise;

    await download.saveAs('./playwright/downloads/' + download.suggestedFilename());
    // TODO: Assert that the invoices are in the CSV
  });
});
