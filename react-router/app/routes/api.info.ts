export function loader() {
  return Response.json({
    framework: "react-router",
    serverTime: new Date().toISOString(),
  });
}
