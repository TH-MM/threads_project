<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function likePost($postId)
    {
        $user = auth()->id();
        $post = Post::find($postId);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $liked = Like::where('user_id', $user)->where('post_id', $post->id)->first();

        if ($liked) {
            $post->decrement("likes_count");
            $liked->delete();
            return response()->json(['message' => "Post Unliked Successfully"]);
        } else {
            $post->increment('likes_count');
            $like = new Like();
            $like->user_id = $user;
            $like->post_id = $post->id;
            $like->save();
            return response()->json(['message' => "Post Liked Successfully"]);
        }

    }
}
