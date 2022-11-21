<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDiagnosaGigiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diagnosa_gigi', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('diagnosa_id')->unsigned();
            $table->bigInteger('gigi_id')->unsigned();
            $table->timestamps();

            $table->foreign('diagnosa_id')->references('id')
            ->on('diagnosas')->onDelete('cascade');
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
        Schema::dropIfExists('diagnosa_gigi');
    }
}
