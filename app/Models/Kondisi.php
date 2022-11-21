<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kondisi extends Model
{
    protected $fillable = [
        'nama_kondisi'
    ];

    public function gigis()
    {
      return $this->belongsToMany('App\Models\Gigi')
                  ->withPivot('value')
                  ->withTimestamps();
    }
}
