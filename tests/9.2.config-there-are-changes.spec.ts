import { test, expect } from '@playwright/test';

test.describe('edit config', () => {
  test('leaving page should trigger "there are changes" modal', async ({ page }) => {
    await page.goto('/config');

    await page.getByPlaceholder('Bedrijfsnaam').fill('itenium');
    await page.getByRole('link', {name: 'Facturen'}).click();

    await expect(page).toHaveTitle(/Configuratie/);
    await expect(page.getByText('Er zijn wijzigingen')).toBeVisible();
  });

  test('"Nee, blijf op de pagina" stays on the page', async ({ page }) => {});
  test('"Ja, verder zonder bewaren" does navigate', async ({ page }) => {});
});
