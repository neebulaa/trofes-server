<?php

namespace App\Http\Controllers\Api;

use Inertia\Inertia;

use App\Models\Allergy;
use Illuminate\Http\Request;
use App\Models\DietaryPreference;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(){
        return Inertia::render('Profile', [
            'user' => Auth::user()->load(['dietaryPreferences', 'allergies',  'likedRecipes']),
            'dietaryPreferences' => DietaryPreference::all(),
            'allergies' => Allergy::all(),
        ]);
    }
}
