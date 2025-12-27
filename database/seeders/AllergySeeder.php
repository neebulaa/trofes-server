<?php

namespace Database\Seeders;

use App\Models\Allergy;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AllergySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = database_path('seeders/data/allergy.csv');

        if (!file_exists($filePath) || !is_readable($filePath)) {
            throw new \Exception("CSV file not found or not readable at $filePath");
        }

        $csv = fopen($filePath, 'r');

        // Read header row
        $header = fgetcsv($csv);

        while (($row = fgetcsv($csv)) !== false) {            
            $data = array_combine($header, $row);

            Allergy::create([
                'allergy_code' => $data['allergy_code'],
                'allergy_name' => $data['allergy_name'],
                'examples' => $data['examples']
            ]);
        }

        fclose($csv);
    }
}
