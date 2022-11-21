<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;

use App\Models\Rekam;
use App\Models\Anggota;
use App\Models\Diagnosa;
use App\Models\Tindak;
use App\Models\Suket;
use App\Models\Gigi;

class LaporanController extends Controller
{
    public function laporanKunjungan($mode,$param1,$param2,$param3){

        $rekam = [];
  
        if ($mode === 'detail'){
  
          $from = date($param1);
          $to = date($param2);

          if($param3 === 'Semua'){
            $rekam = Rekam::with(['anggota','bayar'])
            ->whereBetween('tgl_kunjungan', [$from, $to])
            ->where([
                ['status_bayar', 'Lunas'],
                ['status', 'Selesai']
            ])->get();
          }else{
            $rekam = Rekam::with(['anggota','bayar'])->whereHas('anggota', function ($q) use($param3) {
              $q->where('jenis_pasien', $param3);
            })
            ->whereBetween('tgl_kunjungan', [$from, $to])
            ->where([
                ['status_bayar', 'Lunas'],
                ['status', 'Selesai']
            ])->get();
          }
  
        }elseif ($mode === 'perbulan') {
  
          $tgl = $param1.' '.$param2;
  
          if($param3 === 'Semua'){
            $rekam = Rekam::with(['anggota','bayar'])
            ->where([
              ['tgl_indo', 'like','%'.$tgl.'%'],
              ['status_bayar', 'Lunas'],
              ['status', 'Selesai']
            ])->get();
          }else{
            $rekam = Rekam::with(['anggota','bayar'])->whereHas('anggota', function ($q) use($param3) {
              $q->where('jenis_pasien', $param3);
            })
            ->where([
              ['tgl_indo', 'like','%'.$tgl.'%'],
              ['status_bayar', 'Lunas'],
              ['status', 'Selesai']
            ])->get();
          }
  
        }elseif ($mode === 'pertahun') {
  
          if($param3 === 'Semua'){
            $rekam = Rekam::with(['anggota','bayar'])
            ->where([
              ['tgl_indo', 'like','%'.$param2.'%'],
              ['status_bayar', 'Lunas'],
              ['status', 'Selesai']
            ])->get();
            
          }else{
            $rekam = Rekam::with(['anggota','bayar'])->whereHas('anggota', function ($q) use($param3) {
              $q->where('jenis_pasien', $param3);
            })
            ->where([
              ['tgl_indo', 'like','%'.$param2.'%'],
              ['status_bayar', 'Lunas'],
              ['status', 'Selesai']
            ])->get();
          }
  
        }
  
        return $rekam;
      }

      public function laporanDaftarPasien($mode,$param1,$param2,$param3){

        $anggotas = [];
  
        if ($mode === 'detail'){
  
          $from = date($param1);
          $to = date($param2);
          
          if($param3 === 'Semua'){
            $anggotas = Anggota::with('keluarga')->whereBetween('created_at', [$from, $to])->get();
          }else{
            $anggotas = Anggota::with('keluarga')->whereBetween('created_at', [$from, $to])
                        ->where('jenis_pasien', $param3)->get();
          }

          
  
        }elseif ($mode === 'perbulan') {
          
          $bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
          
          $bln = array_search($param1, $bulan);
          $bul = str_pad($bln+1, 2, 0, STR_PAD_LEFT);

          $tgl = $param2.'-'.$bul;
  
          if($param3 === 'Semua'){
            $anggotas = Anggota::with('keluarga')->where('created_at', 'like','%'.$tgl.'%')->get();
          }else{
            $anggotas = Anggota::with('keluarga')->where([
              ['jenis_pasien', $param3],
              ['created_at', 'like','%'.$tgl.'%']
            ])->get();
          }
  
        }elseif ($mode === 'pertahun') {
  
          if($param3 === 'Semua'){
            $anggotas = Anggota::with('keluarga')->where('created_at', 'like','%'.$param2.'%')->get();
          }else{
            $anggotas = Anggota::with('keluarga')->where([
              ['jenis_pasien', $param3],
              ['created_at', 'like','%'.$param2.'%']
            ])->get();
          }
  
        }
  
        return $anggotas;
      }

