<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

use App\Models\Photo;
use App\Models\Rekam;
use App\Models\Anggota;

class PhotoController extends Controller
{

    private function sekarang()
    {
      $now = Carbon::now()->format('Y-m-d');

      return $now;
    }

    public function addPhoto(Request $r, $rm)
    {
        $x = $this->sekarang();
        $rek = Rekam::whereHas('anggota', function($q) use($rm){
            $q->where('no_rm',$rm);
        })->where('tgl_kunjungan','like','%'.$x.'%')->first();

        $slug = Str::slug($r->nama, '_');
        \Image::make($r->photo)->save(public_path('img/photo_gigi/'.$rm.'/'.$rek->tgl_kunjungan.'/').$slug.'.jpg');

        $foto = Photo::create([
            'rekam_id' => $rek->id,
            'nama_photo' => $r->nama,
            'path' => $rm.'/'.$rek->tgl_kunjungan.'/'.$slug.'.jpg'
        ]);

        return $foto;
    }

    public function photoRM($id)
    {
        $x = $this->sekarang();
        $rek = Rekam::whereHas('anggota', function($q) use($id){
            $q->where('no_rm', $id);
        })->where('tgl_kunjungan','like','%'.$x.'%')->first();

        $i = $rek->id;
        
        $fotos = Photo::where('rekam_id',$i)->latest()->get();

        return $fotos;
    }

    public function hapusPhoto($id){
        $foto = Photo::findorfail($id);
        $filename = public_path('img/photo_gigi/').$foto->path;
        if(file_exists($filename)){
            $deleted = unlink($filename);
            if($deleted){
                $foto->delete();
                return response()->json(['msg' => 'foto deleted']);
            }else{
                return response()->json(['msg' => 'fail deleted']);
            }
        }else{
             return response()->json(['msg' => 'foto not found']);
        }
    }
}
