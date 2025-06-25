import { Page } from '@playwright/test';
import { BtwResponse } from '../confac/frontend/src/components/controls/form-controls/inputs/BtwInput';
import { defaultClientProperties } from './../confac/frontend/src/components/client/models/ClientConfig';
import { NotesModal } from './NotesModal';


type ClientKeys = Extract<typeof defaultClientProperties[number], { key: any }>['key'];


export class ClientCreatePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/clients/create');
  }

  async btw(btw: BtwResponse | 'btw in aanvraag' = defaultResponse): Promise<BtwResponse | null> {
    if (btw === 'btw in aanvraag') {
      await this.page.getByTestId('btw-requested').click();
      return null;
    }

    await this.page.route('*/**/api/clients/btw/*', async route => {
      await route.fulfill({ json: btw });
    });

    await this.page.getByTestId('btw').fill(btw.vatNumber);
    await this.page.waitForResponse(resp => resp.url().includes('/api/clients/btw'))
    await this.page.getByTestId('btw-continue').click();
    return btw;
  }

  get(key: ClientKeys) {
    return this.page.getByTestId(key);
  }

  async fill(key: ClientKeys, value: string) {
    await this.get(key).fill(value);
  }

  async notes() {
    await this.page.locator('.tst-add-note').first().click();
    return new NotesModal(this.page);
  }

  async save() {
    await this.page.locator('.tst-save-client').click();
  }
}


const defaultResponse: BtwResponse = {
  valid: true,
  countryCode: 'BE',
  vatNumber: '0429037235',
  name: 'Inetum',
  address: {
    street: 'Mechelsesteenweg',
    number: '5',
    zip_code: '9000',
    city: 'Gent',
    country: 'België',
    countryCode: 'BE',
  },
  strAddress: 'Mechelsesteenweg 5\n9000 Gent',
}
