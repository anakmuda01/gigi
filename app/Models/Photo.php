<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = [
        'rekam_id','nama_photo','path'
    ];

    public function rekam()
    {
      return $this->belongsTo('App\Models\Rekam');
    }

}
