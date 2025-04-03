<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Events\UserActivity;

class UpdateUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        if ($request->user()) {
            $user = $request->user();
            $user->updateLastActive();
            
            // Broadcast user activity
            broadcast(new UserActivity($user))->toOthers();
        }
        
        return $response;
    }
}

