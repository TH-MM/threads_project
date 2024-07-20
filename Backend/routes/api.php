<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user()->load('posts');
});

Route::get('/posts', [PostController::class , 'index']);
// Route::get('/posts/create', [PostController::class , 'create']);
Route::post('/posts', [PostController::class , 'store']);
Route::put('/posts/{post}', [PostController::class , 'update']);
