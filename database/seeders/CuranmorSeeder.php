<?php

namespace Database\Seeders;

use App\Models\Curanmor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CuranmorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Curanmor::factory(10)->create();
    }
}
