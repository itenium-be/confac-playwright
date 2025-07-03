using Itenium.Confac.Playwright.Helpers;
using Itenium.Confac.Playwright.Models;

namespace Itenium.Confac.Playwright;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class ConsultantFilters : DbPage
{
  [OneTimeSetUp]
  public async Task InsertConsultants()
  {
    await Db.GetCollection<Consultant>("consultants").InsertOneAsync(new Consultant()
    {
      Name = "name2",
      FirstName = "firstName"
    });
  }

  [SetUp]
  public async Task OpenConsultants()
  {
    await Page.GotoAsync("/consultants");
  }

  [Test]
  public async Task TextFilter_Works()
  {
    await Page.GotoAsync("/clients");
    
  }

  [OneTimeTearDown]
  public async Task DeleteConsultants()
  {
    await Db.DropCollectionAsync("consultants");
  }
}
