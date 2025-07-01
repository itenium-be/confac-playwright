import { test, expect } from '../helpers/ConfacFixtures';

// Fixtures: https://playwright.dev/docs/test-fixtures
// Global setup: https://playwright.dev/docs/test-global-setup-teardown
// Snapshot testing: https://playwright.dev/docs/aria-snapshots

// npx playwright test --update-snapshots --update-source-method=3way

test.describe('admin role', () => {
  test('sees "load more data" button', async ({ page }) => {
    await page.goto('/');

    // Create a snapshot
    // const snapshot = await page.locator('.navbar-collapse').ariaSnapshot();
    // console.log(snapshot);

    // await expect(page.locator('#basic-navbar-nav')).toMatchAriaSnapshot({ name: 'navbar.aria.yml' });
    // export default defineConfig({
    //   expect: {
    //     toMatchAriaSnapshot: {
    //       pathTemplate: '__snapshots__/{testFilePath}/{arg}{ext}',
    //     },
    //   },
    // });

    await expect(page.locator('#basic-navbar-nav')).toMatchAriaSnapshot(`
      - link "Facturatie":
        - /url: /monthly-invoicing
      - link "Projecten":
        - /url: /projects
      - link "Klanten":
        - /url: /clients
      - link "Facturen":
        - /url: /invoices
      - link "Config":
        - /url: /config
      - group:
        - button
        - link /Nieuwe .*/:
          - /url: /invoices/create
        - button "Other creations"
        - button "User details"
    `);
  });
});
