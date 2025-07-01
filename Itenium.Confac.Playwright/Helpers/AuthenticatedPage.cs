using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using System.Text.RegularExpressions;

namespace Itenium.Confac.Playwright.Helpers;

public class AuthenticatedPage : PageTest
{
  [SetUp]
  public async Task LoginAndRememberAuth()
  {
    await Page.GotoAsync("/");

    await Page.GetByTestId("name").FillAsync("Steven");
    await Page.GetByRole(AriaRole.Button, new PageGetByRoleOptions() { Name = "Confac Starten" }).ClickAsync();

    await Expect(Page).ToHaveTitleAsync(new Regex("Maandelijkse facturatie"));

    const string path = @"..\..\..\Playwright\.auth\user.json";
    await Context.StorageStateAsync(new BrowserContextStorageStateOptions() { Path = path });
  }

  public override BrowserNewContextOptions ContextOptions()
  {
    return new BrowserNewContextOptions()
    {
      //ColorScheme = ColorScheme.Light,
      //ViewportSize = new()
      //{
      //  Width = 600,
      //  Height = 500
      //},
      BaseURL = "http://localhost:3000",
    };
  }
}
