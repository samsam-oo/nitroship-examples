import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/info", "routes/api.info.ts"),
] satisfies RouteConfig;
