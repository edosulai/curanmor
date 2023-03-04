<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class StoreCuranmorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nama_pelapor' => ['required', 'string'],
            'nohp_pelapor' => ['required', 'string'],
            'nama_terlapor' => ['required', 'string'],
            'jenis_perkara' => ['required', Rule::in(['Pencurian', 'Penganiayaan', 'Pembunuhan', 'Pengancaman'])],
            'jenis_laporan' => ['required', Rule::in(['Laporan Polisi', 'Laporan Pengaduan'])],
            'gambar_laporan' => ['nullable', File::types(['jpg', 'jpeg', 'png'])->min(1)->max(5 * 1024 * 1024)],
            'no_laporan' => ['nullable', 'string'],
            'waktu_melapor' => ['required', 'date'],
            'waktu_kejadian' => ['required', 'date'],
            'tkp' => ['nullable', 'string'],
            'gambar_kerugian' => ['nullable', File::types(['jpg', 'jpeg', 'png'])->min(1)->max(5 * 1024 * 1024)],
            'gambar_barang_bukti' => ['nullable', File::types(['jpg', 'jpeg', 'png'])->min(1)->max(5 * 1024 * 1024)],
            'kronologis' => ['nullable', 'string'],
            'nama_penyidik' => ['nullable', 'string'],
            'nama_penyidik_pembantu' => ['nullable', 'string'],
            'perkembangan_perkara' => ['required', Rule::in(['LIDIK', 'SIDIK', 'P19', 'P21'])],
            'keterangan' => ['nullable', 'string'],
        ];
    }
}
