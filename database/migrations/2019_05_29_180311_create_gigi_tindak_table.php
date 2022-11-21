<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGigiTindakTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gigi_tindak', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('gigi_id')->unsigned();
            $table->bigInteger('tindak_id')->unsigned();
            $table->timestamps();

            $table->foreign('gigi_id')->references('id')
            ->on('gigis')->onDelete('cascade');
            $table->foreign('tindak_id')->references('id')
            ->on('tindaks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gigi_tindak');
    }
}
