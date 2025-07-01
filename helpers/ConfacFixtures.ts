import { test as base } from '@playwright/test';
import { MongoClient, Db } from 'mongodb';

type ConfacFixtures = {
  db: Db;
}


export const test = base.extend<ConfacFixtures>({
  db: async ({ page }, use) => {
    console.log('connecting to database...');

    const client = new MongoClient('mongodb://admin:pwd@localhost:27017/confac-playwright', {authSource: 'admin', useUnifiedTopology: true});
    await client.connect();
    const db = client.db('confac-playwright');

    // ATTN: done as part of the db.setup now
    // console.log('dropping confac-playwright');
    // await db.dropDatabase();

    await use(db);

    await client.close();
  },
});

export { expect } from '@playwright/test';
