<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRekamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rekams', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('anggota_id')->unsigned();
            $table->string('tgl_kunjungan',180);
            $table->string('tgl_indo',180);
            $table->string('keluhan',180);
            $table->string('status',180)->default('Pending');
            $table->string('status_bayar',180)->default('Belum');
            $table->string('tahun_k',180);
            $table->string('bulan_k',180);
            $table->string('hari_k',180);
            $table->timestamps();

            $table->foreign('anggota_id')->references('id')
            ->on('anggotas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rekams');
    }
}
