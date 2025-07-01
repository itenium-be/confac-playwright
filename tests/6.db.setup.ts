// We add our own "fixture" (on top of default fixtures like Page & Context)
import { test as setup } from '../helpers/ConfacFixtures';

// This injects the "db" for us
setup('create new database', async ({ db }) => {
  // setup.setTimeout(120_000);

  // Dropping db as part of the setup (and not teardown)
  // (so we can inspect the database after running test)
  console.log('dropping confac-playwright');
  await db.dropDatabase();

  // Insert some default stuff
  console.log('inserting default roles');
  await db.collection('roles').insertMany(defaultRoles);
});





const defaultRoles = [{
  "name" : "user",
  "claims" : [
      "view-config", "view-clients", "manage-clients", "view-projects", "manage-projects", "view-quotations",
      "manage-quotations", "view-invoices", "view-projectMonth", "edit-projectMonth", "view-consultants",
      "manage-consultants", "load-historical"
  ],
}, {
  "name" : "admin",
  "claims" : [
      "view-config", "manage-config", "view-clients", "manage-clients", "view-projects",
      "manage-projects", "view-quotations", "manage-quotations", "view-invoices", "manage-invoices",
      "validate-invoices", "email-invoices", "view-projectMonth", "edit-projectMonth", "create-projectMonth",
      "view-users", "manage-users", "view-consultants", "manage-consultants", "validate-projectMonth",
      "delete-projectMonth", "view-roles", "manage-roles", "load-historical", "delete-project",
      "view-email-invoices", "validate-projectMonthTimesheet", "validate-projectMonthInbound"
  ],
}, {
  "name" : "readonly",
  "claims" : [
      "view-config", "view-clients", "view-projects", "view-quotations", "view-invoices", "view-projectMonth",
      "view-users", "view-consultants"
  ],
}];
