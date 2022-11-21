<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKeterangansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('keterangans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('gigi_id')->unsigned();
            $table->text('isi_ket')->nullable();
            $table->timestamps();


            $table->foreign('gigi_id')->references('id')
            ->on('gigis')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('keterangans');
    }
}
