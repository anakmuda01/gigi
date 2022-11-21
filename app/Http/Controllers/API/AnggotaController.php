<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Keluarga;
use App\Models\Anggota;
use App\Models\Vital;

class AnggotaController extends Controller
{
  // public function __construct()
  // {
  //    $this->middleware('auth:api');
  // }

  public function index()
  {
      $agts = Anggota::with('keluarga')->latest()->get();
      return $agts;
  }

  public function store(Request $request)
  {
    $this->validate($request, [
      'kepala' => 'required',
      'nama_pasien' => 'required|min:3|max:180',
      'tempat_lahir' => 'required|min:3|max:180',
      'tanggal_lahir' => 'required|max:180',
      'jenis_kelamin' => 'required',
      'status' => 'required',
      'no_rm' => 'required|unique:anggotas|min:1|max:180',
      'no_hp' => 'required|min:1|max:180',
      'alamat' => 'required|min:1|max:10000',
      'pekerjaan' => 'required',
      'jenis_pasien' => 'required',
    ]);

      $agt = Anggota::create([
        'keluarga_id' => $request->input('kepala.id'),
        'nama_pasien' => $request->nama_pasien,
        'tempat_lahir' => $request->tempat_lahir,
        'tanggal_lahir' => $request->tanggal_lahir,
        'jenis_kelamin' => $request->jenis_kelamin,
        'status' => $request->status,
        'no_rm' => $request->no_rm,
        'no_hp' => $request->no_hp,
        'alamat' => $request->alamat,
        'pekerjaan' => $request->pekerjaan,
        'jenis_pasien' => $request->jenis_pasien,
        'id_telegram' => $request->id_telegram,
      ]);

      if (!file_exists('img/photo_gigi/'.$agt->no_rm)) {
          mkdir('img/photo_gigi/'.$agt->no_rm, 0777, true);
      }

      return response()->json(['msg'=>'sukses']);
  }

  public function update(Request $request, $id)
  {
    $this->validate($request, [
      'nama_pasien' => 'required|min:3|max:180',
      'tempat_lahir' => 'required|min:3|max:180',
      'tanggal_lahir' => 'required|max:180',
      'jenis_kelamin' => 'required',
      'status' => 'required',
      'no_hp' => 'required|min:1|max:180',
      'alamat' => 'required|min:1|max:10000',
      'pekerjaan' => 'required',
      'jenis_pasien' => 'required',
    ]);

    $agt = Anggota::findOrFail($id);

    $agt->update([
      'nama_pasien' => $request->nama_pasien,
      'tempat_lahir' => $request->tempat_lahir,
      'tanggal_lahir' => $request->tanggal_lahir,
      'jenis_kelamin' => $request->jenis_kelamin,
      'status' => $request->status,
      'no_hp' => $request->no_hp,
      'alamat' => $request->alamat,
      'pekerjaan' => $request->pekerjaan,
      'jenis_pasien' => $request->jenis_pasien,
      'id_telegram' => $request->id_telegram,
    ]);

    if (!file_exists('img/photo_gigi/'.$agt->no_rm)) {
        mkdir('img/photo_gigi/'.$agt->no_rm, 0777, true);
    }

    return response()->json(['msg' => 'sukses updated']);
  }

  private function deleteDir($dirPath) {
      if (! is_dir($dirPath)) {
          return false;
      }
      if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
          $dirPath .= '/';
      }
      $files = glob($dirPath . '*', GLOB_MARK);
      foreach ($files as $file) {
          if (is_dir($file)) {
              self::deleteDir($file);
          } else {
              unlink($file);
          }
      }
      rmdir($dirPath);
      return true;
    }


  public function destroy($id)
  {
      $agt = Anggota::findOrFail($id);

      $target = 'img/photo_gigi/'.$agt->no_rm;

      if($this->deleteDir($target)){
        $agt->delete();
        return response()->json(['msg' => 'sukses']);
      }else{
        return response()->json(['msg' => 'gagal']);
      }
      
  }
}
