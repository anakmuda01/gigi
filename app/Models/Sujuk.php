<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sujuk extends Model
{
    protected $fillable = [
        'rekam_id','no_rujukan','tgl_rujukan'
    ];

    public function rekam()
    {
      return $this->belongsTo('App\Models\Rekam');
    }
}
