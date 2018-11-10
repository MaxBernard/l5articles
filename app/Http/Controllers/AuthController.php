<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterFormRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use JWTAuth;

class AuthController extends Controller
{

  /**
   * Create a new AuthController instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api', ['except' => ['login']]);
  }

  //=========================
  // Register
  public function register(RegisterFormRequest $request)
  {
    $user = new User;
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = bcrypt($request->password);
    $user->save();
    return response([
      'status' => 'success',
      'data' => $user
    ], 200);
  }

  //=========================
  // Login
  public function login(Request $request)
  {
    $credentials = $request->only('email', 'password');

    if ($token = $this->guard()->attempt($credentials)) {
      return $this->respondWithToken($token);
    }

    return response()->json(['error' => 'Unauthorized'], 401);
  }
  
  public function login__(Request $request)
  {
    $credentials = $request->only('email', 'password');
    if ( ! $token = JWTAuth::attempt($credentials)) {
      return response([
        'status' => 'error',
        'error' => 'invalid.credentials',
        'msg' => 'Invalid Credentials.'
      ], 400);
    }
    return response(['status' => 'success'])
      ->header('Authorization', $token);
  }

  //=========================
  // Logout

  public function logout()
  {
    $this->guard()->logout();
    return response()->json(['message' => 'Successfully logged out']);
  }

  public function logout_old()
  {
    JWTAuth::invalidate();
    return response([
      'status' => 'success',
      'msg' => 'Logged out Successfully.'
    ], 200);
  }

  //=========================
  // User

  public function user()
  {
    return response()->json($this->guard()->user());
  }
  
  public function user_old(Request $request)
  {
    $user = User::find(Auth::user()->id);
    return response([
      'status' => 'success',
      'data' => $user
    ]);
  }

  //=========================
  // Refresh
  public function refresh()
  {
    return $this->respondWithToken($this->guard()->refresh());
    //return response([
    //  'status' => 'success'
    //]);
  }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
      return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => $this->guard()->factory()->getTTL() * 60
      ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
      return Auth::guard();
    }
}
