<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;

use App\Models\Keluarga;
use App\Models\Anggota;
use App\Models\Rekam;
use App\Models\Gigi;
use App\Models\Diagnosa;

class DashboardController extends Controller
{
    private function getKeluarga(){
        $kel = Keluarga::all();

        return count($kel);
    }

    private function getAnggota(){
        $agt = Anggota::all();

        return count($agt);
    }

    private function getRekam(){
        $rekam = Rekam::where([
            ['status','Selesai'],['status_bayar','Lunas']
        ])->get();

        return count($rekam);
    }

    private function getCreatedToday(){
        $ctd = Anggota::whereDate('created_at', Carbon::today())->get();

        return count($ctd);
    }

    private function getUnderTigaBelas(){
        $agt = Anggota::all();
        
        $arr = [];
        $now = Carbon::now();

        foreach ($agt as $g) {
            $dbDate = Carbon::parse($g->tanggal_lahir);
            $foo = $dbDate->diff($now)->format('%y');
            if($foo < 13){
                array_push($arr, $foo);
            }    
        }

        return count($arr);
    }

    private function getTigaBelasTigaPuluh(){
        $agt = Anggota::all();
        
        $arr = [];
        $now = Carbon::now();

        foreach ($agt as $g) {
            $dbDate = Carbon::parse($g->tanggal_lahir);
            $foo = $dbDate->diff($now)->format('%y');
            if($foo >= 13 && $foo <= 30){
                array_push($arr, $foo);
            }    
        }

        return count($arr);
    }

    private function getTigaSatuLimaPuluh(){
        $agt = Anggota::all();
        
        $arr = [];
        $now = Carbon::now();

        foreach ($agt as $g) {
            $dbDate = Carbon::parse($g->tanggal_lahir);
            $foo = $dbDate->diff($now)->format('%y');
            if($foo >= 31 && $foo <= 50){
                array_push($arr, $foo);
            }    
        }

        return count($arr);
    }

    private function getAboveLimaPuluh(){
        $agt = Anggota::all();
        
        $arr = [];
        $now = Carbon::now();

        foreach ($agt as $g) {
            $dbDate = Carbon::parse($g->tanggal_lahir);
            $foo = $dbDate->diff($now)->format('%y');
            if($foo > 50){
                array_push($arr, $foo);
            }    
        }

        return count($arr);
    }

    private function getKunjunganPerbulan(){
        $now = Carbon::now();
        $tahun = $now->year;
        $arr = [];
        $bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        for($i=0;$i<count($bulan);$i++){
            $rek = Rekam::where([
                ['tgl_indo','like','%'.$bulan[$i].' '.$tahun.'%'],
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
            ])->get();
            array_push($arr, count($rek));
        }
        $data['kunjP'] = $arr;
        $data['judulKP'] = $tahun;
        return $data;
    }

    private function getKunjunganPerhari(){
        $now = Carbon::now();
        $days = $now->daysInMonth;
        $bulan = $now->month;
        $tahun = $now->year;
        
        $arr = [];
        for($i=1;$i<=$days;$i++){
            $day = str_pad($i, 2, 0, STR_PAD_LEFT);
            $bul = str_pad($bulan, 2, 0, STR_PAD_LEFT);
            $that = $tahun.'-'.$bul.'-'.$day;
            $rek = Rekam::where([
                ['tgl_kunjungan',$that],
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
            ])->get();
            array_push($arr, count($rek));
        }

        $bulans = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

        $data['kunjH'] = $arr;
        $data['judulKH'] = $bulans[$bulan-1].' '.$tahun;
        $data['jumlahHari'] = $days;
        return $data;
    }

    private function getDiagnosaTerbanyak(){
        $dg = Diagnosa::withCount(['gigis' => function ($q){
            $q->whereHas('rekam', function ($que) {
                $que->where([
                    ['status', 'Selesai'], ['status_bayar', 'Lunas']
                ]);
            });
        }])->orderBy('gigis_count', 'desc')->take(5)->get();
        return $dg;
    }

    private function getDuit(){
        $now = Carbon::now();
        $tahun = $now->year;
        $arr = [];
        $bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        for($i=0;$i<count($bulan);$i++){
            $reks = Rekam::with('bayar')->where([
                ['tgl_indo','like','%'.$bulan[$i].' '.$tahun.'%'],
                ['status','Selesai'],['status_bayar','Lunas']
            ])->get();
            $total = 0;
            foreach($reks as $r){
                $total += $r->bayar->biaya*1+$r->bayar->biaya_konsul*1 - $r->bayar->diskon*1;
            }
            array_push($arr, $total);
        }

        $data['duit'] = $arr;
        $data['judulDuit'] = $tahun;

        return $data;
    }

    private function getKunjunganToday(){
        $now = Carbon::now()->format('Y-m-d');

        $rek = Rekam::where([
            ['tgl_kunjungan',$now],
        ])->get();

        return count($rek);
    }

    private function getBelumToday(){
        $now = Carbon::now()->format('Y-m-d');

        $rek = Rekam::where('tgl_kunjungan',$now)
               ->where(function($q){
                   $q->where('status', 'Pending')
                     ->orWhere('status_bayar', 'Belum');
               })->get();

        return count($rek);
    }

    private function getSudahToday(){
        $now = Carbon::now()->format('Y-m-d');

        $rek = Rekam::where([
            ['tgl_kunjungan',$now],
            ['status', 'Selesai'],
            ['status_bayar', 'Lunas']
        ])->get();

        return count($rek);
    }

    public function getDashboard(){

        $data['kel'] = $this->getKeluarga();
        $data['agt'] = $this->getAnggota();
        $data['kunj'] = $this->getRekam();
        $data['ctoday'] = $this->getCreatedToday();

        $arr = [];
        array_push($arr, $this->getUnderTigaBelas());
        array_push($arr, $this->getTigaBelasTigaPuluh());
        array_push($arr, $this->getTigaSatuLimaPuluh());
        array_push($arr, $this->getAboveLimaPuluh());
        $data['pie'] = $arr;
        
        $data['kp'] = $this->getKunjunganPerbulan();
        $data['kh'] = $this->getKunjunganPerhari();
        $data['diag'] = $this->getDiagnosaTerbanyak();
        $data['duit'] = $this->getDuit();

        $data['ktd'] = $this->getKunjunganToday();
        $data['kbtd'] = $this->getBelumToday();
        $data['kstd'] = $this->getSudahToday();


        return $data;
    }
}
