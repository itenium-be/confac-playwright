import { test, expect } from '../helpers/ConfacFixtures';

test.describe('consultants filter', () => {
  test.beforeAll(async ({ db }) => {
    const count = await db.collection('consultants').count();
    if (count === 0) {
      await db.collection('consultants').insertMany(defaultConsultants);
    }
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/consultants');
  });

  test('can filter on active', async ({ page }) => {

  });

  test('can filter on text', async ({ page }) => {

  });

  test.afterAll(async ({ db }) => {
    // await db.dropCollection('consultants');
  });
});



const defaultConsultants = [
  {
    "name" : "Anders",
    "firstName" : "Hejlsberg",
    "slug" : "hejlsberg-anders",
    "type" : "Consultant",
    "email" : "hejlsberg.anders@itenium.be",
    "active" : true,
  },
  {
    "name" : "Linus",
    "firstName" : "Torvalds",
    "slug" : "torvalds-linus",
    "type" : "Consultant",
    "email" : "torvalds.linus@itenium.be",
    "active" : true,
  },
  {
    "name" : "Guido",
    "firstName" : "van Rossum",
    "slug" : "van rossum-guido",
    "type" : "Consultant",
    "email" : "van rossum.guido@itenium.be",
    "active" : true,
  },
  {
    "name" : "Brendan",
    "firstName" : "Eich",
    "slug" : "eich-brendan",
    "type" : "Consultant",
    "email" : "eich.brendan@itenium.be",
    "active" : true,
  },
  {
    "name" : "Martin",
    "firstName" : "Fowler",
    "slug" : "fowler-martin",
    "type" : "Consultant",
    "email" : "fowler.martin@itenium.be",
    "active" : true,
  },
  {
    "name" : "Robert",
    "firstName" : "Martin",
    "slug" : "martin-robert",
    "type" : "Consultant",
    "email" : "martin.robert@itenium.be",
    "active" : true,
  },
  {
    "name" : "Grace",
    "firstName" : "Hopper",
    "slug" : "hopper-grace",
    "type" : "Consultant",
    "email" : "hopper.grace@itenium.be",
    "active" : true,
  },
  {
    "name" : "Donald",
    "firstName" : "Knuth",
    "slug" : "knuth-donald",
    "type" : "Consultant",
    "email" : "knuth.donald@itenium.be",
    "active" : true,
  },
  {
    "name" : "Ken",
    "firstName" : "Thompson",
    "slug" : "thompson-ken",
    "type" : "Consultant",
    "email" : "thompson.ken@itenium.be",
    "active" : true,
  },
  {
    "name" : "Bruce",
    "firstName" : "Drucker",
    "slug" : "drucker-bruce",
    "type" : "Consultant",
    "email" : "drucker.bruce@itenium.be",
    "active" : true,
  },
  {
    "name" : "Peter",
    "firstName" : "Schneier",
    "slug" : "schneier-peter",
    "type" : "Consultant",
    "email" : "schneier.peter@itenium.be",
    "active" : false,
  },
  {
    "name" : "Clayton",
    "firstName" : "Christensen",
    "slug" : "christensen-clayton",
    "type" : "Consultant",
    "email" : "christensen.clayton@itenium.be",
    "active" : false,
  }
];
