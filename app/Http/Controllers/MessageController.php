<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Events\MessageSent;
use App\Events\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Get conversations for the authenticated user.
     */
    public function getConversations(Request $request)
    {
        $user = $request->user();
        
        // Get users the authenticated user has exchanged messages with
        $sentMessages = Message::where('sender_id', $user->id)
            ->select('recipient_id as user_id')
            ->distinct();
            
        $receivedMessages = Message::where('recipient_id', $user->id)
            ->select('sender_id as user_id')
            ->distinct();
            
        $userIds = $sentMessages->union($receivedMessages)->pluck('user_id');
        
        $conversations = [];
        
        foreach ($userIds as $userId) {
            $otherUser = User::find($userId);
            
            // Get the last message between the two users
            $lastMessage = Message::where(function ($query) use ($user, $userId) {
                $query->where('sender_id', $user->id)
                    ->where('recipient_id', $userId);
            })->orWhere(function ($query) use ($user, $userId) {
                $query->where('sender_id', $userId)
                    ->where('recipient_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->first();
            
            // Count unread messages
            $unreadCount = Message::where('sender_id', $userId)
                ->where('recipient_id', $user->id)
                ->whereNull('read_at')
                ->count();
                
            $conversations[] = [
                'user' => $otherUser,
                'last_message' => $lastMessage,
                'unread_count' => $unreadCount,
            ];
        }
        
        // Sort conversations by last message time
        usort($conversations, function ($a, $b) {
            return $b['last_message']->created_at <=> $a['last_message']->created_at;
        });
        
        return response()->json([
            'conversations' => $conversations,
        ]);
    }

    /**
     * Get messages between the authenticated user and another user.
     */
    public function getMessages(Request $request, User $user)
    {
        $authUser = $request->user();
        
        // Get messages between the two users
        $messages = Message::where(function ($query) use ($authUser, $user) {
            $query->where('sender_id', $authUser->id)
                ->where('recipient_id', $user->id);
        })->orWhere(function ($query) use ($authUser, $user) {
            $query->where('sender_id', $user->id)
                ->where('recipient_id', $authUser->id);
        })
        ->orderBy('created_at', 'asc')
        ->get();
        
        // Mark messages as read
        Message::where('sender_id', $user->id)
            ->where('recipient_id', $authUser->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);
        
        return response()->json([
            'messages' => $messages,
        ]);
    }

    /**
     * Send a message to another user.
     */
    public function sendMessage(Request $request, User $recipient)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $sender = $request->user();
        
        // Prevent sending messages to yourself
        if ($sender->id === $recipient->id) {
            return response()->json([
                'message' => 'You cannot send messages to yourself',
            ], 400);
        }
        
        $message = Message::create([
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'content' => $request->content,
        ]);
        
        // Broadcast the message to the recipient
        broadcast(new MessageSent($message))->toOthers();
        
        // Update recipient's last active status and broadcast activity
        $recipient->updateLastActive();
        broadcast(new UserActivity($recipient))->toOthers();
        
        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message,
        ], 201);
    }

    /**
     * Mark messages as read.
     */
    public function markAsRead(Request $request, User $sender)
    {
        $recipient = $request->user();
        
        Message::where('sender_id', $sender->id)
            ->where('recipient_id', $recipient->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);
        
        return response()->json([
            'message' => 'Messages marked as read',
        ]);
    }
}

