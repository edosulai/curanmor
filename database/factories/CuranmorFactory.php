<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Curanmor>
 */
class CuranmorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'no_laporan' => $this->faker->unique()->randomNumber(8),
            'jenis_laporan' => $this->faker->randomElement(['Pencurian', 'Pembobolan']),
            'hari_kejadian' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'pelapor' => $this->faker->name,
            'jenis_motor' => $this->faker->randomElement(['Gigi', 'Matic', 'Kopling']),
            'barang_bukti' => $this->faker->paragraph(2),
            'kronologis' => $this->faker->paragraph(4),
        ];
    }
}
