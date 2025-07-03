using Itenium.Confac.Playwright.Helpers;
using System.Text.RegularExpressions;
using Itenium.Confac.Playwright.Models;

namespace Itenium.Confac.Playwright;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class ConsultantFilters : DbPage
{
  [SetUp]
  public async Task InsertConsultants()
  {
    await Page.GotoAsync("/consultants");

    await Db.GetCollection<Consultant>("consultants").InsertOneAsync(new Consultant()
    {
      Name = "name",
      FirstName = "firstName"
    });
  }

  [Test]
  public async Task TextFilter_Works()
  {
    await Page.GotoAsync("/clients");
    
  }

  [TearDown]
  public async Task DeleteConsultants()
  {
    await Db.DropCollectionAsync("consultants");
  }
}
