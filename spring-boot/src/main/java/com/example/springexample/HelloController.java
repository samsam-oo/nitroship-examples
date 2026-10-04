package com.example.springexample;

import java.time.Instant;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping(value = "/", produces = "text/html; charset=utf-8")
    public String home() {
        return """
            <!doctype html><html lang="en"><head><meta charset="utf-8">
            <title>Spring Boot example</title><link rel="stylesheet" href="/site.css">
            </head><body><main><h1>Spring Boot example</h1>
            <p>Request-time UTC timestamp: <time>%s</time></p>
            <p><a href="/api/hello">JSON greeting</a></p></main></body></html>
            """.formatted(Instant.now());
    }

    @GetMapping("/api/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Spring Boot example", "serverTime", Instant.now().toString());
    }
}
