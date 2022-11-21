<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bayar extends Model
{

    protected $fillable = [
        'rekam_id','no_nota','biaya','biaya_konsul','diskon'
    ];

    public function rekam()
    {
      return $this->belongsTo('App\Models\Rekam');
    }

}
