using Itenium.Confac.Playwright.Models;
using MongoDB.Driver;

namespace Itenium.Confac.Playwright.Helpers;

public class DbPage : AuthenticatedPage
{
  protected IMongoDatabase Db;

  [SetUp]
  public async Task SetUpDb()
  {
    const string mongoUri = "mongodb://admin:pwd@localhost:27017/admin";
    var mongo = new MongoClient(mongoUri);
    await mongo.DropDatabaseAsync("confac-playwright");

    Db = mongo.GetDatabase("confac-playwright");
    await Db.GetCollection<Role>("roles").InsertManyAsync(DefaultRoles);
  }

  private static readonly Role[] DefaultRoles = [
    new ("user",
    "view-config", "view-clients", "manage-clients", "view-projects", "manage-projects", "view-quotations",
    "manage-quotations", "view-invoices", "view-projectMonth", "edit-projectMonth", "view-consultants",
    "manage-consultants", "load-historical")
  , new ("admin",
    "view-config", "manage-config", "view-clients", "manage-clients", "view-projects",
    "manage-projects", "view-quotations", "manage-quotations", "view-invoices", "manage-invoices",
    "validate-invoices", "email-invoices", "view-projectMonth", "edit-projectMonth", "create-projectMonth",
    "view-users", "manage-users", "view-consultants", "manage-consultants", "validate-projectMonth",
    "delete-projectMonth", "view-roles", "manage-roles", "load-historical", "delete-project",
    "view-email-invoices", "validate-projectMonthTimesheet", "validate-projectMonthInbound")
   , new ("readonly",
    "view-config", "view-clients", "view-projects", "view-quotations", "view-invoices", "view-projectMonth",
    "view-users", "view-consultants")];
}
