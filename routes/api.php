<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    
    // Post routes
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{post}', [PostController::class, 'show']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    Route::get('/explore', [PostController::class, 'explore']);
    Route::get('/users/{user}/posts', [PostController::class, 'userPosts']);
    
    // Comment routes
    Route::get('/posts/{post}/comments', [CommentController::class, 'index']);
    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
    
    // Like routes
    Route::post('/posts/{post}/like', [LikeController::class, 'togglePostLike']);
    Route::post('/comments/{comment}/like', [LikeController::class, 'toggleCommentLike']);
    Route::get('/posts/{post}/likes', [LikeController::class, 'getPostLikes']);
    
    // Follow routes
    Route::post('/users/{user}/follow', [FollowController::class, 'toggleFollow']);
    Route::get('/users/{user}/followers', [FollowController::class, 'getFollowers']);
    Route::get('/users/{user}/following', [FollowController::class, 'getFollowing']);
    
    // Message routes
    Route::get('/conversations', [MessageController::class, 'getConversations']);
    Route::get('/messages/{user}', [MessageController::class, 'getMessages']);
    Route::post('/messages/{recipient}', [MessageController::class, 'sendMessage']);
    Route::post('/messages/{sender}/read', [MessageController::class, 'markAsRead']);
});

