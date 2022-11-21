<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGigisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gigis', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('rekam_id')->unsigned();
            $table->string('no_gigi',180);
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
        Schema::dropIfExists('gigis');
    }
}
