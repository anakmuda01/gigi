<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rujukan extends Model
{
    protected $fillable = [
        'gigi_id','klinis','foto','protesa'
    ];

    public function gigi()
    {
      return $this->belongsTo('App\Models\Gigi');
    }

}
