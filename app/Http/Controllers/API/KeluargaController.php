<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Anggota;
use App\Models\Keluarga;

class KeluargaController extends Controller
{

    public function index()
    {
        $kels = Keluarga::with('anggotas')->latest()->get();
        return $kels;
    }

    public function store(Request $request)
    {
      $this->validate($request, [
        'no_keluarga' => 'required|unique:keluargas',
        'nama_kepala' => 'required|max:25',
      ]);

      return
        Keluarga::create([
          'no_keluarga' => $request->no_keluarga,
          'nama_kepala' => $request->nama_kepala,
        ]);
    }

    public function update(Request $request, $id)
    {
      $kel = Keluarga::findOrFail($id);

      $this->validate($request,[
          'no_keluarga' => 'required|max:255|unique:keluargas,no_keluarga,'.$kel->id,
          'nama_kepala' => 'required|max:25',
      ]);

      $kel->update([
        'no_keluarga' => $request->no_keluarga,
        'nama_kepala' => $request->nama_kepala,
      ]);
      return $request;
    }

    public function destroy($id)
    {
        $kel = Keluarga::findOrFail($id);

        $hav = $kel->anggotas()->exists();

        if(!$hav){
          $kel->delete();

          return response()->json([ 'msg' => 'sukses' ]);
        }else{
          return response()->json([ 'msg' => 'exist' ]);
        }
        
    }
}
