<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suket extends Model
{
    protected $fillable = [
        'no_suket','anggota_id','from','to','kontrol','tgl_surat'
    ];

    public function anggota()
    {
      return $this->belongsTo('App\Models\Anggota')
                  ->withTimestamps();
    }
}
