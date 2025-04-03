<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index(Request $request)
    {
        // Get posts from users the authenticated user is following
        $user = $request->user();
        $followingIds = $user->following()->pluck('users.id')->toArray();
        
        // Add the user's own id to see their posts too
        $followingIds[] = $user->id;
        
        $posts = Post::whereIn('user_id', $followingIds)
            ->with(['user', 'comments.user', 'likes'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return response()->json([
            'posts' => $posts,
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'caption' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
            'location' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();
        
        // Upload image to Cloudinary
        $image = $request->file('image');
        $imageUrl = $this->uploadToCloudinary($image);
        
        $post = Post::create([
            'user_id' => $user->id,
            'caption' => $request->caption,
            'image_url' => $imageUrl,
            'location' => $request->location,
        ]);
        
        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post->load('user'),
        ], 201);
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        $post->load(['user', 'comments.user', 'likes.user']);
        
        return response()->json([
            'post' => $post,
        ]);
    }

    /**
     * Update the specified post.
     */
    public function update(Request $request, Post $post)
    {
        // Check if the authenticated user owns the post
        if ($request->user()->id !== $post->user_id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }
        
        $validator = Validator::make($request->all(), [
            'caption' => 'nullable|string',
            'location' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $post->update($request->only(['caption', 'location']));
        
        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post,
        ]);
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Request $request, Post $post)
    {
        // Check if the authenticated user owns the post
        if ($request->user()->id !== $post->user_id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }
        
        // Delete the image from Cloudinary
        $this->deleteFromCloudinary($post->image_url);
        
        $post->delete();
        
        return response()->json([
            'message' => 'Post deleted successfully',
        ]);
    }

    /**
     * Get posts for the explore page.
     */
    public function explore(Request $request)
    {
        $posts = Post::with(['user', 'likes'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);
        
        return response()->json([
            'posts' => $posts,
        ]);
    }

    /**
     * Get posts for a specific user.
     */
    public function userPosts(Request $request, $userId)
    {
        $posts = Post::where('user_id', $userId)
            ->with(['user', 'likes'])
            ->orderBy('created_at', 'desc')
            ->paginate(12);
        
        return response()->json([
            'posts' => $posts,
        ]);
    }

    /**
     * Upload a file to Cloudinary.
     */
    private function uploadToCloudinary($file)
    {
        // In a real application with Cloudinary SDK:
        // $uploadedFile = Cloudinary::upload($file->getRealPath(), [
        //     'folder' => 'instagram_clone/posts',
        // ]);
        // return $uploadedFile->getSecurePath();
        
        // For this example, we'll simulate the upload and return a URL
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('public/posts', $filename);
        
        return url('storage/posts/' . $filename);
    }

    /**
     * Delete a file from Cloudinary.
     */
    private function deleteFromCloudinary($url)
    {
        // In a real application with Cloudinary SDK:
        // Extract the public ID from the URL
        // $publicId = /* extract from URL */;
        // Cloudinary::destroy($publicId);
        
        // For this example, we'll just simulate the deletion
        // No action needed for local storage in this example
    }
}

