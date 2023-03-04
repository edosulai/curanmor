<?php

namespace App\Http\Controllers;

use App\Models\Curanmor;
use App\Http\Requests\StoreCuranmorRequest;
use App\Http\Requests\UpdateCuranmorRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CuranmorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('Curanmor/Index', [
            'data' => Curanmor::select('*')->orderBy('created_at', 'desc')->get(),
            'status' => session('status'),
        ])->toResponse($request);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return Inertia::render('Curanmor/Form', [
            'title' => 'Tambah Curanmor',
            'status' => session('status'),
        ])->toResponse($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCuranmorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCuranmorRequest $request)
    {
        $gambar_laporan = $request->file('gambar_laporan');
        $gambar_kerugian = $request->file('gambar_kerugian');
        $gambar_barang_bukti = $request->file('gambar_barang_bukti');

        Curanmor::create([
            'nama_pelapor' => $request->nama_pelapor,
            'nohp_pelapor' => $request->nohp_pelapor,
            'nama_terlapor' => $request->nama_terlapor,
            'jenis_perkara' => $request->jenis_perkara,
            'jenis_laporan' => $request->jenis_laporan,
            'gambar_laporan' => $gambar_laporan ? basename($gambar_laporan->store('public/images')) : $gambar_laporan,
            'no_laporan' => $request->no_laporan,
            'waktu_melapor' => Carbon::parse($request->waktu_melapor)->toDateTimeString(),
            'waktu_kejadian' => Carbon::parse($request->waktu_kejadian)->toDateTimeString(),
            'tkp' => $request->tkp,
            'gambar_kerugian' => $gambar_kerugian ? basename($gambar_kerugian->store('public/images')) : $gambar_kerugian,
            'gambar_barang_bukti' => $gambar_barang_bukti ? basename($gambar_barang_bukti->store('public/images')) : $gambar_barang_bukti,
            'kronologis' => $request->kronologis,
            'nama_penyidik' => $request->nama_penyidik,
            'nama_penyidik_pembantu' => $request->nama_penyidik_pembantu,
            'perkembangan_perkara' => $request->perkembangan_perkara,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->route('dashboard', ['status' => 'Data Curanmor Berhasil di Tambahkan']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Curanmor  $curanmor
     * @return \Illuminate\Http\Response
     */
    public function show(Curanmor $curanmor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Curanmor  $curanmor
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Curanmor $curanmor)
    {
        $curanmor = $curanmor->find($request->id);
        if (is_null($curanmor))
            return abort(404);

        return Inertia::render('Curanmor/Form', [
            'title' => 'Edit Data Curanmor',
            'status' => session('status'),
            'perkara' => $curanmor,
        ])->toResponse($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCuranmorRequest  $request
     * @param  \App\Models\Curanmor  $curanmor
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCuranmorRequest $request, Curanmor $curanmor)
    {
        $curanmor = $curanmor->find($request->id);
        if (is_null($curanmor))
            return abort(400);

        $gambar_laporan = $request->file('gambar_laporan');
        $gambar_kerugian = $request->file('gambar_kerugian');
        $gambar_barang_bukti = $request->file('gambar_barang_bukti');

        $curanmor->nama_pelapor = $request->nama_pelapor;
        $curanmor->nohp_pelapor = $request->nohp_pelapor;
        $curanmor->nama_terlapor = $request->nama_terlapor;
        $curanmor->jenis_perkara = $request->jenis_perkara;
        $curanmor->jenis_laporan = $request->jenis_laporan;

        if ($gambar_laporan) {
            Storage::delete('public/images/' . $curanmor->gambar_laporan);
            $curanmor->gambar_laporan = basename($gambar_laporan->store('public/images'));
        }

        $curanmor->no_laporan = $request->no_laporan;
        $curanmor->waktu_melapor = Carbon::parse($request->waktu_melapor)->toDateTimeString();
        $curanmor->waktu_kejadian = Carbon::parse($request->waktu_kejadian)->toDateTimeString();
        $curanmor->tkp = $request->tkp;

        if ($gambar_kerugian) {
            Storage::delete('public/images/' . $curanmor->gambar_kerugian);
            $curanmor->gambar_kerugian = basename($gambar_kerugian->store('public/images'));
        }

        if ($gambar_barang_bukti) {
            Storage::delete('public/images/' . $curanmor->gambar_barang_bukti);
            $curanmor->gambar_barang_bukti = basename($gambar_barang_bukti->store('public/images'));
        }

        $curanmor->kronologis = $request->kronologis;
        $curanmor->nama_penyidik = $request->nama_penyidik;
        $curanmor->nama_penyidik_pembantu = $request->nama_penyidik_pembantu;
        $curanmor->perkembangan_perkara = $request->perkembangan_perkara;
        $curanmor->keterangan = $request->keterangan;
        $curanmor->save();

        return redirect()->route('dashboard', ['status' => 'Data Curanmor ' . $request->no_laporan . ' Berhasil di Ubah']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Curanmor  $curanmor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Curanmor $curanmor)
    {
        $validator = Validator::make(['id' => $request->id], [
            'id' => ['required', 'integer', 'exists:' . Curanmor::class . ',id'],
        ]);

        if ($validator->fails()) {
            return redirect("dashboard")
                ->withErrors($validator)
                ->withInput();
        }

        $curanmor = $curanmor->find($request->id);

        Storage::delete([
            'public/images/' . $curanmor->gambar_laporan,
            'public/images/' . $curanmor->gambar_kerugian,
            'public/images/' . $curanmor->gambar_barang_bukti,
        ]);

        $curanmor->delete();

        return redirect()->route('dashboard', ['status' => 'Data Curanmor ' . $curanmor->nama_pelapor . ' Berhasil di Hapus']);
    }
}
