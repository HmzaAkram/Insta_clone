<?php

namespace App\Console\Commands;

use App\Models\Message;
use Illuminate\Console\Command;
use Carbon\Carbon;

class PruneOldMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'messages:prune {--days=90 : Number of days to keep messages}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prune old messages to optimize database size';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $days = $this->option('days');
        $cutoffDate = Carbon::now()->subDays($days);
        
        $count = Message::where('created_at', '<', $cutoffDate)->delete();
        
        $this->info("Successfully pruned {$count} messages older than {$days} days.");
        
        return Command::SUCCESS;
    }
}

