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
            'gambar_laporan' => [File::types(['mp3', 'wav'])->min(1024)->max(12 * 1024)],
            'no_laporan' => ['string'],
            'waktu_melapor' => ['required', 'date'],
            'waktu_kejadian' => ['required', 'date'],
            'tkp' => ['string'],
            'gambar_kerugian' => [File::types(['mp3', 'wav'])->min(1024)->max(12 * 1024)],
            'gambar_barang_bukti' => [File::types(['mp3', 'wav'])->min(1024)->max(12 * 1024)],
            'kronologis' => ['string'],
            'nama_penyidik' => ['string'],
            'nama_penyidik_pembantu' => ['string'],
            'perkembangan_perkara' => ['required', Rule::in(['LIDIK', 'SIDIK', 'P19', 'P21'])],
            'keterangan' => ['string'],
        ];
    }
}
