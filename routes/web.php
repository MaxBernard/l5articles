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
  return view('welcome');
});

Route::get('/home', function () {
  return view('welcome');
});


//Route::get('api/users/{user}', function (App\User $user) {
//  return $user->email;
//});

//Route::prefix('auth')->group(function () {
//  Auth::routes();
//});

//Route::get('/home', 'HomeController@index')->name('home');

