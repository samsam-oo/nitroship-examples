import { json } from "@remix-run/node";

export function loader() {
  return json({
    framework: "remix",
    message: "Hello from the Remix server",
    generatedAt: new Date().toISOString(),
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
