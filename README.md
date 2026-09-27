# Nitroship examples

Small apps for trying [Nitroship](https://nitroship.co) and its **Deploy on Nitroship** button.
Each directory is an independent app; the button's `dir` parameter selects it.

| Example | What it exercises | Deploy |
|---|---|---|
| [`static`](static) | Plain static site, no build step | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/new/deploy?repo=samsam-oo/nitroship-examples&dir=static) |
| [`build-env`](build-env) | `build` command, `outputDirectory`, template env incl. a generated secret | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/new/deploy?repo=samsam-oo/nitroship-examples&dir=build-env) |

## Add the button to your own repository

```markdown
[![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/new/deploy?repo=<owner>/<repo>&ref=<branch>&dir=<subdirectory>)
```

`ref` and `dir` are optional. Describe the deploy form with a `template` block in `nitroship.json`:

```json
{
  "build": { "command": "node build.mjs", "outputDirectory": "dist" },
  "template": {
    "name": "My app",
    "description": "Shown on the deploy page",
    "env": [
      { "key": "GREETING", "description": "Text on the page", "default": "Hello" },
      { "key": "API_SECRET", "generate": "secret" }
    ]
  }
}
```

- `required: true` makes a variable mandatory; `secret: true` stores it encrypted and hides it.
- `generate: "secret"` pre-fills a random value and is always stored as a secret.
- `build.installCommand` / `build.command` replace the detected install and build commands; a root `Dockerfile` takes precedence over `build`.

## Deploy with the CLI instead

```bash
ntro login
ntro apps create my-static
ntro deploy static --app my-static
```
