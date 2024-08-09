<?php

use App\Http\Controllers\LikeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Models\Like;
use App\Models\Post;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user()->load(['posts' => function ($query) {
        $query->with('likes')->orderBy('created_at', 'desc');
    }]);
});

Route::get('/posts', [PostController::class, 'index']);
// Route::get('/posts/create', [PostController::class , 'create']);
Route::post('/posts', [PostController::class, 'store']);
Route::put('/posts/{post}', [PostController::class, 'update']);
Route::post('/user/profile/edit', [UserController::class, 'update']);
Route::get("/users/{username}", [UserController::class, 'users']);
Route::get("/post/like/{postId}", [LikeController::class, 'likePost']);
Route::get("/likes", [LikeController::class, 'likes']);





// Route::post('/upload', function (Request $request) {
//     // Validate the request
//     $request->validate([
//         'file' => 'required|file|mimes:jpeg,png,pdf|max:2048', // Adjust validation rules as needed
//     ]);

//     // Handle the file upload
//     if ($request->hasFile('file')) {
//         $file = $request->file('file');
//         $path = $file->store('uploads', 'public'); // Save the file to storage/app/public/uploads

//         // Return a response with the file path
//         return response()->json(['path' => $path], 200);
//     }

//     return response()->json(['error' => 'No file uploaded'], 400);
// });
