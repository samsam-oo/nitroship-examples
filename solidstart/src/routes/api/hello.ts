export function GET() {
  return Response.json({
    framework: "solidstart",
    message: "Hello from the SolidStart server",
    serverTime: new Date().toISOString(),
  });
}
