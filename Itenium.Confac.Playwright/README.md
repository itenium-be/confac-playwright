Itenium.Confac.Playwright
=========================

## Run Tests

```ps1
dotnet build
dotnet test

# Run in Chrome
dotnet test --settings test.runsettings

# or from the CLI:
$env:HEADED="1"
dotnet test

# Debugging
$env:PWDEBUG=1
dotnet test

# Generate NUnit tests
./bin/Debug/net9.0/playwright.ps1 codegen http://localhost:3000
```

## Tracing

```c#
public class Tests : PageTest
{
    [SetUp]
    public async Task Setup()
    {
        await Context.Tracing.StartAsync(new()
        {
            Title = $"{TestContext.CurrentContext.Test.ClassName}.{TestContext.CurrentContext.Test.Name}",
            Screenshots = true,
            Snapshots = true,
            Sources = true
        });
    }

    [TearDown]
    public async Task TearDown()
    {
        await Context.Tracing.StopAsync(new()
        {
            Path = Path.Combine(
                TestContext.CurrentContext.WorkDirectory,
                "playwright-traces",
                $"{TestContext.CurrentContext.Test.ClassName}.{TestContext.CurrentContext.Test.Name}.zip"
            )
        });
    }

    [Test]
    public async Task GetStartedLink()
    {
        // ..
    }
}
```


```ps1
./bin/Debug/net9.0/playwright.ps1 show-trace bin/Debug/net9.0/playwright-traces/Itenium.Confac.Playwright.GetStartedLink.zip
```



## Initial Setup

```ps1
dotnet new nunit -n Itenium.Confac.Playwright
cd Itenium.Confac.Playwright
dotnet add package Microsoft.Playwright.NUnit
```
