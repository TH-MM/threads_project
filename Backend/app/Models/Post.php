<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Like;


class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'content'
    ];

        /**
         * Get the user that owns the Post
         *
         * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
         */
        public function user(): BelongsTo
        {
            return $this->belongsTo(User::class);
        }

        /**
         * Get all of the comments for the Post
         *
         * @return \Illuminate\Database\Eloquent\Relations\HasMany
         */
        public function likes(): HasMany
        {
            return $this->hasMany(Like::class);
        }
}
