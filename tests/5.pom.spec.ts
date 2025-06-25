import { test, expect } from '@playwright/test';
import { Dropdown } from '../helpers/Dropdown';
import { ClientCreatePage } from '../helpers/ClientCreatePage';
import { NotesModal } from '../helpers/NotesModal';

test.describe('POM', () => {
  test('helpers for dropdowns', async ({ page }) => {
    await page.goto('/clients/create');
    await page.getByTestId('btw-requested').click();

    // Page Object Model: https://playwright.dev/docs/pom

    // Single option dropdown
    const country = new Dropdown(page, 'country');
    await expect(country.value).toHaveText('');
    await country.selectOption('UK');
    await expect(country.value).toHaveText('UK');

    // Multiple option dropdown
    const types = new Dropdown(page, 'types');
    await types.selectOption('Klant');
    await expect(types.value).toHaveText('Klant');
    await expect(types.values).toHaveText('Klant');

    await types.selectOption('Onderaannemer');
    await expect(types.value).toContainText('Onderaannemer');
    await expect(types.values.first()).toHaveText('Klant');
    await expect(types.values.last()).toHaveText('Onderaannemer');

    await page.waitForTimeout(1000);
  });




  test.describe('POM for create client', () => {
    test('btw in aanvraag', async ({ page }) => {
      const clientCreate = new ClientCreatePage(page);
      await clientCreate.goto();
      await clientCreate.btw('btw in aanvraag');

      await expect(clientCreate.get('btw')).toHaveValue('btw in aanvraag');
    });

    test('with btw nr', async ({ page }) => {
      const clientCreate = new ClientCreatePage(page);
      await clientCreate.goto();

      // Mock API: https://playwright.dev/docs/mock
      const btwInfo = (await clientCreate.btw())!;

      await expect(clientCreate.get('name')).toHaveValue(btwInfo.name);
      await expect(clientCreate.get('postalCode')).toHaveValue(btwInfo.address.zip_code);
    });

    test.describe('client comments', () => {
      let clientCreate: ClientCreatePage;
      let notes: NotesModal;

      test.beforeEach(async ({ page }) => {
        clientCreate = new ClientCreatePage(page);
        await clientCreate.goto();
        await clientCreate.btw();
        notes = await clientCreate.notes();
      });

      test('search for a comment', async () => {
        await notes.search('needle');
        await expect(notes.modal).toContainText('Geen commentaar gevonden die overeenkomen met uw filter');
      });

      test('add a comment', async () => {
        await notes.add('le comment');
        await expect(notes.comments).toContainText('le comment');
      });
    });
  });
});
