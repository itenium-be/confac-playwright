namespace Itenium.Confac.Playwright.Models;

public class Role
{
  public string Name { get; set; }
  public string[] Claims { get; set; }

  public Role(string name, params string[] claims)
  {
    Name = name;
    Claims = claims;
  }

  public override string ToString() => Name;
}
