using Itenium.Confac.Playwright.Helpers;
using Itenium.Confac.Playwright.Models;
using MongoDB.Driver;

namespace Itenium.Confac.Playwright;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class ConsultantFilters : DbPage
{
  [OneTimeSetUp]
  public async Task InsertConsultants()
  {
    long count = await Db.GetCollection<Consultant>("consultants").CountDocumentsAsync(_ => true);
    if (count > 0)
    {
      return;
    }

    await Db.GetCollection<Consultant>("consultants").InsertManyAsync([
      new Consultant("Anders", "Hejlsberg"),
      new Consultant("Linus", "Torvalds"),
      new Consultant("Guido", "van Rossum"),
      new Consultant("Brendan", "Eich"),
      new Consultant("Martin", "Fowler"),
      new Consultant("Robert", "Martin"),
      new Consultant("Grace", "Hopper"),
      new Consultant("Donald", "Knuth"),
      new Consultant("Ken", "Thompson"),
      new Consultant("Bruce", "Drucker"),
      new Consultant("Peter", "Schneier", false),
      new Consultant("Clayton", "Christensen", false),
    ]);
  }

  [SetUp]
  public async Task OpenConsultants()
  {
    await Page.GotoAsync("/consultants");
  }

  [Test]
  public async Task TextFilter_Works()
  {
    

  }

  [OneTimeTearDown]
  public async Task DeleteConsultants()
  {
    // await Db.DropCollectionAsync("consultants");
  }
}
