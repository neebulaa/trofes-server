<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardAllergyController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Allergies/Index');
    }
}
