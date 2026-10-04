# .NET example

A minimal ASP.NET Core 10 app with request-time HTML at `/`, JSON at `/api/hello`, and a linked stylesheet at `/site.css`. It uses only the shared framework, with no external packages.

[![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=dotnet)

## Run locally

Requires the .NET 10 SDK. From this directory:

```sh
PORT=3000 ASPNETCORE_URLS=http://0.0.0.0:3000 dotnet run --no-launch-profile
```

Open <http://localhost:3000/>. Each request renders the current UTC time; `/api/hello` returns `message` and `serverTime`. `UseStaticFiles` serves `wwwroot/site.css` locally.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy dotnet --app <name>
```

Or use the deploy button above and choose a Compute region. Nitroship detects the web project, publishes it with the managed .NET preset, and serves published `wwwroot` assets from the CDN. The app respects the preset's `ASPNETCORE_URLS` instead of setting its own listening address.

Replace `<deployed-host>` with the hostname printed by the deploy command:

```sh
curl -i https://<deployed-host>/
curl -i https://<deployed-host>/api/hello
curl -i https://<deployed-host>/site.css
```

Expect HTML identifying the .NET example with a fresh UTC timestamp, JSON containing `"message":".NET example"` and a UTC `serverTime`, and CSS containing the marker `dotnet-example-asset`. Request the HTML and API again to see the timestamp change.
