<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', ['time' => now()->toIso8601String()]);
});

Route::get('/api/hello', function () {
    return response()->json([
        'message' => 'Nitroship Laravel',
        'time' => now()->toIso8601String(),
    ]);
});
