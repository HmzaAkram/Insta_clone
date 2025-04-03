<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Toggle like for a post.
     */
    public function togglePostLike(Request $request, Post $post)
    {
        $user = $request->user();
        
        $like = $post->likes()->where('user_id', $user->id)->first();
        
        if ($like) {
            $like->delete();
            $message = 'Post unliked successfully';
            $liked = false;
        } else {
            $post->likes()->create([
                'user_id' => $user->id,
                'likeable_id' => $post->id,
                'likeable_type' => Post::class,
            ]);
            $message = 'Post liked successfully';
            $liked = true;
        }
        
        return response()->json([
            'message' => $message,
            'liked' => $liked,
            'likes_count' => $post->likes()->count(),
        ]);
    }

    /**
     * Toggle like for a comment.
     */
    public function toggleCommentLike(Request $request, Comment $comment)
    {
        $user = $request->user();
        
        $like = $comment->likes()->where('user_id', $user->id)->first();
        
        if ($like) {
            $like->delete();
            $message = 'Comment unliked successfully';
            $liked = false;
        } else {
            $comment->likes()->create([
                'user_id' => $user->id,
                'likeable_id' => $comment->id,
                'likeable_type' => Comment::class,
            ]);
            $message = 'Comment liked successfully';
            $liked = true;
        }
        
        return response()->json([
            'message' => $message,
            'liked' => $liked,
            'likes_count' => $comment->likes()->count(),
        ]);
    }

    /**
     * Get users who liked a post.
     */
    public function getPostLikes(Post $post)
    {
        $likes = $post->likes()->with('user')->paginate(20);
        
        return response()->json([
            'likes' => $likes,
        ]);
    }
}

