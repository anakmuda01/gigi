<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tindak extends Model
{
    protected $fillable = [
        'nama_tindakan','biaya'
    ];

    public function gigis()
    {
      return $this->belongsToMany('App\Models\Gigi')
                  ->withTimestamps();
    }
}
