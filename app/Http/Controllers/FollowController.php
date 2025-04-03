<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    /**
     * Toggle follow for a user.
     */
    public function toggleFollow(Request $request, User $user)
    {
        $authUser = $request->user();
        
        // Prevent following yourself
        if ($authUser->id === $user->id) {
            return response()->json([
                'message' => 'You cannot follow yourself',
            ], 400);
        }
        
        $isFollowing = $authUser->following()->where('following_id', $user->id)->exists();
        
        if ($isFollowing) {
            $authUser->following()->detach($user->id);
            $message = 'User unfollowed successfully';
            $following = false;
        } else {
            $authUser->following()->attach($user->id);
            $message = 'User followed successfully';
            $following = true;
        }
        
        return response()->json([
            'message' => $message,
            'following' => $following,
            'followers_count' => $user->followers()->count(),
            'following_count' => $user->following()->count(),
        ]);
    }

    /**
     * Get followers for a user.
     */
    public function getFollowers(User $user)
    {
        $followers = $user->followers()->paginate(20);
        
        return response()->json([
            'followers' => $followers,
        ]);
    }

    /**
     * Get users that a user is following.
     */
    public function getFollowing(User $user)
    {
        $following = $user->following()->paginate(20);
        
        return response()->json([
            'following' => $following,
        ]);
    }
}

