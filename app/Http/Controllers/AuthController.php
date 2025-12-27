<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

function usernameToFullName(string $username): string
{
    $name = str_replace(['_', '.'], ' ', $username);
    // removing trailing numbers (like john99 to john)
    $name = preg_replace('/\d+$/', '', $name);
    $name = trim(preg_replace('/\s+/', ' ', $name));
    return Str::title($name);
}

class AuthController extends Controller
{
    public function login(){
        return Inertia::render('Login');
    }

    public function signup(){
        return Inertia::render('SignUp');
    }

    public function register(Request $request){
        $validated = $request->validate([
            "username" => [
                "required",
                "min:3",
                "max:20",
                "unique:users,username",
                "regex:/^[a-z0-9_.]+$/i",
            ],
            "email" => "required|email:rfc,dns|unique:users,email",
            "password" => "required|min:6|confirmed",
            "password_confirmation" => "required",
            "remember" => "sometimes|boolean"
        ], [
            "username.regex" => "Username can only contains alphanumeric characters, underscore (_), and dot (.)"
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            "full_name" => usernameToFullName($validated['username']),
        ]);

        $remember = $request->boolean('remember');
        Auth::login($user, $remember);

        return redirect('/onboarding');
    }

    public function authenticate(Request $request){
        $validator = $request->validate([
            "login" => "required",
            "password" => "required|min:6",
            "remember" => "sometimes|boolean",
        ]);

        $loginField = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $credentials = [
            $loginField => $request->login,
            'password' => $request->password
        ];

        $remember = $request->boolean('remember');

        if (!Auth::attempt($credentials, $remember)) {
            return back()->with('flash', [
                'type' => 'error', // three category yaa ada error, success, info
                'message' => 'The credentials do not match our records.',
            ]);
        }

        $user = Auth::user();
        $request->session()->regenerate();
        return redirect()->intended('/');
    }

    public function signOut(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
