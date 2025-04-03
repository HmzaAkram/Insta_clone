<?php

namespace App\Listeners;

use App\Events\MessageSent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\UserActivity;

class UpdateRecipientActivity
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageSent $event): void
    {
        $recipient = $event->message->recipient;
        
        // Update the recipient's last active timestamp
        $recipient->updateLastActive();
        
        // Broadcast the user activity event
        broadcast(new UserActivity($recipient))->toOthers();
    }
}

