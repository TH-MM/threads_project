<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function users($username){
        $user = User::with(['posts' => function($query){ $query->with('likes')->orderBy('created_at', 'desc'); }])->where('username', $username)->first();
    
    if ($user) {
        // Return the user data as JSON response
        return response()->json(['user' => $user]);
    } else {
        // Return a 404 error if user not found
        return response()->json(['error' => 'User not found'], 404);
    }
    }

    public function update(Request $request)
    {
       
        if(auth()->user()->username != $request->username){
            $request->validate([
                'name' => 'required|string|max:255',
                'username' => ['required', 'string', 'max:255' ,'regex:/^[a-zA-Z0-9._]+$/' , "unique:users"],
                'bio' => 'nullable|string|max:300',
                'website' => 'nullable|string|max:255|url',
                'profile_picture' => 'file|mimes:jpeg,png,pdf|max:2048',
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            ]);
        }else{
            $request->validate([
                'name' => 'required|string|max:255',
                'username' => ['required', 'string', 'max:255' ,'regex:/^[a-zA-Z0-9._]+$/'],
                'bio' => 'nullable|string|max:300',
                'website' => 'nullable|string|max:255|url',
                'profile_picture' => 'file|mimes:jpeg,png,pdf|max:2048',
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            ]);
        }



       
        $user = User::findOrFail(auth()->id());

         // Handle the file upload
         if ($request->hasFile('profile_picture')) {
            // Delete the old profile picture if it exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            // Save the new profile picture with a consistent name
            $file = $request->file('profile_picture');
            $filename = 'profile_picture_user_' . $user->username . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('profile/images', $filename, 'public');
            $user->profile_picture = $path;
        }


        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->bio = $request->bio;
        $user->website = $request->website;
        
        $user->save();

        return response()->json(["message" => "User Updated Successfully", "user" => $user]);
    }
}
