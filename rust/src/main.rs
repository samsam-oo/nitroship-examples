use std::io::{self, Read, Write};
use std::net::{TcpListener, TcpStream};
use std::time::{Duration, SystemTime, UNIX_EPOCH};

const CSS: &str = include_str!("../public/site.css");

fn respond(
    stream: &mut TcpStream,
    status: &str,
    content_type: &str,
    body: &str,
) -> io::Result<()> {
    write!(
        stream,
        "HTTP/1.1 {status}\r\nContent-Type: {content_type}\r\nContent-Length: {}\r\nConnection: close\r\n\r\n",
        body.len()
    )?;
    stream.write_all(body.as_bytes())
}

fn handle(mut stream: TcpStream) -> io::Result<()> {
    stream.set_read_timeout(Some(Duration::from_secs(10)))?;
    stream.set_write_timeout(Some(Duration::from_secs(10)))?;

    // Read only as far as the request line, with a fixed limit. HTTP clients
    // keep their write side open while awaiting a response, so do not await EOF.
    let mut request = [0_u8; 8192];
    let mut used = 0;
    let line_end = loop {
        if used == request.len() {
            return respond(
                &mut stream,
                "414 URI Too Long",
                "text/plain; charset=utf-8",
                "Request line too long\n",
            );
        }
        let count = stream.read(&mut request[used..])?;
        if count == 0 {
            return Ok(());
        }
        if let Some(offset) = request[used..used + count].iter().position(|&byte| byte == b'\n') {
            break used + offset;
        }
        used += count;
    };

    let line = match std::str::from_utf8(&request[..line_end]) {
        Ok(line) => line,
        Err(_) => {
            return respond(
                &mut stream,
                "400 Bad Request",
                "text/plain; charset=utf-8",
                "Invalid request line\n",
            );
        }
    };
    let mut parts = line.split_whitespace();
    let method = parts.next();
    let target = parts.next();
    let version = parts.next();
    if target.is_none()
        || !matches!(version, Some("HTTP/1.0" | "HTTP/1.1"))
        || parts.next().is_some()
    {
        return respond(
            &mut stream,
            "400 Bad Request",
            "text/plain; charset=utf-8",
            "Invalid request line\n",
        );
    }
    let path = target.unwrap().split('?').next().unwrap();
    let server_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(io::Error::other)?
        .as_secs();

    match (method, path) {
        (Some("GET"), "/") => {
            let html = format!(
                "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\">\
                 <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\
                 <title>Rust example</title><link rel=\"stylesheet\" href=\"/site.css\">\
                 </head><body><main><h1>Rust example</h1>\
                 <p>Request-time UNIX timestamp: <time>{server_time}</time></p>\
                 <p><a href=\"/api/hello\">JSON greeting</a></p>\
                 </main></body></html>\n"
            );
            respond(&mut stream, "200 OK", "text/html; charset=utf-8", &html)
        }
        (Some("GET"), "/api/hello") => {
            let json = format!("{{\"message\":\"Rust example\",\"serverTime\":{server_time}}}\n");
            respond(&mut stream, "200 OK", "application/json", &json)
        }
        (Some("GET"), "/site.css") => {
            respond(&mut stream, "200 OK", "text/css; charset=utf-8", CSS)
        }
        _ => respond(
            &mut stream,
            "404 Not Found",
            "text/plain; charset=utf-8",
            "Not found\n",
        ),
    }
}

fn main() -> io::Result<()> {
    let port = std::env::var("PORT").unwrap_or_else(|_| "3000".to_owned());
    let listener = TcpListener::bind(format!("0.0.0.0:{port}"))?;
    println!("Rust example listening on 0.0.0.0:{port}");
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                if let Err(error) = handle(stream) {
                    eprintln!("Request failed: {error}");
                }
            }
            Err(error) => eprintln!("Connection failed: {error}"),
        }
    }
    Ok(())
}
