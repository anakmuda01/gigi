<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\Rekam;
use App\Models\Anggota;
use App\Models\Gigi;
use App\Models\Kondisi;
use App\Models\Tindak;
use App\Models\Obat;
use App\Models\Minum;
use App\Models\Bayar;
use App\Models\Sujuk;
use App\Models\Kontrol;
use App\Models\Keterangan;

class DokterController extends Controller
{
    private function sekarang()
    {
      $now = Carbon::now()->format('Y-m-d');

      return $now;
    }

    function terlayani(Request $req, $id){

        $rek = Rekam::findorfail($id);

        if($rek){
            $rek->update([
                'status' => $req->aksi
            ]);
        }

        return response()->json(['msg' => 'aksi selesai.']);
    }

    function findRekam($id)
    {
        $x = $this->sekarang();
        $rek = Rekam::with(['vitals','anggota','obats'])->whereHas('anggota', function($q) use($id){
            $q->where('no_rm', $id);
        })->where('tgl_kunjungan','like','%'.$x.'%')->first();

        return $rek;
    }

    function upKeluhan(Request $request, $id){

        if(!$request->kel){
            return response()->json(['no_update' => true]);
        }
        
        $rek = Rekam::with(['anggota','vitals'])->findorfail($id);

        $rek->update([
            'keluhan' => $request->kel
        ]);
        
        return $rek;
    }

    function StoreVitals(Request $request, $id){

        $rekam = Rekam::findorfail($id);

        if($request->data){
          foreach ($request->data as $v) {
            $rekam->vitals()->updateExistingPivot($v['id'], array('hasil' => $v['hasil']), false);
          }
        }
  
        return response()->json(['msg' => 'sukses vitals']);
    }

    function Gigis($id){

        $x = $this->sekarang();
        $rek = Rekam::whereHas('anggota', function($q) use($id){
            $q->where('no_rm', $id);
        })->where('tgl_kunjungan','like','%'.$x.'%')->first();

        $i = $rek->id;

        $gis = Gigi::with(['kondisis' => function ($q) {
            $q->orderBy('nama_kondisi', 'asc');
        }])->with(['diags' => function ($q) {
            $q->orderBy('nama_diagnosa', 'asc');
        }])->with(['tindaks' => function ($q) {
            $q->orderBy('nama_tindakan', 'asc');
        }])->with('rujuk')->where('rekam_id', $i)->with('ket')->get();

        return $gis;
    }

    function TambahGigi(Request $r, $id)
    {
        $kons = Kondisi::orderBy('nama_kondisi', 'asc')->get();

        $terpilih = [];

        foreach ($kons as $key => $v){
            array_push($terpilih, $v->id);
        }

        $gi = Gigi::create([
            'rekam_id' => $id,
            'no_gigi' => $r->nomor
            ]);

        $gi->kondisis()->sync($terpilih);

        return $gi->id;
    }

    function BatalGigi($id)
    {

        $gi = Gigi::findorfail($id);

        $rek = Rekam::find($gi->rekam_id);

        if(count($rek->gigis) === 1){
            $juk = Sujuk::where('rekam_id', $gi->rekam_id)->first();
            if($juk){
                $juk->delete();
            }
        }
        
        $gi->delete();

        return response()->json(['msg' => 'gigi deleted']);
    }

    function TambahKondisi(Request $r, $id)
    {

        $g = Gigi::findorfail($id);
  
        if($r->kons){
            foreach ($r->kons as $k => $v) {
              $g->kondisis()->updateExistingPivot($k, array('value' => $v), false);
            }
        }

        return response()->json(['msg' => 'kondisi sync sukses', 'kons' => $r->kons]);
    }

    function TambahDiags(Request $r, $id)
    {

        $g = Gigi::findorfail($id);

        $g->diags()->sync($r->diags);

        return response()->json(['msg' => 'diagnosa sync sukses', 'diags' => $r->diags]);
    }

