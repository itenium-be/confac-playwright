import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 8000,
  // testIgnore: './tests/helpers',
  // testMatch: process.env.IS_PROD ? /.*\.prod\.spec\.ts/ : undefined,
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* ex: html, line, json, list, dot, blob, junit, github */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  // Setup/Teardown
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: require.resolve('./global-teardown'),

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'smoke',
      testMatch: /.*\.smoke\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'setup-auth',
      testMatch: /.*2\.auth\.setup\.ts/
    },
    {
      name: 'with-auth',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      testMatch: /.*\.spec\.auth\.ts/,
      dependencies: ['setup-auth'],
    },

    {
      name: 'setup-db',
      testMatch: /.*6\.db\.setup\.ts/
    },
    {
      name: 'cleanup-db',
      testMatch: /.*6\.db\.teardown\.ts/
    },
    {
      name: 'auth+db',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup-auth', 'setup-db'],
      teardown: 'cleanup-db',
    },

    // Run for all three browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], storageState: 'playwright/.auth/user.json' },
    //   dependencies: ['setup-auth'],
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], storageState: 'playwright/.auth/user.json' },
    //   dependencies: ['setup-auth'],
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: [{
  //   command: 'npm run start',
  //   name: 'Frontend',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // }],
});
