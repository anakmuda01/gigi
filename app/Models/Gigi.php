<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gigi extends Model
{

    protected $fillable = [
      'rekam_id','no_gigi'
    ];

    public function rekam()
    {
      return $this->belongsTo('App\Models\Rekam');
    }

    public function kondisis()
    {
      return $this->belongsToMany('App\Models\Kondisi')
                  ->withPivot('value')
                  ->withTimestamps();
    }

    public function diags()
    {
      return $this->belongsToMany('App\Models\Diagnosa')
                  ->withTimestamps();
    }

    public function tindaks()
    {
      return $this->belongsToMany('App\Models\Tindak')
                  ->withTimestamps();
    }

    public function rujuk()
    {
      return $this->hasOne('App\Models\Rujukan');
    }

    public function ket()
    {
      return $this->hasOne('App\Models\Keterangan');
    }
}
