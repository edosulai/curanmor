<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;
use Storage;

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
            'nama_pelapor' => $this->faker->name,
            'nohp_pelapor' => $this->faker->phoneNumber,
            'nama_terlapor' => $this->faker->name,
            'jenis_perkara' => $this->faker->randomElement(['Pencurian', 'Penganiayaan', 'Pembunuhan', 'Pengancaman']),
            'jenis_laporan' => $this->faker->randomElement(['Laporan Polisi', 'Laporan Pengaduan']),
            'gambar_laporan' => $this->faker->image('public/storage/images', 400, 300, null, false),
            'no_laporan' => $this->faker->unique()->numerify("LP###/2023"),
            'waktu_melapor' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'waktu_kejadian' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'tkp' => $this->faker->address,
            'gambar_kerugian' => $this->faker->image('public/storage/images', 400, 300, null, false),
            'gambar_barang_bukti' => $this->faker->image('public/storage/images', 400, 300, null, false),
            'kronologis' => $this->faker->paragraph(4),
            'nama_penyidik' => $this->faker->name,
            'nama_penyidik_pembantu' => $this->faker->name,
            'perkembangan_perkara' => $this->faker->randomElement(['LIDIK', 'SIDIK', 'P19', 'P21']),
            'keterangan' => $this->faker->paragraph(4),
        ];
    }
}
