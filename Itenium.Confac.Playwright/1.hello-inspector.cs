using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using System.Text.RegularExpressions;

namespace Itenium.Confac.Playwright;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class HelloInspector : PageTest
{
  [Test]
  public async Task WithoutSecurityCanLoginWithAnyUsername()
  {
    await Page.GotoAsync("http://localhost:3000");

    ILocator name = Page.GetByTestId("name");
    await Expect(name).ToHaveAttributeAsync("data-testid", "name");

    await name.FillAsync("Steven");
    await Page.GetByRole(AriaRole.Button, new PageGetByRoleOptions() { Name = "confac start" }).ClickAsync();

    await Expect(Page).ToHaveTitleAsync(new Regex("Maandelijkse facturatie"));
    await Page.WaitForFunctionAsync("localStorage.getItem('anonUser') === 'Steven'");
  }
}
