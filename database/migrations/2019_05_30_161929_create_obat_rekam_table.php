<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateObatRekamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('obat_rekam', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('obat_id')->unsigned();
            $table->bigInteger('rekam_id')->unsigned();
            $table->integer('jumlah')->default(0);
            $table->text('cara_minum')->nullable();
            $table->timestamps();

            $table->foreign('obat_id')->references('id')
            ->on('obats')->onDelete('cascade');
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
        Schema::dropIfExists('obat_rekam');
    }
}
