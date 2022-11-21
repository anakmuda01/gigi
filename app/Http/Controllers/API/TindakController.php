<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Tindak;

class TindakController extends Controller
{
    public function index()
    {
        $tindaks = Tindak::latest()->get();

        return $tindaks;
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'nama_tindakan' => 'required|unique:tindaks',
            'biaya' => 'required'
        ]);

        $t = Tindak::create([
            'nama_tindakan' => $request->nama_tindakan,
            'biaya' => $request->biaya
        ]);

        return $t;
    }

    public function update(Request $request, $id)
    {
        $tind = Tindak::findorfail($id);

        $this->validate($request, [
            'nama_tindakan' => 'required|unique:tindaks,nama_tindakan,'.$tind->id,
            'biaya' => 'required'
        ]);

        $tind->update([
            'nama_tindakan' => $request->nama_tindakan,
            'biaya' => $request->biaya
        ]);

        return response()->json(['msg' => 'tindakan updated~']);
    }

    public function destroy($id)
    {
        $tind = Tindak::findorfail($id);

        $tind->delete();

        return response()->json(['msg' => 'tindakan deleted~']);
    }
}
