<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Obat;

class ObatController extends Controller
{
    public function index()
    {
        $obats = Obat::latest()->get();

        return $obats;
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'nama_obat' => 'required|unique:obats',
            'satuan' => 'required'
        ]);

        $obt = Obat::create([
            'nama_obat' => $request->nama_obat,
            'satuan' => $request->satuan
        ]);

        return $obt;
    }

    public function update(Request $request, $id)
    {
        $obt = Obat::findorfail($id);
        
        $this->validate($request, [
            'nama_obat' => 'required|unique:obats,nama_obat,'.$obt->id,
            'satuan' => 'required'
        ]);

        $obt->update([
            'nama_obat' => $request->nama_obat,
            'satuan' => $request->satuan
        ]);

        return response()->json(['msg' => 'obat updated~']);
    }

    public function destroy($id)
    {
        $obt = Obat::findorfail($id);

        $obt->delete();

        return response()->json(['msg' => 'obat deleted~']);
    }
}
