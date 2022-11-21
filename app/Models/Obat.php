<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Obat extends Model
{
    protected $fillable = [
        'nama_obat', 'satuan'
    ];

    public function rekams()
    {
      return $this->belongsToMany('App\Models\Rekam')
                  ->withPivot(['jumlah','cara_minum'])
                  ->withTimestamps();
    }
}
