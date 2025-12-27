<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        User::create([
            "full_name" => "Admin 7DS",
            "password" => "sevendeadlysins",
            "username" => "sevendeadlysins",
            "email" => "sevendeadlysins@gmail.com",
            "phone" => "089694636303",
            "bio" => "There is no mercy for light",
            "birth_date" => "2006-03-18",
            
            "is_admin" => true
        ]);
        $this->call([
            GuideSeeder::class,
            AllergySeeder::class,
            DietaryPreferenceSeeder::class,
            IngredientSeeder::class,
            RecipeSeeder::class,
            RecipeIngredientSeeder::class,
            RecipeAllergySeeder::class,
            RecipeDietaryPreferenceSeeder::class,
        ]);
    }
}
