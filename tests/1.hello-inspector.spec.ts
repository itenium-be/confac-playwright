import { test, expect } from '@playwright/test';

test.describe('confac Playwright Inspector demo', () => {
  // npx playwright test 1.hello-inspector.spec.ts --debug
  // npx playwright test hello-inspector --debug
  test('without security, can login with any username', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Expects exact match
    const name = page.getByTestId('name');
    expect(name).toHaveAttribute('data-testid', 'name');

    await name.fill('Steven');

    // case-insensitive & substring
    await page.getByRole('button', {name: 'confac start'}).click();

    await expect(page).toHaveTitle(/Maandelijkse facturatie/);
    await page.waitForFunction(expectedUser => localStorage.getItem('anonUser') === expectedUser, 'Steven');
  });
});
