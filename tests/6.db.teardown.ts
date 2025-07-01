import { test as teardown } from '../helpers/ConfacFixtures';

teardown('delete database', async ({ db }) => {
  console.log('deleting the database...');
});
