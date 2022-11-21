<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnggotasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anggotas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('keluarga_id')->unsigned();
            $table->string('no_rm',180);
            $table->string('nama_pasien',180);
            $table->string('tempat_lahir',180);
            $table->string('tanggal_lahir',180);
            $table->string('jenis_kelamin',1);
            $table->string('jenis_pasien',180);
            $table->string('pekerjaan',180);
            $table->string('no_hp',180);
            $table->string('id_telegram',180)->nullable();
            $table->string('status',180);
            $table->text('alamat');
            $table->timestamps();

            $table->foreign('keluarga_id')->references('id')
            ->on('keluargas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('anggotas');
    }
}
