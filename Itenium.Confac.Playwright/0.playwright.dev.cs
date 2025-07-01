using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using System.Text.RegularExpressions;

namespace Itenium.Confac.Playwright;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class PlaywrightDev : PageTest
{
  [Test]
  public async Task HasTitle()
  {
    await Page.GotoAsync("https://playwright.dev");
    await Expect(Page).ToHaveTitleAsync(new Regex("Playwright"));
  }

  [Test]
  public async Task GetStartedLink()
  {
    await Page.GotoAsync("https://playwright.dev");
    await Page.GetByRole(AriaRole.Link, new() { Name = "Get started" }).ClickAsync();
    await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Installation" })).ToBeVisibleAsync();
  }
}
