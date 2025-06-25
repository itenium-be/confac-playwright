import { test, expect } from '@playwright/test';

// Create an invoice and upload the timesheet
// https://playwright.dev/docs/input#upload-files

test.describe('invoice attachments', () => {
  test('upload timesheet', async ({ page }) => {
    await page.goto('/invoices/create');

    // Create & upload
  });
});
