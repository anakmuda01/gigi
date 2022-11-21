<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $myIP = getHostByName(getHostName());
    return view('welcome', compact('myIP'));
})->name('welcome');

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
// Route::get('/backup', 'HomeController@backup');

// Registration Routes...
Route::get('register/aXyekre092Xkf', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register/aXyekre092Xkf', 'Auth\RegisterController@register');

// Authentication Web Routes
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Route everything else to Vue
Route::get('/cetak-rm/{id}', function () {
    return 'coba cetak rm route~';
});

Route::get('{any?}', function () {
    return view('main');
})->where('any', '.*')->middleware('auth');

