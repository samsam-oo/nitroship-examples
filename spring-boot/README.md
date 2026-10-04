# Spring Boot

A stock Spring Initializr Spring Boot 4.1 Maven web app with its Maven wrapper, a controller rendering request-time HTML at `/` and JSON at `/api/hello`, and a packaged `static/site.css`. Nitroship detects the Spring Boot dependency in `pom.xml`, builds the executable JAR with the managed container preset, and runs it on Compute. Spring serves the stylesheet from the JAR on Compute: this preset does not extract JAR resources to the CDN. No custom Dockerfile, Nitroship build configuration, secrets, or custom environment variables are required.

## Run locally

Requires Java 21 or later. From this directory:

```sh
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=3000
```

Open <http://localhost:3000/>. Nitroship's managed entrypoint sets the server port from `PORT` (default `3000`) and leaves Spring's default all-interface bind address unchanged.

## Deploy and verify

From the examples repository root, choose Compute regions during deployment:

```sh
ntro deploy spring-boot --app <app-name>
```

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/site.css
```

Expect `Spring Boot example` in the HTML and JSON `message`, a fresh UTC `serverTime` on each API request, and `spring-boot-example-asset` in the stylesheet. Temporary writes use `/tmp`; this example has no database or migrations.
