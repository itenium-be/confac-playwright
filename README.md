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
