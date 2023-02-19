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
            $table->string('no_laporan');
            $table->enum('jenis_laporan', ['Pencurian', 'Pembobolan']);
            $table->dateTime('hari_kejadian');
            $table->string('pelapor');
            $table->enum('jenis_motor', ['Gigi', 'Matic', 'Kopling']);
            $table->text('barang_bukti');
            $table->text('kronologis');
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
