import { test, expect } from '@playwright/test';

// The socket.io implementation syncs updates between tabs and browsers
// Write a test that makes a change in one tab/browser and then checks
// the other tab/browser for this change
// https://playwright.dev/docs/pages


test.describe('socket.io', () => {
  test('syncs changes between tabs', async ({ context }) => {
    const tab1 = await context.newPage();
    const tab2 = await context.newPage();

    await tab1.goto('/config');
    await tab2.goto('/config');

    // Make a change on tab1
    // Verify it on tab2!
    // Verify that the toastr is displayed on tab2
  });

  // Do the same but use two completely different browsers!
});
