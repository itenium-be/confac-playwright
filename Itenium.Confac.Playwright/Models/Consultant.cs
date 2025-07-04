namespace Itenium.Confac.Playwright.Models;

public class Consultant
{
  public string Name { get; set; } = "";
  public string FirstName { get; set; } = "";
  public string Slug { get; set; } = "";
  public string Type { get; set; } = "";
  public string Email { get; set; } = "";
  public string Telephone { get; set; } = "";
  public bool Active { get; set; }
  public string AccountingCode { get; set; } = "";

  public Consultant(string name, string firstName, bool active = true)
  {
    Name = name;
    FirstName = firstName;
    Slug = $"{firstName}-{name}".ToLowerInvariant();
    Email = Slug.Replace("-", ".") + "@itenium.be";
    Active = active;
    Type = "Consultant";
  }

  //  "audit" : {
  //    "modifiedOn" : "2025-05-18T16:12:53.382Z",
  //    "modifiedBy" : "5ed0f53cf06c3bd4675078d6"
  //  },
}
