<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Diagnosa;

class DiagnosaController extends Controller
{

    public function index()
    {
        $diags = Diagnosa::latest()->get();

        return $diags;
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'nama_diagnosa' => 'required|unique:diagnosas'
        ]);

        $d = Diagnosa::create([
            'nama_diagnosa' => $request->nama_diagnosa
        ]);

        return $d;
    }

    public function update(Request $request, $id)
    {
        $diag = Diagnosa::findorfail($id);
        
        $this->validate($request, [
            'nama_diagnosa' => 'required|unique:diagnosas,nama_diagnosa,'.$diag->id
        ]);

        $diag->update([
            'nama_diagnosa' => $request->nama_diagnosa
        ]);

        return response()->json(['msg' => 'diagnosa updated~']);
    }

    public function destroy($id)
    {
        $diag = Diagnosa::findorfail($id);

        $diag->delete();

        return response()->json(['msg' => 'diagnosa deleted~']);
    }
}
