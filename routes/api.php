<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources(['user' => 'API\UserController']);
Route::apiResources(['keluarga' => 'API\KeluargaController']);
Route::apiResources(['anggota' => 'API\AnggotaController']);
Route::apiResources(['kunjungan' => 'API\KunjunganController']);
Route::apiResources(['suket' => 'API\SuketController']);

//core
Route::apiResources(['kondisi' => 'API\KondisiController']);
Route::get('kondisi-terorder', 'API\CoreController@getKondisi');
Route::apiResources(['diagnosa' => 'API\DiagnosaController']);
Route::apiResources(['tindakan' => 'API\TindakController']);
Route::get('tindakan-terorder', 'API\CoreController@getTindakan');
Route::apiResources(['obat' => 'API\ObatController']);
Route::get('rekam-pasien/{id}','API\CoreController@RekamPasien');
Route::apiResources(['minum-obat' => 'API\NginumController']);
Route::get('biaya-konsul','API\CoreController@BiayaKonsul');
Route::get('get-tahun','API\CoreController@getTahun');
//endcore

Route::get('antrian','API\KunjunganController@antrian');
Route::get('antrian-dokter','API\KunjunganController@antrianDokter');
Route::put('terlayani/{id}','API\DokterController@terlayani');
Route::get('rekam/{id}','API\DokterController@findRekam');
Route::put('keluhan/{id}', 'API\DokterController@upKeluhan');
Route::post('store-vitals/{id}', 'API\DokterController@StoreVitals');
Route::post('up-vitals/{id}', 'API\DokterController@upVitals');

//pemrik diag tindak
Route::get('gigis/{id}','API\DokterController@Gigis');
Route::post('tambah-gigi/{id}', 'API\DokterController@TambahGigi');
Route::delete('batal-gigi/{id}', 'API\DokterController@BatalGigi');
Route::post('tambah-kondisi/{id}', 'API\DokterController@TambahKondisi');
Route::post('tambah-diags/{id}', 'API\DokterController@TambahDiags');
Route::post('tambah-tindaks/{id}', 'API\DokterController@TambahTindak');
Route::post('tambah-resep/{id}','API\DokterController@TambahResep');
Route::get('obat-rm/{rm}','API\DokterController@ObatRM');
Route::post('hapus-resep/{id}', 'API\DokterController@HapusResep');
Route::post('tambah-ket/{id}', 'API\DokterController@TambahKet');

//photo
Route::post('add-photo/{id}','API\PhotoController@addPhoto');
Route::get('photo-rm/{id}','API\PhotoController@photoRM');
Route::delete('hapus-photo/{id}','API\PhotoController@hapusPhoto');

//bayar
Route::get('bayar','API\BayarController@index');
Route::put('diskon/{id}','API\BayarController@diskon');
Route::put('lunas/{id}','API\BayarController@lunas');
Route::get('history-pembayaran/{mode}/{param1}/{param2}', 'API\BayarController@history');

//dashboard
// Route::get('d-keluarga','API\DashboardController@getKeluarga');
// Route::get('d-anggota','API\DashboardController@getAnggota');
// Route::get('d-kunjungan','API\DashboardController@getRekam');
// Route::get('d-terdaftar-today','API\DashboardController@getCreatedToday');
// Route::get('d-under-tiga-belas','API\DashboardController@getUnderTigaBelas');
Route::get('d-dashboard', 'API\DashboardController@getDashboard');

//rujukan
Route::post('make-rujukan', 'API\RujukanController@makeRujukan');
Route::delete('hapus-rujukan/{id}', 'API\RujukanController@hapusRujukan');
Route::get('cek-rujuk/{rm}', 'API\RujukanController@cekRujuk');

Route::get('laporan-kunjungan/{mode}/{param1}/{param2}/{param3}', 'API\LaporanController@laporanKunjungan');
Route::get('laporan-daftar-pasien/{mode}/{param1}/{param2}/{param3}', 'API\LaporanController@laporanDaftarPasien');
Route::get('laporan-diagnosa-terbanyak/{mode}/{param1}/{param2}', 'API\LaporanController@laporanDiagnosaTerbanyak');
Route::get('laporan-tindakan-terbanyak/{mode}/{param1}/{param2}', 'API\LaporanController@laporanTindakanTerbanyak');
Route::get('laporan-biaya-tindakan', 'API\LaporanController@laporanBiayaTindakan');
Route::get('laporan-suket/{mode}/{param1}/{param2}', 'API\LaporanController@laporanSuket');

//kontrol
Route::post('kontrol', 'API\DokterController@kontrol');

//pengaturan
Route::get('get-set','API\SetController@getSet');
Route::post('store-profile', 'API\SetController@storeProfile');
Route::post('store-inkjet', 'API\SetController@storeInkjet');
Route::post('store-pos', 'API\SetController@storePos');

//support
Route::get('get-support', 'API\CoreController@getSupport');