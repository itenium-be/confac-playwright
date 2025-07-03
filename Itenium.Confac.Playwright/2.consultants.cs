using Itenium.Confac.Playwright.Helpers;
using System.Text.RegularExpressions;

namespace Itenium.Confac.Playwright;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class Consultants : AuthenticatedPage
{
  [SetUp]
  public async Task OpenConsultants()
  {
    await Page.GotoAsync("/consultants");
  }

  [Test]
  public async Task SetsPageTitle()
  {
    await Expect(Page).ToHaveURLAsync("http://localhost:3000/consultants");
    await Expect(Page).ToHaveTitleAsync(new Regex("Consultants"));
  }

  [Test]
  public async Task DropdownPageObjectModel()
  {
    await Page.GotoAsync("/clients/create");
    await Page.GetByTestId("btw-requested").ClickAsync();

    // Page Object Model: https://playwright.dev/docs/pom

    // Single option dropdown
    var country = new Dropdown(Page, "country");
    await Expect(country.Value).ToHaveTextAsync("");
    await country.SelectOption("UK");
    await Expect(country.Value).ToHaveTextAsync("UK");

    // Multiple option dropdown
    var types = new Dropdown(Page, "types");
    await types.SelectOption("Klant");
    await Expect(types.Value).ToHaveTextAsync("Klant");

    await types.SelectOption("Onderaannemer");
    await Expect(types.Value).ToContainTextAsync("Onderaannemer");
    await Expect(types.Values.First).ToHaveTextAsync("Klant");
    await Expect(types.Values.Last).ToHaveTextAsync("Onderaannemer");
  }

  // TODO: more examples in TypeScript ;)
  // For example:
  // - 5.pom.spec.auth.ts : Example of mocking the BTW lookup API
  // - 6.*.ts : Examples of SetUp & TearDown & Fixtures
  //   --> This is easier in NUnit -- just create a base class and add the code there!
}
