<?php

use Illuminate\Database\Seeder;

use App\Models\Vital;
use App\Models\Tindak;
use App\Models\Set;

class VitsulTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arr = array('Tekanan Darah', 'Gula Darah');

        $vitsul = Vital::get()->first();

        if(!$vitsul){
            foreach($arr as $val){
                $vital = Vital::create([
                    'nama_vital'  => $val,
                ]);
            }
        }

        $tind = Tindak::get()->first();

        if(!$tind){
            $tindak = Tindak::create([
                'nama_tindakan' => 'Konsultasi Dokter',
                'biaya' => '25000'
            ]);
        }

        $sett = Set::get()->first();

        if(!$sett){
            $sett = Set::create([
                'InkjetA' => 'Praktik Dokter Gigi Mandiri',
                'InkjetB' => 'APOTEK SALMA BANJARBARU',
                'InkjetC' => 'drg. Agus Dwi Karyanto, MPH',
                'InkjetD' => 'Jl. Hercules Landasan Ulin Banjarbaru Telp. 082912312344',
                'posA' => 'Praktik Dokter Gigi Mandiri',
                'posB' => 'Apotek Salma BJB',
                'posC' => 'drg. Agus Dwi Karyanto, MPH',
                'posD' => 'Jl. Hercules Landasan Ulin',
                'posE' => 'Banjarbaru Tlp. 082912312344',
                'jabatan' => 'Pimpinan',
                'atas_nama' => 'drg. Agus Dwi Karyanto, MPH',
                'no_sip' => '055 TAHUN 2017',
                'kota' => 'Banjarbaru',
                'slogan' => 'Gigi Sehat, Rezeki Lancar :)'
            ]);
        }
    }
}