    function TambahTindak(Request $r, $id)
    {
        $g = Gigi::findorfail($id);

        $g->tindaks()->sync($r->tindaks);


        $biaya = 0;

        $rekam = Rekam::with('gigis.tindaks')->find($r->rm);

        $gigis = $rekam->gigis;

        foreach ($gigis as $val) {
            $len = $val->tindaks;
            foreach($len as $x){
                $biaya += $x->biaya;
            }
        }

        $bayar = Bayar::where('rekam_id',$r->rm)->first();

        if($bayar){
            $bayar->update([
                'biaya' => $biaya
            ]);
        }else{
            $new = Bayar::create([
                'rekam_id' => $r->rm,
                'biaya' => $biaya
            ]);
        }

        return response()->json(['msg' => 'tindakan sync sukses', 'tindaks' => $r->tindaks]);
    }

    function TambahResep(Request $r, $id){

        $x = $this->sekarang();
        $rek = Rekam::whereHas('anggota', function($q) use($id){
            $q->where('no_rm', $id);
        })->where('tgl_kunjungan','like','%'.$x.'%')->first();

        $exist = $rek->obats->contains($r->obat['id_obat']);

        $obat = Obat::findorfail($r->obat['id_obat']);

        $foo = [];
        foreach ($r->how as $h) {
            $minum = Minum::findorfail($h);

            $bar = '['.$minum->kode.'] '.$minum->cara;
            array_push($foo, $bar);
        }

        $wow = join(", ",$foo);


        if($exist){
            $qt = $r->obat['jumlah'];
            $rek->obats()->updateExistingPivot($r->obat['id_obat'], array('jumlah' => $qt, 'cara_minum' => $wow), false);
            return response()->json(['msg' => 'exist', 'obat' => $obat->nama_obat]);
        }else{
            $qt = $r->obat['jumlah'];
            $rek->obats()->attach($r->obat['id_obat'],['jumlah' => $qt, 'cara_minum'=>$wow]);
            return response()->json(['msg' => 'add resep sukses', 'resep' => $r->obat]);
        }
    }

    function ObatRM($rm){
        $x = $this->sekarang();
        $obs = Rekam::with(['obats','anggota'])->whereHas('anggota', function($q) use($rm){
            $q->where('no_rm', $rm);
        })->where('tgl_kunjungan','like','%'.$x.'%')->first();

        return $obs;
    }

    function HapusResep(Request $r, $id){
        $x = $this->sekarang();
        $rek = Rekam::whereHas('anggota', function($q) use($r){
            $q->where('no_rm', $r->no_rm);
        })->where('tgl_kunjungan','like','%'.$x.'%')->first();

        $rek->obats()->detach($id);

        return response()->json(['msg' => 'detach obat sukses']);
    }

    function kontrol(Request $req){
        $extol = Kontrol::where('rekam_id', $req->id_kontrol)->first();

        if(!$extol){
            $tol = Kontrol::create([
                'rekam_id' => $req->id_kontrol,
                'tgl_kontrol' => $req->tgl_kontrol,
                'note' => $req->note
            ]);

            $rek = Rekam::with(['anggota','kontrol'])->find($tol->rekam_id);

            return response()->json(['msg' => 'kontrol saved.', 'rekam' => $rek]);
        } else {
            $extol->update([
                'tgl_kontrol' => $req->tgl_kontrol,
                'note' => $req->note
            ]);
            
            $rek = Rekam::with(['anggota','kontrol'])->find($extol->rekam_id);

            return response()->json(['msg' => 'kontrol saved.', 'rekam' => $rek]);
        }
    }

    function TambahKet(Request $req, $id){
        $exket = Keterangan::where('gigi_id', $id)->first();

        if(!$exket){
            $tol = Keterangan::create([
                'gigi_id' => $id,
                'isi_ket' => $req->isi_ket
            ]);

            return response()->json(['msg' => 'keterangan saved.']);
        } else {
            $exket->update([
                'isi_ket' => $req->isi_ket
            ]);
            
            return response()->json(['msg' => 'keterangan updated.']);
        }
    }
}
