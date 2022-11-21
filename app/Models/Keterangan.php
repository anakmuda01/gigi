<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keterangan extends Model
{
    protected $fillable = [
        'gigi_id', 'isi_ket'
    ];

    public function gigi()
    {
      return $this->belongsTo('App\Models\Gigi')
                  ->withTimestamps();
    }
}
