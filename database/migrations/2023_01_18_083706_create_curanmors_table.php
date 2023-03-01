<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('curanmors', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pelapor');
            $table->string('nohp_pelapor');
            $table->string('nama_terlapor');
            $table->enum('jenis_perkara', ['Pencurian', 'Penganiayaan', 'Pembunuhan', 'Pengancaman']);
            $table->enum('jenis_laporan', ['Laporan Polisi', 'Laporan Pengaduan']);
            $table->string('gambar_laporan')->nullable();
            $table->string('no_laporan')->nullable();
            $table->dateTime('waktu_melapor');
            $table->dateTime('waktu_kejadian');
            $table->text('tkp')->nullable();
            $table->string('gambar_kerugian')->nullable();
            $table->string('gambar_barang_bukti')->nullable();
            $table->text('kronologis')->nullable();
            $table->string('nama_penyidik')->nullable();
            $table->string('nama_penyidik_pembantu')->nullable();
            $table->enum('perkembangan_perkara', ['LIDIK', 'SIDIK', 'P19', 'P21']);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('statuses');
    }
};
