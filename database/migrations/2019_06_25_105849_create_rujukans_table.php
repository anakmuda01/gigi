<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRujukansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rujukans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('gigi_id')->unsigned();
            $table->string('klinis',180)->nullable();
            $table->string('foto',180)->nullable();
            $table->string('protesa',180)->nullable();
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
        Schema::dropIfExists('rujukans');
    }
}
