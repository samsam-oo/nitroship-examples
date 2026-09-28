# Static image optimization

A static site with a local 960×540 PNG and no build step. `images.protocol: "ipx"` enables Nitroship Edge resizing and format conversion; `remotePatterns` permits HTTPS images from Wikimedia Commons under `/wikipedia/commons/`. Other remote sources are not permitted.

## Run locally

From this directory, run `python3 -m http.server 8000` and open `http://localhost:8000/`. The original `/photo.png` loads locally, but the `/_ipx/` URLs require Nitroship's Edge and will not work on a plain file server.

## Deploy and try it

From the repository root, run `ntro deploy static-images --app <name>`, or use the Deploy on Nitroship button. At the deployed URL, compare the four images and inspect their response `Content-Type` and dimensions:

```sh
curl -I "https://<your-deployment>/photo.png"
curl -I "https://<your-deployment>/_ipx/w_240,f_png/photo.png"
curl -I "https://<your-deployment>/_ipx/w_480,f_webp/photo.png"
curl -I "https://<your-deployment>/_ipx/w_640,f_avif/photo.png"
```

The page also links to one allowlisted Wikimedia Commons image transformed to WebP. For `ipx`, unspecified widths are allowed from 1 to 4096 pixels; this example uses explicit widths and formats. Image transformations and remote fetches depend on the deployed Edge, not the local static server.
