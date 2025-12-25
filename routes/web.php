<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function(){
    return Inertia::render('Home');
});

Route::get('/search', function(){
    return Inertia::render('Searching');
});

Route::get('/guides', function(){
    return Inertia::render('Guides');
});

Route::get('/contact-us', function(){
    return Inertia::render('ContactUs');
});