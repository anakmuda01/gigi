<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;
use App\Models\Rekam;
use App\Models\Bayar;
use App\Models\Tindak;

class BayarController extends Controller
{
    private function sekarang()
    {
      $now = Carbon::now()->format('Y-m-d');

      return $now;
    }

    public function index(){
        $x = $this->sekarang();
        $reks = Rekam::with(['anggota','bayar','gigis.tindaks','bayar','kontrol'])
                ->where([
                  ['tgl_kunjungan','like','%'.$x.'%'],
                  ['status','Selesai']
                ])->get();

        return $reks;
    }

    public function diskon(Request $r, $id){
      $pay = Bayar::where('rekam_id',$id)->first();

      $pay->update([
        'diskon' => $r->disc
      ]);

      return response()->json(['msg'=>'Berhasil di diskon~']);
    }

    public function lunas(Request $r, $id){
      
      $rekam = Rekam::findorfail($id);

      $arr = explode('-',$rekam->tgl_kunjungan);
      $date = substr($arr[0],2).$arr[1].$arr[2];

      $rekam->update([
        'status_bayar' => $r->lunas,
        'status' => 'Selesai'
      ]);

      $bayar = Bayar::where('rekam_id',$id)->first();
      $next = str_pad($r->nextNota + 1, 3, 0, STR_PAD_LEFT);

      $that = 'Konsultasi Dokter';
      $konsul = Tindak::where('nama_tindakan',$that)->first();
      
      $bayar->update([
        'biaya' => $bayar->biaya,
        'biaya_konsul' => $konsul->biaya,
        'no_nota' => $date.$next
      ]);

      return response()->json(['msg'=>'LUNAS', 'bayar' => $bayar]);
    }

    public function history($mode,$param1,$param2){

      $rekam = [];

      if ($mode === 'detail'){

        $from = date($param1);
        $to = date($param2);
  
        $rekam = Rekam::with(['anggota','bayar'])
                  ->whereBetween('tgl_kunjungan', [$from, $to])
                  ->where([
                    ['status','Selesai'],['status_bayar','Lunas']
                  ])->latest()->get();

      }elseif ($mode === 'perbulan') {

        $tgl = $param1.' '.$param2;

        $rekam = Rekam::with(['anggota','bayar'])
                  ->where([
                    ['tgl_indo', 'like','%'.$tgl.'%'],
                    ['status','Selesai'],['status_bayar','Lunas']
                  ])->latest()->get();

      }elseif ($mode === 'pertahun') {

        $rekam = Rekam::with(['anggota','bayar'])
                  ->where([
                    ['tgl_indo', 'like','%'.$param2.'%'],
                    ['status','Selesai'],['status_bayar','Lunas']
                  ])->latest()->get();

      }

      return $rekam;
    }
}
