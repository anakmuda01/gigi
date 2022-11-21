<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Set extends Model
{
    protected $fillable = [
        'InkjetA','InkjetB','InkjetC','InkjetD','posA','posB','posC','posD','posE',
        'jabatan','atas_nama','no_sip','kota','slogan','logo'
    ];
}
