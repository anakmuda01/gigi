<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kontrol extends Model
{
    protected $fillable = [
        'rekam_id', 'tgl_kontrol' ,'note'
    ];

    public function rekam()
    {
      return $this->belongsTo('App\Models\Rekam');
    }
}
