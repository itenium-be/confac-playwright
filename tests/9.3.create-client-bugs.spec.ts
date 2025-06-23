import { test, expect } from '@playwright/test';

// Project > Nieuw project > Eindklant > Nieuwe klant

// Add a mock for: http://localhost:9000/api/clients/btw/BE0429037235
// See: https://playwright.dev/docs/mock

test.describe('create client from new project', () => {
  test("shouldn't have to press cancel twice", async ({ page }) => {
    await page.goto('/projects/create');

    // Click new client
    // Enter BTW (ex: 0429.037.235)
    // Click Sluiten

    await expect(page.getByText('Nieuwe eindklant')).toBeHidden();
  });

  test('should actually save with the payload', async ({ page }) => {
    await page.goto('/projects/create');

    // Click new client
    // Enter BTW (ex: 0429.037.235)
    // Click Bewaren
  });
});
