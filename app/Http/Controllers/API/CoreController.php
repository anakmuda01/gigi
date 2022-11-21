<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Rekam;
use App\Models\Anggota;
use App\Models\Vital;
use App\Models\Kondisi;
use App\Models\Tindak;
use App\Models\Support;

class CoreController extends Controller
{
    function getVitals(){
        $vits = Vital::get();

        return $vits;
    }

    public function getKondisi(){
        
        $kons = Kondisi::orderBy('nama_kondisi', 'asc')->get();

        return $kons;
    }


    public function getTindakan(){
        
        $that = 'Konsultasi Dokter';
        $tins = Tindak::where('nama_tindakan','!=',$that)->orderBy('nama_tindakan', 'asc')->get();

        return $tins;
    }

    public function RekamPasien($id){

        $agt = Anggota::where('no_rm',$id)->first();

        $rek = Rekam::with(['anggota','gigis.kondisis','gigis.diags','gigis.tindaks','gigis.rujuk','gigis.ket','vitals','obats','photos','sujuk','kontrol'])->whereHas('anggota', function($q) use($id){
            $q->where('no_rm', $id);
        })->latest()->get();

        return response()->json(['pasien'=> $agt, 'rekam' => $rek]);
    }

    public function BiayaKonsul(){
        $that = 'Konsultasi Dokter';
        $konsul = Tindak::where('nama_tindakan',$that)->first();

        return $konsul->biaya;
    }

    public function getTahun(){
        $rek = Rekam::all();

        $years = [];

        foreach ($rek as $r) {
            array_push($years, substr($r->tgl_kunjungan,0,4));
        }
        $tahuns = array_unique($years);
        return $tahuns;
    }

    public function getSupport(){
        $sup = Support::get()->first();

        return $sup;
    }
}
