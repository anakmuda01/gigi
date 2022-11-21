<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

class Anggota extends Model
{

    protected $fillable =
    [
      'keluarga_id', 'nama_pasien', 'tempat_lahir', 'tanggal_lahir','jenis_kelamin','status', 'no_hp', 'no_rm','alamat','pekerjaan','jenis_pasien','id_telegram'
    ];

    public function keluarga()
    {
      return $this->belongsTo('App\Models\Keluarga');
    }

    public function rekams()
    {
      return $this->hasMany('App\Models\Rekam');
    }

    public function sukets()
    {
      return $this->hasMany('App\Models\Suket');
    }

    public function age() {
      $tgl=$this->tanggal_lahir;
      
      $dbDate = Carbon::parse($tgl);
      // $diffYears = Carbon::now()->diffInMonths($dbDate);

      $foo = $dbDate->diff(Carbon::now())->format('%y-%m-%d');

      return $foo;
    }

    public function tinyAge(){
      $tgl=$this->tanggal_lahir;
      $dbDate = Carbon::parse($tgl);
      $diffYears = Carbon::now()->diffInMonths($dbDate);

      $foo = $dbDate->diff(Carbon::now())->format('%yth/%mbl/%dhr');

      return $foo;
    }

    public function lahir(){
      $tgl=$this->tanggal_lahir;
      $dbDate = Carbon::parse($tgl)->format('d M Y');

      return $dbDate;
    }
}
