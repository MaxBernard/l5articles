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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

// Test
Route::GET('test',function (Request $request) {
  return ('<h1>Test</h1>');
});

// Article (CRUD) routes
Route::get('articles', 'ArticleController@index'); // List articles
Route::get('article/{id}', 'ArticleController@show'); // List single article
Route::post('article', 'ArticleController@store'); // Save new article
Route::post('article/{id}', 'ArticleController@update'); // Update article
Route::delete('article/{id}', 'ArticleController@destroy'); // Delete article

// Authentication routes
/*
Route::group([ 'middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('user', 'AuthController@user');
});
*/

// ==========================
Route::post('auth/login', 'AuthController@login');
Route::post('auth/register', 'AuthController@register');

Route::group(['middleware' => 'jwt.auth'], function(){
  Route::get('auth/user', 'AuthController@user');
  Route::post('auth/logout', 'AuthController@logout');
});

Route::group(['middleware' => 'jwt.refresh'], function(){
  Route::get('auth/refresh', 'AuthController@refresh');
});

/*
// Passport routes

Route::post('login', 'API\PassportController@login');
Route::post('register', 'API\PassportController@register');
Route::group(['middleware' => 'auth:api'], function(){
  Route::post('get-details', 'API\PassportController@getDetails');
});
*/
