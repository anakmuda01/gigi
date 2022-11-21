<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('InkjetA',180)->nullable();
            $table->string('InkjetB',180)->nullable();
            $table->string('InkjetC',180)->nullable();
            $table->string('InkjetD',180)->nullable();
            $table->string('posA',180)->nullable();
            $table->string('posB',180)->nullable();
            $table->string('posC',180)->nullable();
            $table->string('posD',180)->nullable();
            $table->string('posE',180)->nullable();
            $table->string('jabatan',180)->nullable();
            $table->string('atas_nama',180)->nullable();
            $table->string('no_sip',180)->nullable();
            $table->string('kota',180)->nullable();
            $table->string('slogan',180)->nullable();
            $table->string('logo',180)->nullable();
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
        Schema::dropIfExists('sets');
    }
}
