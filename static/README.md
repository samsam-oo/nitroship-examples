# Static clean URLs

Plain HTML with no build step: `cleanUrls: true` publishes `about.html` at `/about`. The home page links to it.

From the examples repository root, run `python3 -m http.server 8000 --directory static` and open `http://localhost:8000/`. For this plain local server, open `http://localhost:8000/about.html` instead of `/about`; URL mapping happens at deployment.

Deploy from the repository root with `ntro deploy static --app <name>`. At the deployment URL, open `/` and follow the About link, or request `/about` directly (for example, `curl -i https://<deployment-host>/about`).

This is static HTML only: no functions, build step, or automatic custom `404.html` fallback. A plain local HTTP server does not implement Nitroship's clean-URL mapping.
