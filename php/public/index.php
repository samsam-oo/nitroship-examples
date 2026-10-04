<?php
declare(strict_types=1);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$time = gmdate('Y-m-d\TH:i:s\Z');
header('Cache-Control: no-store');
if ($path === '/api/hello') {
    header('Content-Type: application/json');
    echo json_encode(['framework' => 'php', 'message' => 'Hello from PHP Compute', 'serverTime' => $time], JSON_THROW_ON_ERROR);
    exit;
}
if ($path !== '/') {
    http_response_code(404);
    echo 'Not found';
    exit;
}
header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>PHP on Nitroship</title><link rel="stylesheet" href="/site.css"></head>
<body><main><h1>PHP on Nitroship</h1><p>Request-time UTC timestamp: <time><?= htmlspecialchars($time, ENT_QUOTES, 'UTF-8') ?></time></p><a href="/api/hello">JSON greeting</a></main></body></html>
