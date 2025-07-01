Confac-Playwright
=================

- [Github: Playwright](https://github.com/microsoft/playwright) ⭐ 73k
- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)


## Install

Node v22.11.0

```ps1
git clone --recurse-submodules https://github.com/itenium-be/confac-playwright

cd confac-playwright
npm install
npx playwright install
npm test
```

### Start confac

```ps1
docker volume create mongodata
docker run -id -p 27017:27017 -e "MONGO_INITDB_ROOT_USERNAME=admin" -e "MONGO_INITDB_ROOT_PASSWORD=pwd" -v mongodata:/data/db --name confac-mongo mongo:3.6.3

cd confac/backend
cp .env.sample .env
cp -r templates-example templates
npm install
npm start

cd ../frontend
npm install
npm start
```

### Dependencies

**Download [nvm for windows](https://github.com/coreybutler/nvm-windows/releases)**

On Administrative prompt:

```ps1
nvm install 22.11.0
nvm use 22.11.0
```

**Install [Docker for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)**

```ps1
docker pull mongo:3.6.3
```

## Playwright

### Annotations

```ts
test.fail()  // Expects a failure
test.fixme() // Will not run
test.slow()  // No timeout
test.only()  // Only run this

test('some test', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});

test.describe('group', { tag: '@prod' }, () => {});
// Run: npx playwright test --grep @prod
// Run: npx playwright test --grep-invert @prod
```

### Tracing

[Trace Viewer](https://playwright.dev/docs/trace-viewer)

```ps1
npx playwright test pom --trace on
npx playwright show-report
```

On the CI set `trace: 'on-first-retry'` in the config to replay
locally or on [trace.playwright.dev](https://trace.playwright.dev/)
what went wrong.

```ps1
npx playwright show-trace trace.zip
```

### Screenshots

```ts
// Create a screenshot
// https://playwright.dev/docs/screenshots
await page.screenshot({
  path: './playwright/downloads/screenshot.png',
  fullPage: true,
  maxDiffPixels: 100, // or via defineConfig({expect.toHaveSceenshot.maxDiffPixels: x})
  stylePath: path.join(__dirname, 'screenshot.css'), // make volatile elements stand out
});

// Create a screenshot on first render and compare after
// Uses https://github.com/mapbox/pixelmatch to compare
// https://playwright.dev/docs/test-snapshots
await expect(page).toHaveScreenshot();

// Update the "golden" screenshots after changes to the layout
// npx playwright test --update-snapshots
```

### Videos

While the trace.zip is probably better to do after-failure
analysis, you can also [record videos](https://playwright.dev/docs/videos).

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    video: 'on-first-retry', // off, on, retain-on-failure
    size: { width: 640, height: 480 }
  },
});
```



## Exercises

### INVOICING

- Create invoice:
  - Set invoice line aantal & eenheidsprijs & btw & check the calculated numbers
  - Create credit nota & verify that amount is negated + the invoices are linked
- Emailing:
  - Set config FROM, SUBJECT, Signature, Body
  - Mock Email endpoint and verify that these are indeed used
- Download invoice & verify that email filename is as in config
- Edit invoice:
  - Create invoice: verify audit is set
  - Edit quickly: audit is not updated
- Add comment: verify that there are three dots
- Invoices List:
  - Test different filters

### PROJECTS
- Create project
  - Switch between Consulants and verify that the switches are set accordingly
  - Project is bij eindklant --> extra field (switch values?)
  - Specifieke facturatiedetails instellen --> changed standaard factuurlijnen (keep values?)

### CONTRACTS
- Update statusses of project/client and verify that icon is correct in project list

### PROJECT_MONTHS
- Het bestelbon nr wijzigt voor elke factuur
- Heeft inkomende factuur
- Timesheets: SDWorx rapport check
- Proforma factuur
--> Create such a project and then verify the form after "Maand toevoegen"

### SECURITY
- Take away a certain claim: view-email-invoices --> no email icons
- delete-project
- validate-projectMonthTimesheet
- Add load-historical
