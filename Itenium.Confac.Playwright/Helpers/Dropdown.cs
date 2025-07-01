using Microsoft.Playwright;

namespace Itenium.Confac.Playwright.Helpers;

public class Dropdown
{
  private readonly ILocator _container;

  /// <summary>Returns a single element</summary>
  public ILocator Value => _container.Locator(".react-select__value-container");

  /// <summary>May return multiple elements</summary>
  public ILocator Values => _container.Locator(".react-select__single-value").Or(_container.Locator(".react-select__multi-value"));

  public Dropdown(IPage page, string key)
  {
    ILocator input = page.Locator(".react-select__input-container").GetByLabel(key);
    _container = page.Locator(".react-select__control").Filter(new LocatorFilterOptions() {Has = input});
  }

  public async Task SelectOption(string label)
  {
    await Toggle();

    await _container
      .Locator("..")
      .Locator(".react-select__option")
      .GetByText(label, new() { Exact = true })
      .ClickAsync();
  }

  private async Task Toggle()
  {
    await _container.Locator(".react-select__indicators").ClickAsync();
  }
}
