<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
    
    protected $primaryKey = 'recipe_ingredient_id';
    public $timestamps = false;
    protected $guarded = ['recipe_ingredient_id'];
}
