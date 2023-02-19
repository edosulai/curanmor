<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'no_laporan' => ['required', 'string'],
            'jenis_laporan' => ['required', Rule::in(['Pencurian', 'Pembobolan'])],
            'hari_kejadian' => ['required', 'date'],
            'pelapor' => ['required', 'string'],
            'jenis_motor' => ['required', Rule::in(['Gigi', 'Matic', 'Kopling'])],
            'barang_bukti' => ['required'],
            'kronologis' => ['required'],
        ];
    }
}
