<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vital extends Model
{
    protected $fillable = [
        'nama_vital'
    ];

    public function rekams()
    {
      return $this->belongsToMany('App\Models\Rekam')
                  ->withPivot('hasil')
                  ->withTimestamps();
    }
}
