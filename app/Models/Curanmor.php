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
        'no_laporan',
        'jenis_laporan',
        'hari_kejadian',
        'pelapor',
        'jenis_motor',
        'barang_bukti',
        'kronologis',
    ];
}
