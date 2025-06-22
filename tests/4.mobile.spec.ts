import { test, expect } from '@playwright/test';

test.describe('mobile', () => {
  test.use({ viewport: { width: 600, height: 500 } });

  test('expect hamburger', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Toggle navigation' })).toBeVisible();
  });
});
