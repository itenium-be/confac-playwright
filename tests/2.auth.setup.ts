import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('login and remember auth', async ({ page, context }) => {
  const state = await context.storageState();
  if (!state.origins[0]?.localStorage?.find(x => x.name === 'anonUser')) {
    await page.goto('/'); // Because playwright.config.ts baseURL
    await page.getByTestId('name').fill('Steven');
    await page.getByRole('button', {name: 'Confac Starten'}).click();

    await expect(page).toHaveTitle(/Maandelijkse facturatie/);

    await page.context().storageState({ path: authFile });
  }
});
