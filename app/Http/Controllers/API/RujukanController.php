<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;

use App\Models\Rujukan;
use App\Models\Sujuk;
use App\Models\Gigi;
use App\Models\Rekam;

class RujukanController extends Controller
{
    public function makeRujukan(Request $r){
        $exist = Rujukan::where('gigi_id', $r->id)->first();

        if($exist){
            $exist->update([
                'klinis' => $r->klinis,
                'foto' => $r->foto,
                'protesa' => $r->protesa,
            ]);

            return response()->json(['msg' => 'update']);
        }else{
            $rujuk = Rujukan::create([
                'gigi_id' => $r->id,
                'klinis' => $r->klinis,
                'foto' => $r->foto,
                'protesa' => $r->protesa,
            ]);

            $now = Carbon::now();

            $date = substr($now, 0,10);
            $time = substr($now, 12,8);
            $foo = explode('-',$date);
            $bar = explode(':',$time);
            $baz = join('',$bar);
            $no_sujuk = $foo[2].substr(2,4).'/'.$foo[1].''.$foo[0].'/SR-'.$baz;

            $ggi = Gigi::find($r->id);
    
            $ex = Sujuk::where('rekam_id',$ggi->rekam_id)->first();
            if(!$ex){
                $juk = Sujuk::create([
                    'rekam_id' => $ggi->rekam_id,
                    'no_rujukan' => $no_sujuk,
                    'tgl_rujukan' => $date,
                ]);
                return response()->json(['msg' => 'save']);
            }else{
                return response()->json(['msg' => 'save']);
            }

            return response()->json(['msg' => 'save']);
        }
    }

    public function hapusRujukan($id){

        $gi = Gigi::find($id);

        $rek = Rekam::find($gi->rekam_id);

        $arr = [];
        foreach($rek->gigis as $val){
            if($val->rujuk){
                array_push($arr, $val);
            }
        }

        if(count($arr) === 1){
            $juk = Sujuk::where('rekam_id', $gi->rekam_id)->first();
            $juk->delete();
        }

        $rujuk = Rujukan::where('gigi_id', $id)->first();

        $rujuk->delete();

        return response()->json(['msg' => 'rujuk deleted.']);
    }

    public function cekRujuk($rm){
        $rujuk = Rujukan::whereHas('gigi', function ($q) use ($rm) {
            $q->whereHas('rekam', function ($qe) use ($rm) {
                $qe->where('id',$rm);
            });
        })->get();

        if(count($rujuk) > 0){
            $now = Carbon::now();

            $date = substr($now, 0,10);
            $time = substr($now, 12,8);
            $foo = explode('-',$date);
            $bar = explode(':',$time);
            $baz = join('',$bar);
            $no_sujuk = $foo[2].substr(2,4).'/'.$foo[1].''.$foo[0].'/SR-'.$baz;
    
            $ex = Sujuk::where('rekam_id',$rm)->first();
            if(!$ex){
                $juk = Sujuk::create([
                    'rekam_id' => $rm,
                    'no_rujukan' => $no_sujuk,
                    'tgl_rujukan' => $date,
                ]);
                return response()->json(['jum'=> count($rujuk), 'surat'=> $juk]);
            }else{
                return response()->json(['jum'=> count($rujuk), 'surat'=> $ex]);
            }
        }
    }
    
}
