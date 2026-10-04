var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/", () =>
{
    var serverTime = DateTimeOffset.UtcNow.ToString("O");
    return Results.Content($"""
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>.NET example</title>
          <link rel="stylesheet" href="/site.css">
        </head>
        <body>
          <main>
            <h1>.NET example</h1>
            <p>This HTML is rendered on the server for each request.</p>
            <p>Server UTC time: <time datetime="{serverTime}">{serverTime}</time></p>
            <p><a href="/api/hello">View the JSON API</a></p>
          </main>
        </body>
        </html>
        """, "text/html; charset=utf-8");
});

app.MapGet("/api/hello", () => Results.Json(new
{
    message = ".NET example",
    serverTime = DateTimeOffset.UtcNow
}));

app.Run();
