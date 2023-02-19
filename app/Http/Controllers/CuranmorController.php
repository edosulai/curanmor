<?php

namespace App\Http\Controllers;

use App\Models\Curanmor;
use App\Http\Requests\StoreCuranmorRequest;
use App\Http\Requests\UpdateCuranmorRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CuranmorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Curanmor/Index', [
            'data' => Curanmor::all(),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Curanmor/Form', [
            'title' => 'Tambah Curanmor',
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCuranmorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCuranmorRequest $request)
    {
        Curanmor::create([
            'nama_pasien' => $request->nama_pasien,
            'nama_kepala_keluarga' => $request->nama_kepala_keluarga,
            'no_kartu' => $request->no_kartu,
            'umur' => $request->umur,
            'alamat' => $request->alamat,
            'jenis_kelamin' => $request->jenis_kelamin,
            'status' => $request->status,
        ]);

        return redirect('curanmor');
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
        if (is_null($curanmor)) return abort(404);

        return Inertia::render('Curanmor/Form', [
            'title' => 'Edit Curanmor',
            'status' => session('status'),
            'curanmor' => $curanmor,
        ]);
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
        if (is_null($curanmor)) return abort(400);

        $curanmor->nama_pasien = $request->nama_pasien;
        $curanmor->nama_kepala_keluarga = $request->nama_kepala_keluarga;
        $curanmor->no_kartu = $request->no_kartu;
        $curanmor->umur = $request->umur;
        $curanmor->alamat = $request->alamat;
        $curanmor->jenis_kelamin = $request->jenis_kelamin;
        $curanmor->status = $request->status;
        $curanmor->save();

        return redirect()->route('curanmor')->with('status', 'Data Curanmor ' . $request->nama_pasien . ' Berhasil di Ubah');
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
        $curanmor->delete();

        return redirect()->route('curanmor')->with('status', 'Data Curanmor ' . $request->nama_pasien . ' Berhasil di Hapus');
    }
}
