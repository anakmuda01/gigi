<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Anggota;
use App\Models\Suket;

class SuketController extends Controller
{

    public function index()
    {
        // $suket = Anggota::has('sukets')->with(['sukets' => function ($q){
        //     $q->orderBy('created_at', 'desc');
        // }])->get();

        $suket = Suket::latest()->get();
        
        foreach ($suket as $suk) {
            $agt = Anggota::find($suk->anggota_id);
            $data = $suk;
            $data['agt'] = $agt;
        }

        return $suket;
    }


    public function store(Request $request)
    {
        return 
            Suket::create([
                'anggota_id' => $request->pasien['id'],
                'no_suket' => $request->no_suket,
                'from' => $request->fromDate,
                'to' => $request->toDate,
                'kontrol' => $request->koDate,
                'tgl_surat' => $request->tgl_surat
            ]);
    }

    public function destroy($id)
    {
        $suket = Suket::findorfail($id);

        $suket->delete();

        return response()->json(['msg'=>'suket deleted']);
    }
}
