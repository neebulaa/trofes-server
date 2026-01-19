<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Carbon\Carbon;

class NutrientsCalculatorController extends Controller
{
    public function index(){
        // get user age by using the birth_date attribute in users table
        $user_age = null;
        if(auth()->check() && auth()->user()->birth_date){
            $user_age = Carbon::parse(auth()->user()->birth_date)->age;
        }

        return Inertia::render('NutrientsCalculator', [
            'recommended_recipes' => Recipe::inRandomOrder()->limit(5)->get(),
            "user_age" => $user_age,
        ]);
    }
}
