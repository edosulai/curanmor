<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curanmor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_pelapor',
        'nohp_pelapor',
        'nama_terlapor',
        'jenis_perkara',
        'jenis_laporan',
        'gambar_laporan',
        'no_laporan',
        'waktu_melapor',
        'waktu_kejadian',
        'tkp',
        'gambar_kerugian',
        'gambar_barang_bukti',
        'kronologis',
        'nama_penyidik',
        'nama_penyidik_pembantu',
        'perkembangan_perkara',
        'keterangan',
    ];
}