      public function laporanDiagnosaTerbanyak($mode,$param1,$param2){

        $dg = [];

        if ($mode === 'detail'){
  
          $from = date($param1);
          $to = date($param2);
    
          $dg = Diagnosa::withCount(['gigis' => function ($q) use ($from,$to) {
            $q->whereHas('rekam', function($que) use ($from,$to) {
              $que->whereBetween('tgl_kunjungan', [$from, $to])->where([
                  ['status', 'Selesai'], ['status_bayar', 'Lunas']
                ]);
            });
          }])->orderBy('gigis_count', 'desc')->get();

          foreach($dg as $d){
            $agt = Anggota::whereHas('rekams', function($q) use ($d,$from,$to) {
              $q->whereBetween('tgl_kunjungan', [$from, $to])->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ])->whereHas('gigis', function ($qe) use ($d) {
                $qe->whereHas('diags', function ($que) use ($d) {
                  $que->where('diagnosa_id',$d->id);
                });
              });
            })->get();
            $data = $d;
            $data['orang'] = count($agt);
          }
  
        }elseif ($mode === 'perbulan') {
          
          $tgl = $param1.' '.$param2;

          $dg = Diagnosa::withCount(['gigis' => function ($q) use ($tgl) {
                  $q->whereHas('rekam', function($que) use ($tgl) {
                    $que->where('tgl_indo','like','%'.$tgl.'%')->where([
                      ['status', 'Selesai'], ['status_bayar', 'Lunas']
                    ]);
                  });
                }])->orderBy('gigis_count', 'desc')->get();
          
          foreach($dg as $d){
            $agt = Anggota::whereHas('rekams', function($q) use ($d,$tgl) {
              $q->where('tgl_indo','like','%'.$tgl.'%')->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ])->whereHas('gigis', function ($qe) use ($d) {
                $qe->whereHas('diags', function ($que) use ($d) {
                  $que->where('diagnosa_id',$d->id);
                });
              });
            })->get();
            $data = $d;
            $data['orang'] = count($agt);
          }
  
        }elseif ($mode === 'pertahun') {
  
          $dg = Diagnosa::withCount(['gigis' => function ($q) use ($param2) {
            $q->whereHas('rekam', function($que) use ($param2) {
              $que->where('tgl_indo','like','%'.$param2.'%')->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ]);
            });
          }])->orderBy('gigis_count', 'desc')->get();

          foreach($dg as $d){
            $agt = Anggota::whereHas('rekams', function($q) use ($d,$param2) {
              $q->where('tgl_indo','like','%'.$param2.'%')->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ])->whereHas('gigis', function ($qe) use ($d) {
                $qe->whereHas('diags', function ($que) use ($d) {
                  $que->where('diagnosa_id',$d->id);
                });
              });
            })->get();
            $data = $d;
            $data['orang'] = count($agt);
          }

        }

        return $dg;
      }

      public function laporanTindakanTerbanyak($mode,$param1,$param2){

        $tkn = [];

        if ($mode === 'detail'){
  
          $from = date($param1);
          $to = date($param2);
    
          $tkn = Tindak::where('nama_tindakan','!=','Konsultasi Dokter')->withCount(['gigis' => function ($q) use ($from,$to) {
            $q->whereHas('rekam', function($que) use ($from,$to) {
              $que->whereBetween('tgl_kunjungan', [$from, $to])->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ]);
            });
          }])->orderBy('gigis_count', 'desc')->get();

          foreach($tkn as $tk){
            $agt = Anggota::whereHas('rekams', function($q) use ($tk,$from,$to) {
              $q->whereBetween('tgl_kunjungan', [$from, $to])->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ])->whereHas('gigis', function ($qe) use ($tk) {
                $qe->whereHas('tindaks', function ($que) use ($tk) {
                  $que->where('tindak_id',$tk->id);
                });
              });
            })->get();
            $data = $tk;
            $data['orang'] = count($agt);
          }
  
        }elseif ($mode === 'perbulan') {
          
          $tgl = $param1.' '.$param2;

          $tkn = Tindak::where('nama_tindakan','!=','Konsultasi Dokter')->withCount(['gigis' => function ($q) use ($tgl) {
                  $q->whereHas('rekam', function($que) use ($tgl) {
                    $que->where('tgl_indo','like','%'.$tgl.'%')->where([
                      ['status', 'Selesai'], ['status_bayar', 'Lunas']
                    ]);
                  });
                }])->orderBy('gigis_count', 'desc')->get();

          foreach($tkn as $tk){
            $agt = Anggota::whereHas('rekams', function($q) use ($tk,$tgl) {
              $q->where('tgl_indo','like','%'.$tgl.'%')->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ])->whereHas('gigis', function ($qe) use ($tk) {
                $qe->whereHas('tindaks', function ($que) use ($tk) {
                  $que->where('tindak_id',$tk->id);
                });
              });
            })->get();
            $data = $tk;
            $data['orang'] = count($agt);
          }
  
        }elseif ($mode === 'pertahun') {
  
          $tkn = Tindak::where('nama_tindakan','!=','Konsultasi Dokter')->withCount(['gigis' => function ($q) use ($param2) {
            $q->whereHas('rekam', function($que) use ($param2) {
              $que->where('tgl_indo','like','%'.$param2.'%')->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ]);
            });
          }])->orderBy('gigis_count', 'desc')->get();

          foreach($tkn as $tk){
            $agt = Anggota::whereHas('rekams', function($q) use ($param2, $tk) {
              $q->where('tgl_indo','like','%'.$param2.'%')->where([
                ['status', 'Selesai'], ['status_bayar', 'Lunas']
              ])->whereHas('gigis', function ($qe) use ($tk) {
                $qe->whereHas('tindaks', function ($que) use ($tk) {
                  $que->where('tindak_id',$tk->id);
                });
              });
            })->get();
            $data = $tk;
            $data['orang'] = count($agt);
          }
  
        }
  
        return $tkn;
      }

      public function laporanBiayaTindakan(){
        $btkn = Tindak::orderBy('nama_tindakan','asc')->get();

        return $btkn;
      }

      public function laporanPemasukan($mode,$param1,$param2){


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

      public function laporanSuket($mode,$param1,$param2){

        $suket = [];
  
        if ($mode === 'detail'){
  
          $from = date($param1);
          $to = date($param2);

          $suket = Suket::whereBetween('created_at', [$from, $to])->latest()->get();
        
          foreach ($suket as $suk) {
              $agt = Anggota::find($suk->anggota_id);
              $data = $suk;
              $data['agt'] = $agt;
          }
  
        }elseif ($mode === 'perbulan') {
  
          $tgl = $param1.' '.$param2;
  
          $suket = Suket::where('tgl_surat', 'like', '%'.$tgl.'%')->latest()->get();
        
          foreach ($suket as $suk) {
              $agt = Anggota::find($suk->anggota_id);
              $data = $suk;
              $data['agt'] = $agt;
          }
  
        }elseif ($mode === 'pertahun') {
          
          $suket = Suket::where('tgl_surat', 'like', '%'.$param2.'%')->latest()->get();

          foreach ($suket as $suk) {
            $agt = Anggota::find($suk->anggota_id);
            $data = $suk;
            $data['agt'] = $agt;
          }
  
        }
  
        return $suket;
      }
}
