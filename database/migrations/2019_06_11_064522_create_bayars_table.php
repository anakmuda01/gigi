<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBayarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bayars', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('rekam_id')->unsigned();
            $table->string('no_nota',180)->nullable();
            $table->string('biaya',180)->nullable();
            $table->string('biaya_konsul',180)->nullable();
            $table->string('diskon',180)->nullable();
            $table->timestamps();


            $table->foreign('rekam_id')->references('id')
            ->on('rekams')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bayars');
    }
}
