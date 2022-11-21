<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Set;

class SetController extends Controller
{
    public function getSet(){
        $set = Set::get()->first();

        return $set;
    }

    public function storeProfile(Request $req)
    {
        $set = Set::get()->first();

        if(!$set){
            return Set::create([
                'jabatan' => $req->jabatan,
                'atas_nama' => $req->atas_nama,
                'no_sip' => $req->no_sip,
                'kota' => $req->kota,
                'slogan' => $req->slogan,
            ]);
        }else{
            $set->update([
                'jabatan' => $req->jabatan,
                'atas_nama' => $req->atas_nama,
                'no_sip' => $req->no_sip,
                'kota' => $req->kota,
                'slogan' => $req->slogan,
            ]);

            return response()->json(['msg' => 'profile updated.']);
        }
    }

    public function storeInkjet(Request $req)
    {
        $set = Set::get()->first();

        if(!$set){
            return Set::create([
                'InkjetA' => $req->barisA,
                'InkjetB' => $req->barisB,
                'InkjetC' => $req->barisC,
                'InkjetD' => $req->barisD,

            ]);
        }else{
            $set->update([
                'InkjetA' => $req->barisA,
                'InkjetB' => $req->barisB,
                'InkjetC' => $req->barisC,
                'InkjetD' => $req->barisD,
            ]);

            return response()->json(['msg' => 'inkjet updated.']);
        }
    }

    public function storePos(Request $req)
    {
        $set = Set::get()->first();

        if(!$set){
            return Set::create([
                'posA' => $req->barisA,
                'posB' => $req->barisB,
                'posC' => $req->barisC,
                'posD' => $req->barisD,
                'posE' => $req->barisE,

            ]);
        }else{
            $set->update([
                'posA' => $req->barisA,
                'posB' => $req->barisB,
                'posC' => $req->barisC,
                'posD' => $req->barisD,
                'posE' => $req->barisE,
            ]);

            return response()->json(['msg' => 'pos-58mm updated.']);
        }
    }
}
