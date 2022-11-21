<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSuketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sukets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('anggota_id')->unsigned();
            $table->string('no_suket',180);
            $table->string('from',180);
            $table->string('to',180);
            $table->string('kontrol',180);
            $table->string('tgl_surat',180);
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
        Schema::dropIfExists('sukets');
    }
}
