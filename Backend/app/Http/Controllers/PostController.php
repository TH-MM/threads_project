<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(){
        // $posts = Post::orderBy('created_at', 'desc')->get();
        $posts = Post::with("user")->get();
        return response()->json(compact("posts"));
    }


    public function store(Request $request){
        $request->validate([
            'content' => 'max:255|required|string'
        ]);

        $post = new Post();
        $post->content = $request->content;
        $post->user_id = auth()->id();
        $post->save();

        return response()->json(["massage" => "Post Created Successfully" , "post" => $post] , 201);
    }

    public function update(Request $request , Post $post){
        $request->validate([
            'content' => 'max:255|required|string'
        ]);

        $post->content = $request->content;
        $post->save();

        return response()->json(["massage" => "Post Updated Successfully" , "post" => $post] , 201);
    }
}
