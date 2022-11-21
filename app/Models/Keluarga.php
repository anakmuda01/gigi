<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keluarga extends Model
{
    protected $fillable = [
        'no_keluarga', 'nama_kepala'
    ];

    public function anggotas()
    {
      return $this->hasMany('App\Models\Anggota');
    }

}
