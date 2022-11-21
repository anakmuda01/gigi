<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGigiKondisiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gigi_kondisi', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('gigi_id')->unsigned();
            $table->bigInteger('kondisi_id')->unsigned();
            $table->boolean('value')->default(false);
            $table->timestamps();

            $table->foreign('gigi_id')->references('id')
            ->on('gigis')->onDelete('cascade');
            $table->foreign('kondisi_id')->references('id')
            ->on('kondisis')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gigi_kondisi');
    }
}
