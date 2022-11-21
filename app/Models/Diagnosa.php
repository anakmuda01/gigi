<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diagnosa extends Model
{
    protected $fillable = [
        'nama_diagnosa'
    ];

    public function gigis()
    {
      return $this->belongsToMany('App\Models\Gigi')
                  ->withTimestamps();
    }
}
