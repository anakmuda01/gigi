<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rekam extends Model
{
    protected $fillable = [
        'anggota_id', 'tgl_kunjungan','tgl_indo','keluhan','status','status_bayar','hari_k','bulan_k','tahun_k'
    ];

    public function anggota()
    {
      return $this->belongsTo('App\Models\Anggota');
    }

    public function vitals()
    {
      return $this->belongsToMany('App\Models\Vital')
                  ->withPivot('hasil')
                  ->withTimestamps();
    }

    public function gigis()
    {
      return $this->hasMany('App\Models\Gigi');
    }

    public function photos()
    {
      return $this->hasMany('App\Models\Photo');
    }


    public function obats()
    {
      return $this->belongsToMany('App\Models\Obat')
                  ->withPivot(['jumlah','cara_minum'])
                  ->withTimestamps();
    }

    public function bayar()
    {
      return $this->hasOne('App\Models\Bayar');
    }

    public function sujuk()
    {
      return $this->hasOne('App\Models\Sujuk');
    }

    public function kontrol()
    {
      return $this->hasOne('App\Models\Kontrol');
    }
}
