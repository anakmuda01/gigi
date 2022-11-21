<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Minum;

class NginumController extends Controller
{

    public function index()
    {
        $num = Minum::latest()->get();

        return $num;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'kode' => 'required|unique:minums',
            'cara' => 'required|unique:minums'
        ]);

        $minum = Minum::create([
            'kode' => $request->kode,
            'cara' => $request->cara
        ]);

        return $minum;
    }

    public function update(Request $request, $id)
    {
        $nginum = Minum::findorfail($id);

        $this->validate($request, [
            'kode' => 'required|unique:minums,kode,'.$nginum->id,
            'cara' => 'required|unique:minums,cara,'.$nginum->id
        ]);

        $nginum->update([
            'kode' => $request->kode,
            'cara' => $request->cara
        ]);

        return response()->json(['msg' => 'Nginum updated~']);
    }


    public function destroy($id)
    {
        $nginum = Minum::findorfail($id);

        $nginum->delete();

        return response()->json(['msg' => 'Nginum deleted~']);
    }
}
