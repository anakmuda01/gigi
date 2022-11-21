<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Kondisi;
use App\Models\Gigi;

class KondisiController extends Controller
{

    public function index()
    {
        $kons = Kondisi::latest()->get();

        return $kons;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nama_kondisi' => 'required|unique:kondisis'
        ]);

        $k = Kondisi::create([
            'nama_kondisi' => $request->nama_kondisi
        ]);

        $gis = Gigi::Has('rekam')->get();

        foreach($gis as $v){
            $v->kondisis()->attach($k->id);
        }

        return $k;
    }



    public function update(Request $request, $id)
    {
        $kon = Kondisi::findorfail($id);
        
        $this->validate($request, [
            'nama_kondisi' => 'required|unique:kondisis,nama_kondisi,'.$kon->id
        ]);


        $kon->update([
            'nama_kondisi' => $request->nama_kondisi
        ]);

        return response()->json(['msg' => 'kondisi updated~']);
    }

    public function destroy($id)
    {
        $kon = Kondisi::findorfail($id);

        $kon->delete();

        return response()->json(['msg' => 'kondisi deleted~']);
    }
}
