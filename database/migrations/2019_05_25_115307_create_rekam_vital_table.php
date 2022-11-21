<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRekamVitalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rekam_vital', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('rekam_id')->unsigned();
            $table->bigInteger('vital_id')->unsigned();
            $table->string('hasil',180)->nullable();
            $table->timestamps();

            $table->foreign('rekam_id')->references('id')
            ->on('rekams')->onDelete('cascade');
            $table->foreign('vital_id')->references('id')
            ->on('vitals')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rekam_vital');
    }
}
