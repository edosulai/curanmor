<?php

namespace App\Http\Controllers;

use App\Models\Curanmor;
use App\Http\Requests\StoreCuranmorRequest;
use App\Http\Requests\UpdateCuranmorRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        // Curanmor::create([
        //     'no_laporan' => $request->no_laporan,
        //     'jenis_laporan' => $request->jenis_laporan,
        //     'hari_kejadian' => Carbon::parse($request->hari_kejadian)->toDateTimeString(),
        //     'pelapor' => $request->pelapor,
        //     'jenis_motor' => $request->jenis_motor,
        //     'barang_bukti' => $request->barang_bukti,
        //     'kronologis' => $request->kronologis,
        // ]);

        // return redirect()->route('dashboard')->with('status', 'Data Curanmor Berhasil di Tambahkan');
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
            'data' => $curanmor,
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
        // $curanmor = $curanmor->find($request->id);
        // if (is_null($curanmor))
        //     return abort(400);

        // $curanmor->no_laporan = $request->no_laporan;
        // $curanmor->jenis_laporan = $request->jenis_laporan;
        // $curanmor->hari_kejadian = Carbon::parse($request->hari_kejadian)->toDateTimeString();
        // $curanmor->pelapor = $request->pelapor;
        // $curanmor->jenis_motor = $request->jenis_motor;
        // $curanmor->barang_bukti = $request->barang_bukti;
        // $curanmor->kronologis = $request->kronologis;
        // $curanmor->save();

        // return redirect()->route('dashboard')->with('status', 'Data Curanmor ' . $request->no_laporan . ' Berhasil di Ubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Curanmor  $curanmor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Curanmor $curanmor)
    {
        // $validator = Validator::make(['id' => $request->id], [
        //     'id' => ['required', 'integer', 'exists:' . Curanmor::class . ',id'],
        // ]);

        // if ($validator->fails()) {
        //     return redirect("dashboard")
        //         ->withErrors($validator)
        //         ->withInput();
        // }

        // $curanmor = $curanmor->find($request->id);
        // $curanmor->delete();

        // return redirect()->route('dashboard')->with('status', 'Data Curanmor ' . $request->no_laporan . ' Berhasil di Hapus');
    }
}
