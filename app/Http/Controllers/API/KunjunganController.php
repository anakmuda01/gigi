<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;
use App\Models\Rekam;
use App\Models\Anggota;
use App\Models\Vital;
use App\Models\Gigi;
use App\Models\Bayar;

class KunjunganController extends Controller
{
    private function sekarang()
    {
      $now = Carbon::now()->format('Y-m-d');

      return $now;
    }

    private function ageNow($id, $tgl){

        $agt = Anggota::findorfail($id);
        $dbDate = Carbon::parse($agt->tanggal_lahir);
        $kunj = Carbon::parse($tgl);

        $foo = $dbDate->diff($kunj)->format('%y-%m-%d');

        return $foo;
    }

    public function antrian()
    {
      $x = $this->sekarang();
      $it = Rekam::with('anggota')->with('vitals')->where('tgl_kunjungan','like','%'.$x.'%')->get();
      return $it;
    }

    public function antrianDokter()
    {
      $x = $this->sekarang();
      $que = Rekam::with(['gigis.kondisis','gigis.diags','gigis.tindaks','gigis.rujuk','gigis.ket','anggota','vitals','obats','photos','sujuk'])->where('tgl_kunjungan','like','%'.$x.'%')->get();
      return $que;
    }

    public function index()
    {
        $reks = Rekam::with('anggota')->orderBy('status')->latest()->get();
        return $reks;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'anggota' => 'required',
            'keluhan' => 'required',
            'tgl_kunjungan' => 'required'
        ]);
        
        $agt = Anggota::findOrFail($request->input('anggota.id'));

        if($agt){
            $foo = Rekam::where('anggota_id',$agt->id)->where('tgl_kunjungan','like','%'.$request->tgl_kunjungan.'%')->first();
        }

        if($foo){
            return response()->json(['msg' => 'exist', 'no_rm' => $agt->no_rm, 'nama_pasien' => $agt->nama_pasien]);
        }

        $rek = Rekam::where('anggota_id',$agt->id)->first();

        $usia = $this->ageNow($agt->id, $request->tgl_kunjungan);

        preg_match_all('!\d+!', $usia, $usia_arr);

        $vits = Vital::get();

        $terpilih = [];

        foreach ($vits as $key => $v){
            array_push($terpilih, $v->id);
        }

        $rek = Rekam::create([
            'anggota_id' => $request->input('anggota.id'),
            'tgl_kunjungan' => $request->tgl_kunjungan,
            'tgl_indo' => $request->tgl_indo,
            'keluhan' => $request->keluhan,
            'tahun_k' => $usia_arr[0][0],
            'bulan_k' => $usia_arr[0][1],
            'hari_k' => $usia_arr[0][2],
        ]);

        $rek->vitals()->sync($terpilih);

        $bayar = Bayar::create([
            'rekam_id' => $rek->id
        ]);

        if (!file_exists('img/photo_gigi/'.$agt->no_rm.'/'.$rek->tgl_kunjungan)) {
            mkdir('img/photo_gigi/'.$agt->no_rm.'/'.$rek->tgl_kunjungan, 0777, true);
        }

        return $rek;
    }

    public function update(Request $request, $id)
    {
        $x = $this->sekarang();
        $this->validate($request, [
            'keluhan' => 'required',
        ]);

        $rek = Rekam::findOrFail($id);

        $rek->update([
            'keluhan' => $request->keluhan,
          ]);
        
        $agt = Anggota::findOrFail($rek->anggota_id);
        
        if (!file_exists('img/photo_gigi/'.$agt->no_rm.'/'.$rek->tgl_kunjungan)) {
            mkdir('img/photo_gigi/'.$agt->no_rm.'/'.$rek->tgl_kunjungan, 0777, true);
        }

        return response()->json(['msg' => 'sukses updated']);
    }

    private function deleteDir($dirPath) {
        if (! is_dir($dirPath)) {
            throw new InvalidArgumentException("$dirPath must be a directory");
        }
        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);
    }


    public function destroy($id){

        $rekam = Rekam::with(['anggota'])->findOrFail($id);
        $target = 'img/photo_gigi/'.$rekam->anggota->no_rm.'/'.$rekam->tgl_kunjungan;

        $this->deleteDir($target);

        $rekam->delete();

        return response()->json(['msg'=>'sukses deleted']);
    }
}
